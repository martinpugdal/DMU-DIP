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

async function main() {
    let resultDiv = document.querySelector('#result');


    //let value = get('https://www.tronalddump.io/random/quote')
    let value = get('https://www.tronalddump.io/search/quote?tag=Barack Obama');
    //let value = get('https://www.tronalddump.io/quote/LakVIf-fTm6aal1BZpjcBg');
    value.then((v) => resultDiv.innerHTML = v._embedded.quotes[0].value + '<br>');
    // let values = Promise.all([get('https://www.tronalddump.io/random/quote'), get('https://www.tronalddump.io/random/quote'), get('https://www.tronalddump.io/random/quote')])
    // values.then((v) => resultDiv.innerHTML = v[0].value + '<br>' + v[1].value + '<br>' + v[2].value).catch((err) => resultDiv.innerHTML = 'det fejlede');
}
main();
