const fetch = require('node-fetch');

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 201) // Created
        throw new Error(respons.status);
    return await respons.text();
}

async function getPersoner(url) {
    let retur;
    try {
        retur = await get(url);
    } catch (fejl) {
        console.log(fejl);
    }
    console.log(JSON.stringify(retur));
}
async function opretPerson(url, objekt) {
    try {
        let respons = await post(url, objekt);
        console.log(respons);
    } catch (fejl) {
        console.log(fejl);
    }
}
opretPerson('http://localhost:8000/personer', { navn: "Xantippe", alder: 42 });

//getPersoner('http://localhost:8000/personer');
