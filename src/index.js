// para hacer las consultas
const fetch = require('node-fetch');
const { resolve } = require('path');
const { extname } = require('path');
const { readingMarkdown } = require('./readingMarkdown');

// dirname es una variable global, representa la ruta donde se ejecuta el proceso
// (/home/soydulceangelina/bog001-md-links/src/) desde src sale (../) para buscar el README.md.
const linksObj = `${__dirname}/../README.md`;

const validateExtension = (path) => {
  const toAbsolute = resolve(path);
  const fileExtension = extname(toAbsolute);
  const promises = [];
  if (fileExtension === '.md') {
    const reading = readingMarkdown(path);
    reading.forEach((link) => {
      promises.push(fetch(link));
    });
  }
  return Promise.allSettled(promises);// allSettled recibe un arreglo de
  // promesas y devuelve una promesa con las respuestas sean satisfactorias o no
};

// const validateLinksStatus = () => {

// };

// el then recibe las respuestaS, iteramos sobre cada respuesta en el forEach
validateExtension(linksObj)
  .then((responses) => {
    responses.forEach((response) => {
      console.log(response.status);
    });
  });

module.exports = {};
