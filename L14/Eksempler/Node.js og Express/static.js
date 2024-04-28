// static.js
import express from 'express';
const app = express();
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(__dirname + '/filer'));

app.get('/', function (request, response) {
    response.sendStatus(404); // Not Found
});

app.listen(8080);

console.log('Lytter på port 8080 ...');