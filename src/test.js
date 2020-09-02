const { mdLinks } = require('.');

const file = `${__dirname}/../`;

mdLinks(file, { validate: true })
  .then((res) => {
    console.log(res);
  });
