// convertir el string del md a html
const marked = require('marked');
// crea un DOM ficticio para poder acceder a metodos como querySelector
const { JSDOM } = require('jsdom');
// fs es un modulo de NODE, readFileSync es un metodo de fs, para leer archivos de forma asincrona
const { readFileSync } = require('fs');

module.exports.readingMarkdown = (file) => {
  const links = [];

  // const expression = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})';

  const expression = '^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';

  const regex = new RegExp(expression); // regex para validar solo urls, http, https o sin el
  // protocolo http (www.juanitoalimaña.com)

  const readTxt = readFileSync(file, 'utf-8');// me trae el archivo markdown

  const txtToHtml = marked(readTxt);// vuelve el markdown a html

  const fakeDom = new JSDOM(`<!DOCTYPE html>${txtToHtml}`);// creo un dom ficticio

  fakeDom.window.document.querySelectorAll('a').forEach((url) => { // ciclo para obtener los links
    const getHref = url.getAttribute('href');
    if (getHref.match(regex)) {
      links.push(getHref);
    }
  });
  return links;
};
