const http = require("http");

const host = 'localhost';
const port = 8000;
let personer = [{ navn: "Ole", alder: 19 }, { navn: "Ib", alder: 21 }];
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    if (req.method == 'GET') {
        if (req.url == '/personer') {
            res.writeHead(200);
            let retur = JSON.stringify(personer);
            res.end(retur);
        } else if (req.url == '/biler') {
            res.writeHead(200);
            let retur = JSON.stringify([{ bilnavn: "Ford", regnr: "ab 23 456" }, { navn: "Kia", regnr: "cd 34 567" }]);
            res.end(retur);
        } else {
            res.writeHead(404);
            res.end("error: not found");
        }
    } else if (req.method == 'POST') {
        var postData = '';

        // Get all post data when receive data event.
        req.on('data', function (chunk) {

            postData += chunk;

        });

        // When all request post data has been received.
        req.on('end', function () {

            console.log("Client post data : " + postData);

            // Parse the post data and get client sent username and password.
            var postDataObject = JSON.parse(postData);

            /* Set Access-Control-Allow-Origin http header will fix No 'Access-Control-Allow-Origin' header is present on the requested resource error
               when use XMLHttpRequest object to get this server page via ajax method. */
            res.writeHead(201, { 'Access-Control-Allow-Origin': '*' });

            personer.push(postDataObject);
            res.end("Added");
        })
    }
};


const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});