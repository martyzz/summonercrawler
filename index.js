const fetch = require("node-fetch");
const fs = require("fs");

const SERVERS = [
  "ru",
  "kr",
  "br1",
  "oc1",
  "jp1",
  "na1",
  "eun1",
  "euw1",
  "tr1",
  "la1",
  "la2"
];

const API_KEY = "<YOUR API KEY>";

const STATUS_FOUND = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_RATE_LIMIT = 429;

const SHIFT_FIRST = 0;
const REQUEST_PAUSE = 1500;

const createQuery = (server, summoner) => {
  let query = "";
  query += "https://";
  query += server;
  query += ".api.riotgames.com/lol/summoner/v3/summoners/by-name/";
  query += summoner;
  query += "?api_key=";
  query += API_KEY;
  return query;
};

const processWords = () => {
  const rawWords = fs.readFileSync("words.txt", "utf8");
  const rawArray = rawWords.split(/\r\n/);
  const processedWords = [];

  rawArray.forEach((rawWord, index) => {
    if (
      rawWord.length >= 3 &&
      rawWord.length <= 16 &&
      rawWord.match(/^[a-z0-9]+$/i)
    ) {
      const processWord = rawWord.trim().toLowerCase();
      processedWords.push(processWord);
    }
  });

  return processedWords;
};

const processResponse = (server, response, name) => {
  process.stdout.write(server);

  if (response.status === STATUS_FOUND) {
    process.stdout.write(":taken");
  } else if (response.status === STATUS_NOT_FOUND) {
    process.stdout.write(":free");
    fs.appendFileSync("data/" + server + ".txt", name + ", ");
  } else if (response.status === STATUS_RATE_LIMIT) {
    process.stdout.write(":rate-limit");
  }

  process.stdout.write(" ");

  fetchedCount++;

  if (fetchedCount === SERVERS.length) {
    process.stdout.write("\n");
    setTimeout(fetchHandler, REQUEST_PAUSE);
  }
};

const processRejected = server => {
  process.stdout.write(server + ":rejected ");

  fetchedCount++;

  if (fetchedCount === SERVERS.length) {
    process.stdout.write("\n");
    setTimeout(fetchHandler, 1500);
  }
};

const words = processWords();
const wordsLength = words.length;

for (let i = 0; i < SHIFT_FIRST; i++) {
  words.shift();
}

let fetchedCount = 0;

const fetchHandler = () => {
  if (words.length > 0) {
    const currentWord = words.shift();
    process.stdout.write(
      wordsLength - words.length + "/" + wordsLength + ' "' + currentWord + '" '
    );

    fetchedCount = 0;
    SERVERS.forEach((server, index) => {
      fetch(createQuery(server, currentWord))
        .then(response => {
          processResponse(server, response, currentWord);
        })
        .catch(() => {
          processRejected(server);
        });
    });
  }
};

fetchHandler();
