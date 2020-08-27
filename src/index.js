// para hacer las consultas
const fetch = require('node-fetch');
// resuelve el path relativo
const { resolve } = require('path');
// valida la extension del archivo
const { extname } = require('path');
// colores en la consola
const clc = require('cli-color');
// mi funcion que ya me trae un arreglo con los links
const { readingMarkdown } = require('./readingMarkdown');

// dirname es una variable global, representa la ruta donde se ejecuta el proceso
// (/home/soydulceangelina/bog001-md-links/src/) desde src sale (../) para buscar el README.md.
// const file = `${__dirname}/../README.md`; // mi path de prueba

const mdLinks = (path) => {
  const toAbsolute = resolve(path);
  const fileExtension = extname(toAbsolute);
  const promises = [];
  let renderLinks;
  if (fileExtension === '.md') {
    renderLinks = readingMarkdown(path);
    renderLinks.forEach((element) => {
      promises.push(fetch(element.getHref));
    });
  } else {
    console.log(clc.red.bold('Este archivo no es .md'));
  }

  return { promise: Promise.allSettled(promises), infoMd: renderLinks };
  // allSettled recibe un arreglo de
  // promesas y devuelve una promesa con las respuestas sean satisfactorias o no
};

module.exports = mdLinks;
