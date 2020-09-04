# Markdown Links

## Instalar CLI
    $ npm install -g soydulceangelina/md-links

## Usar el CLI
Puedes pasarle como argumento un archivo .md o una carpeta con archivos .md
```sh
$ mdLinks README.md
http://google.com/ Google README.md
https://www.npmjs.com/ npm README.md
https://firebase.google.com/ Firebase README.md
```

Tambien le puedes pasar el flag --validate
```sh
$ mdLinks README.md --validate
ok http://google.com/ Google README.md Status: 200
ok https://www.npmjs.com/ npm README.md Status: 200
fail https://firebase.google.com/j Firebase README.md Status: 404
```

El flag --stats
```sh
$ mdLinks README.md --stats
ok http://google.com/ Google README.md Status: 200
ok https://www.npmjs.com/ npm README.md Status: 200
fail https://firebase.google.com/j Firebase README.md Status: 404
Total de liks: 3
Total de liks unicos: 3
```

y ambos --stats --validate
```sh
$ mdLinks README.md --stats
ok http://google.com/ Google README.md Status: 200
ok https://www.npmjs.com/ npm README.md Status: 200
fail https://firebase.google.com/j Firebase README.md Status: 404
Total de liks: 3
Total de liks unicos: 3
Total de liks rotos: 1
```

## Instalar Modulo
    $ npm install soydulceangelina/md-links

## Usar Modulo
```sh
const mdLinks = require('@soydulceangelina/md-links');

//devuelve un arreglo de objetos con las url, el archivo y el texto
mdLinks('./README.md')
    .then((res) => {
        console.log(res)
})

//devuelve un arreglo de objetos con las url, el archivo, el texto y el status
mdLinks('./README.md', { validate: true})
    .then((res) => {
        console.log(res)
})

//devuelve un arreglo de objetos con las url, el archivo, el texto, el status y estadísticas de links totales y unicos
mdLinks('./README.md', { stats: true})
    .then((res) => {
        console.log(res)
})

//devuelve un arreglo de objetos con las url, el archivo, el texto, el status y estadísticas de links totales, unicos y rotos
mdLinks('./README.md', { stats: true, validate:true})
    .then((res) => {
        console.log(res)
})
```
