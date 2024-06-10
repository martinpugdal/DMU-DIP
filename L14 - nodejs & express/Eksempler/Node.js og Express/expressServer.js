// expressServer.js
import express from 'express';
const app = express();

app.get('/', (request, response) => {
    let array = [request.method, request.url];
    response.send(array);
});

app.get('/soegnavn/:navn', (request, response) => {
    let array = ["Soegnavn:" + request.method, request.url, request.params.navn];
    response.send(array);
});

app.get('/personer/:navn', (request, response) => {
    let retur = [{navn:request.params.navn,alder:27},{navn:request.params.navn,alder:38}]
    response.send(retur);
});

app.listen(8080);

console.log('Lytter på port 8080 ...');