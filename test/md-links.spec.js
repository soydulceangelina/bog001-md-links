const mdLinks = require('..');

const file = `${__dirname}/fileTest.md`; // mi path de prueba
const file2 = `${__dirname}/folder`; // mi path de prueba
const file3 = `${__dirname}/fileTest.js`; // mi path de prueba
const file4 = `${__dirname}/folder2`; // mi path de prueba

describe('mdLinks', () => {
  it('debería ser una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });
});

test('mdLinks', () => mdLinks(file).then((res) => {
  expect(res).toStrictEqual([
    {
      getHref: 'https://www.flaticon.com/',
      getText: 'Dulce borralo',
      getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/fileTest.md',
    },
    {
      getHref: 'https://www.soydulceangelina.com/',
      getText: 'Dulce borralo',
      getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/fileTest.md',
    },
    {
      getHref: 'https://www.npmjs.com/packae/cli-color',
      getText: 'Dulce borralo',
      getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/fileTest.md',
    },
  ]);
}));

test('mdLinks', () => mdLinks(file, { validate: true }).then((res) => {
  expect(res).toStrictEqual([
    {
      getHref: 'https://www.flaticon.com/',
      getText: 'Dulce borralo',
      getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/fileTest.md',
      status: 200,
    },
    {
      getHref: 'https://www.soydulceangelina.com/',
      getText: 'Dulce borralo',
      getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/fileTest.md',
      status: 500,
    },
    {
      getHref: 'https://www.npmjs.com/packae/cli-color',
      getText: 'Dulce borralo',
      getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/fileTest.md',
      status: 404,
    },
  ]);
}));

test('mdLinks', () => mdLinks(file, { stats: true }).then((res) => {
  expect(res).toStrictEqual(
    {
      links: [
        {
          getHref: 'https://www.flaticon.com/',
          getText: 'Dulce borralo',
          getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/fileTest.md',
          status: 200,
        },
        {
          getHref: 'https://www.soydulceangelina.com/',
          getText: 'Dulce borralo',
          getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/fileTest.md',
          status: 500,
        },
        {
          getHref: 'https://www.npmjs.com/packae/cli-color',
          getText: 'Dulce borralo',
          getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/fileTest.md',
          status: 404,
        },
      ],
      total: 3,
      unique: 3,
    },
  );
}));

test('mdLinks', () => mdLinks(file, { stats: true, validate: true }).then((res) => {
  expect(res).toStrictEqual(
    {
      links: [
        {
          getHref: 'https://www.flaticon.com/',
          getText: 'Dulce borralo',
          getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/fileTest.md',
          status: 200,
        },
        {
          getHref: 'https://www.soydulceangelina.com/',
          getText: 'Dulce borralo',
          getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/fileTest.md',
          status: 500,
        },
        {
          getHref: 'https://www.npmjs.com/packae/cli-color',
          getText: 'Dulce borralo',
          getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/fileTest.md',
          status: 404,
        },
      ],
      total: 3,
      unique: 3,
      broken: 2,
    },
  );
}));

test('mdLinks', () => mdLinks(file2).then((res) => {
  expect(res).toStrictEqual([
    {
      getHref: 'https://www.flaticon.com/',
      getText: 'Dulce borralo',
      getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/folder/fileOne.md',
    },
    {
      getHref: 'https://www.soydulceangelina.com/',
      getText: 'Dulce borralo',
      getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/folder/fileOne.md',
    },
    {
      getHref: 'https://www.drauta.com/que-es-nodejs-y-para-que-sirve',
      getText: '¿Qué es Node.js y para qué sirve? - drauta.com',
      getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/folder/fileTwo.md',
    },
    {
      getHref: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
      getText: '¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube',
      getFile: '/home/soydulceangelina/Documents/bog001-md-links/test/folder/fileTwo.md',
    },
  ]);
}));

test('mdLinks error', () => mdLinks(file3)
  .catch((error) => {
    expect(error.message).toEqual('Este archivo no es md');
  }));

test('mdLinks error', () => mdLinks(file4)
  .catch((error) => {
    expect(error.message).toEqual('Este archivo /home/soydulceangelina/Documents/bog001-md-links/test/folder2 no es .md');
  }));
