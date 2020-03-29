## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
node cli/my_caesar_cli.js 
```

## Commands

* required:  '-a, --actiontype <type>'  - action type: encode or decode (example: -a encode)
* required: '-s, --shift <type>', shift number (example: -s 7)
* optional: '-i, --input <type>', path to input file (example: -i './input.txt)
* optional: '-o, --output <type>', path to output file (example: -o './output.txt)
