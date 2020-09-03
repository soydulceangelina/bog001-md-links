// para hacer las consultas
const fetch = require('node-fetch');
// resuelve el path relativo
const { resolve } = require('path');
// valida la extension del archivo
const { extname } = require('path');
const fs = require('fs');
// mi funcion que ya me trae un arreglo con los links
const { readingMarkdown } = require('./readingMarkdown');
// const { processFileOrFolder } = require('./fileOrFolder');

// dirname es una variable global, representa la ruta donde se ejecuta el proceso
// (/home/soydulceangelina/bog001-md-links/src/) desde src sale (../) para buscar el README.md.
// const file = `${__dirname}/../README.md`; // mi path de prueba

const itsFile = (path) => {
  const file = fs.lstatSync(path).isFile();
  return file;
};

const itsFolder = (path) => {
  const folder = fs.lstatSync(path).isDirectory();
  return folder;
};

function getDefaultValues(path) {
  return new Promise((res, rej) => {
    if (itsFile(path) === true && itsFolder(path) === false) {
      const toAbsolute = resolve(path);
      const fileExtension = extname(toAbsolute);
      if (fileExtension === '.md') {
        res(readingMarkdown(path));
      } else {
        rej(new Error('Este archivo no es md'));
      }
    } if (itsFile(path) === false && itsFolder(path) === true) {
      const linksByFile = [];
      const allLinks = [];
      const filesInFolder = fs.readdirSync(path);
      const onlyMd = filesInFolder.filter((md) => extname(md) === '.md');
      onlyMd.forEach((file) => {
        const route = `${path}/${file}`;
        const fileExtension = extname(route);
        if (fileExtension === '.md') {
          linksByFile.push(readingMarkdown(route));
        } else {
          rej(new Error(`Este archivo ${route} no es .md`));
        }
      });
      linksByFile.forEach((element) => {
        element.forEach((n) => {
          allLinks.push(n);
        });
      });
      res(allLinks);
    }
    rej(new Error('Este archivo no es valido'));
  });
}

function getValidateValues(path) {
  return getDefaultValues(path)
    .then((renderLinks) => {
      const promises = [];
      renderLinks.forEach((element) => {
        promises.push(fetch(element.getHref));
      });
      return Promise.allSettled(promises)
        .then((res) => res.map(({ value }, index) => {
          const status = value ? value.status : 500;
          return { ...renderLinks[index], status };
        }))
        .catch((error) => { throw error; });
    })
    .catch((error) => { throw error; });
}

function getStatsValues(path) {
  return getValidateValues(path)
    .then((links) => ({
      links,
      total: links.length,
      // eslint-disable-next-line max-len
      unique: links.filter((link) => links.filter((l) => l.getHref === link.getHref).length === 1).length,
    }))
    .catch((error) => { throw error; });
}

function getFullValues(path) {
  return getStatsValues(path)
    .then((links) => ({
      ...links,
      broken: links.links.filter((link) => link.status >= 400).length,
    }));
}

const mdLinks = (path, options) => {
  if (!options) {
    return getDefaultValues(path);
  }

  if (options.validate && !options.stats) {
    return getValidateValues(path);
  }

  if (!options.validate && options.stats) {
    return getStatsValues(path);
  }

  return getFullValues(path);

  // return Promise.allSettled(promises)
  //   .then((res) => {
  //     const response = res.map(({ value }, index) => {
  //       const status = value ? value.status : 500;
  //       return { ...renderLinks[index], status };
  //     });
  //     return response;
  //   })
  //   .catch((error) => { throw error; });
};
module.exports = mdLinks;
