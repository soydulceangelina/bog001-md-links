#!/usr/bin/env node

const process = require('process');
const clc = require('cli-color');
const mdLinks = require('../src/index');

const file = `${__dirname}/../README.md`; // mi path de prueba
// const file = process.argv[2];

mdLinks(file);

// el then recibe las respuestaS, iteramos sobre cada respuesta en el forEach

// .then((responses) => {
//   responses.forEach((response) => {
//     if (response.status === 'fulfilled') {
//       console.log(`${clc.blue.bgWhite(response.value.url)} ${clc.yellow(file)}`);
//     } else {
//       console.log(`${clc.red.bgWhite(response.reason)}`);
//     }
//   });
// });
