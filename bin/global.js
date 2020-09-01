#!/usr/bin/env node

const process = require('process');
const clc = require('cli-color');
const { mdLinks } = require('../src');

// const file = `${__dirname}/../README.md`; // mi path de prueba
const file = process.argv[2];

const options = {
  validate: false,
  stats: false,
};

if (process.argv[3] === undefined) {
  mdLinks(file)
    .then((res) => {
      res.forEach((mdL) => {
        console.log(`${clc.blue(mdL.getHref)}, ${clc.yellow(mdL.getText)}, ${clc.green(mdL.getFile)}`);
      });
    });
} else if ((process.argv[3] === '--validate' && process.argv[4] === '--stats') || (process.argv[3] === '--stats' && process.argv[4] === '--validate')) {
  mdLinks(file, { ...options, validate: true, stats: true })
    .then((res) => {
      res.links.forEach((ml) => {
        if (ml.status >= 200 && ml.status <= 309) {
          console.log(`${clc.red.bgWhite('✔')} ${clc.blue(ml.getHref)}, ${clc.yellow(ml.getText)}, ${clc.green(ml.getFile)}, ${clc.magentaBright('Status:', ml.status)}`);
        } else if (ml.status >= 400) {
          console.log(`${clc.red.bgWhite('✘')} ${clc.red(ml.getHref)}, ${clc.yellow(ml.getText)}, ${clc.green(ml.getFile)}, ${clc.magentaBright('Status:', ml.status)}`);
        }
      });
      console.log(`${clc.white.italic.bgBlack('Estadística: Total de liks:')} ${res.total}`);
      console.log(`${clc.white.italic.bgBlack('Estadística: Total de liks unicos:')} ${res.unique}`);
      console.log(`${clc.white.italic.bgBlack('Estadística: Total de liks rotos:')} ${res.broken}`);
    });
} else if (process.argv[3] === '--validate') {
  mdLinks(file, { ...options, validate: true })
    .then((res) => {
      res.forEach((mdLink) => {
        if (mdLink.status >= 200 && mdLink.status <= 309) {
          console.log(`${clc.red.bgWhite('✔')} ${clc.blue(mdLink.getHref)}, ${clc.yellow(mdLink.getText)}, ${clc.green(mdLink.getFile)}, ${clc.magentaBright('Status:', mdLink.status)}`);
        } else if (mdLink.status >= 400) {
          console.log(`${clc.red.bgWhite('✘')} ${clc.red(mdLink.getHref)}, ${clc.yellow(mdLink.getText)}, ${clc.green(mdLink.getFile)}, ${clc.magentaBright('Status:', mdLink.status)}`);
        }
      });
    });
} else if (process.argv[3] === '--stats') {
  mdLinks(file, { ...options, stats: true })
    .then((res) => {
      res.links.forEach((ml) => {
        if (ml.status >= 200 && ml.status <= 309) {
          console.log(`${clc.red.bgWhite('✔')} ${clc.blue(ml.getHref)}, ${clc.yellow(ml.getText)}, ${clc.green(ml.getFile)}, ${clc.magentaBright('Status:', ml.status)}`);
        } else if (ml.status >= 400) {
          console.log(`${clc.red.bgWhite('✘')} ${clc.red(ml.getHref)}, ${clc.yellow(ml.getText)}, ${clc.green(ml.getFile)}, ${clc.magentaBright('Status:', ml.status)}`);
        }
      });
      console.log(`${clc.white.italic.bgBlack('Estadística: Total de liks:')} ${res.total}`);
      console.log(`${clc.white.italic.bgBlack('Estadística: Total de liks unicos:')} ${res.unique}`);
    });
}
