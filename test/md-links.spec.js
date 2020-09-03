const mdLinks = require('..');
const {
  defaultValues, validateValues, statsValues, allValues, folderTrue,
} = require('./__mocks__/mock');

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
  expect(res).toStrictEqual(defaultValues);
}));

test('mdLinks', () => mdLinks(file, { validate: true }).then((res) => {
  expect(res).toStrictEqual(validateValues);
}));

test('mdLinks', () => mdLinks(file, { stats: true }).then((res) => {
  expect(res).toStrictEqual(statsValues);
}));

test('mdLinks', () => mdLinks(file, { stats: true, validate: true }).then((res) => {
  expect(res).toStrictEqual(allValues);
}));

test('mdLinks', () => mdLinks(file2).then((res) => {
  expect(res).toStrictEqual(folderTrue);
}));

test('mdLinks error', () => mdLinks(file3)
  .catch((error) => {
    expect(error.message).toEqual('Este archivo no es md');
  }));

test('mdLinks error', () => mdLinks(file4)
  .catch((error) => {
    expect(error.message).toEqual(`Este archivo ${file4} no es .md`);
  }));

test('mdLinks error', () => mdLinks(file3, { validate: true })
  .catch((error) => {
    expect(error.message).toEqual('Este archivo no es md');
  }));

test('mdLinks error', () => mdLinks(file3, { stats: true })
  .catch((error) => {
    expect(error.message).toEqual('Este archivo no es md');
  }));
