// userServer.js
import { createServer } from 'http';
import fetch from 'node-fetch';

//Ved install af node-fetch:
//npm install node-fetch@^2.6.6
//alternativt anvend import (ESM module), så skal der ændres flere ting

const userUrl = 'https://jsonplaceholder.typicode.com/users';

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

function genererTabel(users) {
    let html = '<table>';
    for (let user of users) {
        html +=
            '<tr><td>' + user.id +
            '</td><td>' + user.name +
            '</td><td>' + user.company.name +
            '</td></tr>\n';
    }
    html += '</table>';
    return html;
}

createServer(async (request, response) => {
    if (request.method === 'GET') {
        try {
            let users = await get(userUrl);
            let html = genererTabel(users);
            response.writeHead(200, { "Content-Type": "text/html" }); // OK
            response.write(html);
        } catch (fejl) {
            if (typeof fejl.message === 'number')
                response.writeHead(fejl.message);
            else
                response.writeHead(400); // Bad Request
            response.write(fejl.name + ": " + fejl.message);
        }
    }
    response.end();
}).listen(8080);

console.log('Lytter på port 8080 ...');