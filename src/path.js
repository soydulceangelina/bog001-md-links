// path modulo de NODE, resolve con __dirname me trae la ruta absoluta
const { resolve } = require('path');
const { readingMarkdown } = require('./getLinks');

// --para pruebas
console.log(readingMarkdown(resolve(`${__dirname}/../README.md`)));
