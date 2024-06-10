const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'pug');
app.set('views', 'templates');

app.use('/filer', express.static(__dirname+'/filer'));
// app.use(express.static('filer'));
app.use(express.json());
app.use(session({secret: 'hemmelig', saveUninitialized: true, resave: true}));

let personer = [];

app.get('/', function (request, response) {
    if (request.session.personer == null) {
        request.session.personer = [{navn:'test', adresse:'testvej'}];
    }
    let valuesForTemplate = {personer:request.session.personer};
    response.render('index',valuesForTemplate);
});
app.get('/HentSomJSON', function (request, response) {
    if (request.session.personer == null) {
        request.session.personer = [{navn:'test', adresse:'testvej'}];
    }
    response.status(200).send(request.session.personer)
});

app.post('/', function (request, response) {
    request.session.personer.push({navn:request.body.navn, adresse:request.body.adresse})
    response.sendStatus(201);
});

app.listen(8080);

console.log('Lytter på port 8080 ...');
