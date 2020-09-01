const { mdLinks } = require('.');

const file = `${__dirname}/../README.md`;

mdLinks(file, { stats: true, validate: true })
  .then((res) => {
    console.log(res.total);
  });
