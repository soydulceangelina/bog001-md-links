const defaultValues = [
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
];

const validateValues = [
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
];

const statsValues = {
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
};

const allValues = {
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
};

const folderTrue = [
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
];

module.exports = {
  defaultValues, validateValues, statsValues, allValues, folderTrue,
};
