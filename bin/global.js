#!/usr/bin/env node

const process = require('process');
const clc = require('cli-color');
const mdLinks = require('../src/index');

// const file = `${__dirname}/../README.md`; // mi path de prueba

const file = process.argv[2];
const mdLinksInfo = mdLinks(file);

// mdLinksInfo.promise
//   .then((responses) => {
//     responses.forEach((element) => {
//       console.log(element);
//     });
//   });

if (process.argv[3] === undefined) {
  mdLinksInfo.infoMd.forEach((mdL) => {
    console.log(`${clc.blue(mdL.getHref)}, ${clc.yellow(mdL.getText)}, ${clc.green(mdL.getFile)}`);
  });
} else if ((process.argv[3] === '--validate' && process.argv[4] === '--stats') || (process.argv[3] === '--stats' && process.argv[4] === '--validate')) {
  const totalLinks = [];
  const brokenLinks = [];
  const failLinks = [];
  mdLinksInfo.promise
    .then((responses) => {
      responses.forEach((response, index) => {
        const infoLinks = mdLinksInfo.infoMd[index];
        totalLinks.push(infoLinks.getHref);
        if (response.status === 'fulfilled') {
          if (response.value.status >= 200 && response.value.status <= 309) {
            console.log(`${clc.red.bgWhite('✔')} ${clc.blue(infoLinks.getHref)}, ${clc.yellow(infoLinks.getText)}, ${clc.green(infoLinks.getFile)}, ${clc.magentaBright('Status:', response.value.status)}`);
          } else if (response.value.status >= 400) {
            failLinks.push(infoLinks.getHref);
            console.log(`${clc.red.bgWhite('✘')} ${clc.red(infoLinks.getHref)}, ${clc.yellow(infoLinks.getText)}, ${clc.green(infoLinks.getFile)}, ${clc.magentaBright('Status:', response.value.status)}`);
          }
        } else if (response.status === 'rejected') {
          brokenLinks.push(infoLinks.getHref);
          console.log(`${clc.red.bgWhite('✘')} ${clc.red(infoLinks.getHref)}, ${clc.yellow(infoLinks.getText)}, ${clc.green(infoLinks.getFile)}, ${clc.red.bgWhite('Status: Error 500')}`);
        }
      });
      // eslint-disable-next-line max-len
      const uniqueLinks = totalLinks.filter((link) => totalLinks.filter((l) => l === link).length === 1);
      console.log(`${clc.white.italic.bgBlack('Estadística: Total de liks:')} ${totalLinks.length}`);
      console.log(`${clc.white.italic.bgBlack('Estadística: Total de liks unicos:')} ${uniqueLinks.length}`);
      console.log(`${clc.white.italic.bgBlack('Estadística: Total de liks rotos:')} ${brokenLinks.length + failLinks.length}`);
    });
} else if (process.argv[3] === '--validate') {
  mdLinksInfo.promise
    .then((responses) => {
      responses.forEach((response, index) => {
        const infoLinks = mdLinksInfo.infoMd[index];
        if (response.status === 'fulfilled') {
          if (response.value.status >= 200 && response.value.status <= 309) {
            console.log(`${clc.red.bgWhite('✔')} ${clc.blue(infoLinks.getHref)}, ${clc.yellow(infoLinks.getText)}, ${clc.green(infoLinks.getFile)}, ${clc.magentaBright('Status:', response.value.status)}`);
          } else if (response.value.status >= 400) {
            console.log(`${clc.red.bgWhite('✘')} ${clc.red(infoLinks.getHref)}, ${clc.yellow(infoLinks.getText)}, ${clc.green(infoLinks.getFile)}, ${clc.magentaBright('Status:', response.value.status)}`);
          }
        } else if (response.status === 'rejected') {
          console.log(`${clc.red.bgWhite('✘')} ${clc.red(infoLinks.getHref)}, ${clc.yellow(infoLinks.getText)}, ${clc.green(infoLinks.getFile)}, ${clc.red.bgWhite('Status: Error 500')}`);
        }
      });
    });
} else if (process.argv[3] === '--stats') {
  const totalLinks = [];
  mdLinksInfo.promise
    .then((responses) => {
      responses.forEach((response, index) => {
        const infoLinks = mdLinksInfo.infoMd[index];
        totalLinks.push(infoLinks.getHref);
        if (response.status === 'fulfilled') {
          if (response.value.status >= 200 && response.value.status <= 309) {
            console.log(`${clc.red.bgWhite('✔')} ${clc.blue(infoLinks.getHref)}, ${clc.yellow(infoLinks.getText)}, ${clc.green(infoLinks.getFile)}, ${clc.magentaBright('Status:', response.value.status)}`);
          } else if (response.value.status >= 400) {
            console.log(`${clc.red.bgWhite('✘')} ${clc.red(infoLinks.getHref)}, ${clc.yellow(infoLinks.getText)}, ${clc.green(infoLinks.getFile)}, ${clc.magentaBright('Status:', response.value.status)}`);
          }
        } else if (response.status === 'rejected') {
          console.log(`${clc.red.bgWhite('✘')} ${clc.red(infoLinks.getHref)}, ${clc.yellow(infoLinks.getText)}, ${clc.green(infoLinks.getFile)}, ${clc.red.bgWhite('Status: Error 500')}`);
        }
      });
      // eslint-disable-next-line max-len
      const uniqueLinks = totalLinks.filter((link) => totalLinks.filter((l) => l === link).length === 1);
      console.log(`${clc.white.italic.bgBlack('Estadística: Total de liks:')} ${totalLinks.length}`);
      console.log(`${clc.white.italic.bgBlack('Estadística: Total de liks unicos:')} ${uniqueLinks.length}`);
    });
}

// el then recibe las respuestaS, iteramos sobre cada respuesta en el forEach
