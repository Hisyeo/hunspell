# Hîysêô Hunspell Dictionary

For use in hunspell directly or in programs that support hunspell dictionaries.

## Requirements

- node/npm
- wget
- hunspell

## Install

```shell
npm install
mv -t HUNSPELL_DICTIONARY_LOCATION hisyeo.dic hisyeo.aff
```

Hunspell will tell you where it will look for dictionaries (SEARCH_PATH):

```shell
hunspell -D
```