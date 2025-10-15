# Hîysêô Hunspell Dictionary

For use in hunspell directly or in programs that support hunspell dictionaries.

## Requirements

- node/npm
- wget
- [hunspell](https://hunspell.github.io)

## Install

```shell
git clone https://github.com/Hisyeo/hunspell.git hisyeo-hunspell
cd hisyeo-hunspell
npm install
mv -t HUNSPELL_DICTIONARY_LOCATION hisyeo.dic hisyeo.aff
```

Hunspell will tell you where it will look for dictionaries (SEARCH_PATH):

```shell
hunspell -D
```

## Usage

If you leave it in the current directory and run hunspell from here, it will locate the dictionary files:

```console
foo@bar:~\hisyeo-hunspell$ hunspell -d hisyeo
Hunspell 1.7.2
bîolî
*
```