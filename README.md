# summonercrawler

Node.js script taking a list of words from ``words.txt`` file and checking if each of these individual words exist on LoL servers.
Every available word is appended to coresponding ``data/<server>.txt`` file and you sholud be able to use it as summoner name.

Before running, you might want to remove contents of ``data`` folder, because data from script are appending to files.

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