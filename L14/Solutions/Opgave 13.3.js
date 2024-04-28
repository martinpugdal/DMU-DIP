const express = require('express');
const app = express();

const port = 8000;
let beskeder = [{ afsender: "Ole", tekst: "Min første besked", chatrum: "rum1", nummer: "1" }, { afsender: "Ib", tekst: "Hallo, er der nogen?", chatrum: "rum2", nummer: "2" }];
let chatRum = [{ navn: "rum1" }, { navn: "rum2" }];

//Tillad cors requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

app.get('/beskeder', (request, response) => {
    response.status(200);
    response.send(beskeder);
});
app.get('/beskeder/:chatrum', (request, response) => {
    response.status(200);
    let result = [];
    for (let besked of beskeder) {
        if (besked.chatrum == request.params.chatrum) {
            result.push(besked);
        }
    }
    response.send(result);
});
app.get('/chatrum', (request, response) => {
    response.status(200);
    response.send(chatRum);
});

app.post('/beskeder', (request, response) => {
    console.log(request.body);
    //løkke, der finder største id i beskeder
    // sæt størsteid + 1 på besked
    beskeder.push(request.body);
    response.status(201);
    response.send("Added");
});

app.listen(port);

console.log('Lytter på port ' + port + ' ...');