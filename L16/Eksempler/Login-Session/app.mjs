// app.js
import express from 'express';
const app = express();
import sessions from 'express-session';
import pug from 'pug';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
app.set('view engine', 'pug');
app.set("views", __dirname + "/views");

app.use(sessions({ secret: 'hemmelig', saveUninitialized: true, cookie: { maxAge: 1000*60*20 }, resave: false }));
app.use(express.static(__dirname + '/filer'));
//app.use(express.static(__dirname));
app.use(express.json());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.post('/login', (request, response) => {
    const { navn, password } = request.body;
    if (password === '111' && navn) {
        request.session.navn = navn;
        response.status(201).send(['login ok!']);
    } else {
        response.sendStatus(401);
    }
});

app.get('/session', (request, response) => {
    const navn = request.session.navn;
    if (navn != null) {
        response.render('velkommen', { navn });
    } else {
        response.redirect('/ingenAdgang.html');
    }
});

app.get('/logout', (request, response) => {
    request.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            response.redirect('/');
        }
    });
});

app.listen(8000);

console.log('Lytter på port 8000 ...');