import express from 'express';
import { promises as fs } from 'fs';
const app = express();

const port = 8000;

import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname+'/filer'));

function genererLinks(filnavne) {
    let html = '';
    for (let filnavn of filnavne) {
        html += '<a href="' + filnavn + '">' + filnavn + '</a><br>\n';
    }
    return html;
}

app.get('/', async (request, response) => {
    let filnavne = await fs.readdir(__dirname+'/filer');
    let html = genererLinks(filnavne);

    response.send(html)

}).listen(port)

