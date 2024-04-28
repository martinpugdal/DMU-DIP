// opgave13.1.js
const express = require('express');
const app = express();
const fs = require('fs').promises;

app.use(express.static(__dirname + '/filer')); //ellers virker links ikke

function genererLinks(filnavne) {
    let html = '';
    for (let filnavn of filnavne) {
        html += '<a href="' + filnavn + '">' + filnavn + '</a><br>\n';
    }
    return html;
}

app.get('/', async (request, response) => {
    let filnavne = await fs.readdir(__dirname + '/filer');
    let html = genererLinks(filnavne);
    response.send(html);
});

app.listen(8080);

console.log('Lytter på port 8080 ...');