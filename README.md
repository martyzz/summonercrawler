# summonercrawler

Node.js script taking a list of words from ``words.txt`` file and checking if each of these individual words exist on LoL servers.
Every available word is appended to coresponding ``data/<server>.txt`` file and you sholud be able to use it as summoner name.

Before running, you might want to remove contents of ``data`` folder, because data from script are apended to files.

### Running

```

$ git clone https://github.com/martyzz/summonercrawler.git
$ cd summonercrawler
$ npm install

```

Open ``index.js`` and replace ``<YOUR API KEY>`` with your api key.

```

$ node index

```

### More info

While running, script is delayed 1.5 seconds after each set of requests because of rate limits.

[This](https://www.ef.com/english-resources/english-vocabulary/top-3000-words/) set of 3000 most popular english words was used as resource. But feel free to use your own with a similiar format.