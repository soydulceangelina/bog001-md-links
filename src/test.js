const { mdLinks } = require('.');

const file = `${__dirname}/../README.md`;

mdLinks(file)
.then(res => {
    console.log(res)
}