import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import express from 'express';
let app = express();

import { renderFile } from 'pug';
import { join } from 'path';

app.set('view engine', 'pug');
app.set('views', join(__dirname, '/views'));
let valuesForTemplate = { navn: "Ole", alder: 30, venner: [{ navn: "Ib", alder: 12 }, { navn: "hans", alder: 11 }] };

console.log(renderFile(join(__dirname, '/views/PugExample.pug'), valuesForTemplate));


app.get('/', (req, response) => response.render('PugExample', valuesForTemplate))

app.listen(8000, () => console.log('Test running'));
