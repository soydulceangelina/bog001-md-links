#!/usr/bin/env node

const process = require('process');
const clc = require('cli-color');
const mdLinks = require('../src/index');

// const file = `${__dirname}/../README.md`; // mi path de prueba

const file = process.argv[2];
const mdLinksInfo = mdLinks(file);

if (process.argv[2] === '') {
  mdLinksInfo.infoMd.forEach((mdL) => {
    console.log(`${clc.blue(mdL.getHref)}, ${clc.yellow(mdL.getText)}, ${clc.green(mdL.getFile)}`);
  });
} else if (process.argv[2] === '--validate') {
  mdLinksInfo.promise
    .then((responses) => {
      responses.forEach((response, index) => {
        const infoLinks = mdLinksInfo.infoMd[index];
        if (response.status === 'fulfilled') {
          console.log(`${clc.red.bgWhite('✔')} ${clc.blue(infoLinks.getHref)}, ${clc.yellow(infoLinks.getText)}, ${clc.green(infoLinks.getFile)}, ${clc.magentaBright('Status:', response.value.status)}`);
        } else if (response.status === 'rejected') {
          console.log(`${clc.red.bgWhite('✘')} ${clc.red(infoLinks.getHref)}, ${clc.yellow(infoLinks.getText)}, ${clc.green(infoLinks.getFile)}`);
        }
      });
    });
  // console.log('lleva --validate');
} else if (process.argv[2] === '--stats') {
  console.log('lleva --stats');
} else if ((process.argv[2] === '--validate' && process.argv[3] === '--stats') || (process.argv[2] === '--stats' && process.argv[3] === '--validate')) {
  console.log('lleva --stats y --validate');
}

// el then recibe las respuestaS, iteramos sobre cada respuesta en el forEach
