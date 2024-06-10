const beskedUrl = 'http://localhost:8000/beskeder/';
const soegbeskedUrl = 'http://localhost:8000/beskeder/';
const rumUrl = 'http://localhost:8000/chatrum/';

let vistChatRum;

// const beskedUrl = 'https://beskedserver.azurewebsites.net/api/Beskeder/';
//const soegbeskedUrl = 'https://beskedserver.azurewebsites.net/api/SoegBeskeder/';
//const rumUrl = 'https://beskedserver.azurewebsites.net/api/chatRum/';

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function post(url, objekt) {
    const respons = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 201) // Created
        throw new Error(respons.status);
    return await respons.text();
}
async function deLete(url) {
    let respons = await fetch(url, {
        method: "DELETE"
    });
    if (respons.status !== 200 && respons.status !== 204) // OK
        throw new Error(respons.status);
    return await respons.text();
}

async function getAlleBeskeder() {
    let beskeder;
    try {
        beskeder = await get(beskedUrl);
    } catch (fejl) {
        console.log(fejl);
    }
    console.log(beskeder);
}
async function soegBeskeder(rum) {
    let beskeder;
    try {
        beskeder = await get(soegbeskedUrl + rum);
    } catch (fejl) {
        console.log(fejl);
    }
    console.log(beskeder);
    return beskeder;
}

async function getRum() {
    let rum;
    try {
        rum = await get(rumUrl);
    } catch (fejl) {
        console.log(fejl);
    }
    console.log(rum);
    return rum;
}

async function postBesked(afsender, tekst, chatrum) {
    let besked = {afsender:afsender, tekst: tekst, chatrum: chatrum };
    try {
        let respons = await post(beskedUrl, besked);
        visBeskederFor(vistChatRum);
    } catch (fejl) {
        console.log(fejl);
    }
}
async function deleteBesked(id) {
    try {
        let respons = await deLete(beskedUrl + id);
        visBeskederFor(vistChatRum);
    } catch (fejl) {
        console.log(fejl);
    }
}

async function visAlleRum() {
    let rumDiv = document.querySelector("#rum");
    let rum = await getRum();
    for (let r of rum) {
        rumDiv.innerHTML += "<input type=button onclick=\"visBeskederFor('" + r.Navn + "')\" value=\"" + r.Navn + "\"></input>";
    }
}

async function visBeskederFor(rum) {
    let beskeder = await soegBeskeder(rum);
    let beskedDiv = document.querySelector("#beskeder");
    beskedDiv.innerHTML = "";
    let table = document.createElement('table');
    table.setAttribute("border", "solid");
    createHeaderRow(table);
    for (let besked of beskeder) {
        createRow(table, besked.docID, besked.tekst, besked.chatrum);
    }
    beskedDiv.appendChild(table);
    vistChatRum = rum;
}
function createHeaderRow(table) {
    let tr = document.createElement('tr');
    let thid = document.createElement('th');
    thid.appendChild(document.createTextNode('Id'));
    let thtekst = document.createElement('th');
    thtekst.appendChild(document.createTextNode('tekst'));
    let thchatrum = document.createElement('th');
    thchatrum.appendChild(document.createTextNode('chatrum'));
    let thDeleteLink = document.createElement('th');
    thDeleteLink.appendChild(document.createTextNode('Slet'));
    tr.appendChild(thid);
    tr.appendChild(thtekst);
    tr.appendChild(thchatrum);
    tr.appendChild(thDeleteLink);
    table.appendChild(tr);
}

function createRow(table, id, tekst, chatrum) {
    let tr = document.createElement('tr');
    let thid = document.createElement('td');
    thid.appendChild(document.createTextNode(id));
    let thtekst = document.createElement('td');
    thtekst.appendChild(document.createTextNode(tekst));
    let thchatrum = document.createElement('td');
    thchatrum.appendChild(document.createTextNode(chatrum));
    let thDeleteLink = document.createElement('td');
    let deleteLink = document.createElement('a');
    deleteLink.innerHTML = 'Slet';
    deleteLink.setAttribute('onclick', 'deleteBesked("' + id + '");return false;');
    deleteLink.setAttribute('href', '');
    thDeleteLink.appendChild(deleteLink);
    tr.appendChild(thid);
    tr.appendChild(thtekst);
    tr.appendChild(thchatrum);
    tr.appendChild(thDeleteLink);
    table.appendChild(tr);
}
function opretBesked() {
    let tekst = document.querySelector("#tekst").value;
    let chatrum = document.querySelector('#chatrum').value;
    postBesked("Klaus", tekst,chatrum);
}

visAlleRum();
