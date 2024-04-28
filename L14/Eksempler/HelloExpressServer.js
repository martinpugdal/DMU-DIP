import {express,  json } from 'express';
const app = express();

const host = 'localhost';
const port = 8000;
let personer = [{ navn: "Ole", alder: 19 }, { navn: "Ib", alder: 21 }, { navn: "Ole", alder: 37 }];

app.use(json());

app.get('/personer', (request, response) => {
    response.status(200);
    response.send(personer);
});
app.get('/personer/:navn', (request, response) => {
    let retur = []
    personer.forEach(element => {
        if (element.navn === request.params.navn) {
            retur.push(element)
        }
    });
    response.send(retur)
}
)
app.get('/personer/soegAlder/:alder', (request, response) => {
    let retur = []
    personer.forEach(element => {
        if (element.alder == request.params.alder) {
            retur.push(element)
        }
    });
    response.send(retur)
}
)
app.post('/personer', (request, response) => {
    console.log(request.body);
    personer.push(request.body);
    response.status(201);
    response.send("Added");
});

app.listen(port);

console.log('Lytter på port ' + port + ' ...');