// filServer.js
import { createServer } from 'http';
import { promises as fs } from 'fs';

function genererLinks(filnavne) {
    let html = '';
    for (let filnavn of filnavne) {
        html += '<a href="' + filnavn + '">' + filnavn + '</a><br>\n';
    }
    return html;
}

createServer(async (request, response) => {
    let sti = 'C:\\Users\\klbo\\OneDrive - EFIF\\DIP\\S23\\Session 14\\Eksempler\\Node.js og Express\\filer';
    if (request.url === '/') {  //henter liste af filer
        console.log(sti);
        let filnavne = await fs.readdir(sti);
        let html = genererLinks(filnavne);
        response.writeHead(200, {"Content-Type": "text/html"}); // OK
        response.write(html);
    } else {  //forsøger at hente en fil
        try {
            let fuldsti = sti + request.url;
            let filData = await fs.readFile(fuldsti);
            response.writeHead(200); // OK
            response.write(filData);
        } catch (e) {
            response.writeHead(404); // Not Found
            response.write(e.name + ": " + e.message);
        }    
    }    
    response.end();
}).listen(8080);    

console.log('Lytter på port 8080 ...');