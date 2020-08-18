// para hacer las consultas
const fetch = require('node-fetch');
const { resolve } = require('path');
const { readingMarkdown } = require('./getLinks');

// dirname es una variable global, representa la ruta donde se ejecuta el proceso
// (/home/soydulceangelina/bog001-md-links/src/) desde src sale (../) para buscar el README.md.
const linksObj = readingMarkdown(resolve(`${__dirname}/../README.md`));

const validateLinksStatus = () => {
  const promises = [];
  linksObj.forEach((link) => {
    promises.push(fetch(link));
  });
  return Promise.allSettled(promises);// allSettled recibe un arreglo de
  // promesas y devuelve una promesa con las respuestas sean satisfactorias o no
};

// el then recibe las respuestaS, iteramos sobre cada respuesta en el forEach
validateLinksStatus()
  .then((responses) => {
    responses.forEach((response) => {
      console.log(response);
    });
  });
