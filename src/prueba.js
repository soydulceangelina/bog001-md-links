const { resolve } = require('path');
const mdLinks = require('.');

// const file = `${__dirname}/../`; // mi path de prueba
const file = resolve(`${__dirname}/../test/folder`); // mi path de prueba
// console.log(file);

mdLinks(file)
  .then((res) => {
    console.log(res);
  });
