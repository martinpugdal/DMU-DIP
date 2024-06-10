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
alert('bingo');
function main() {
    let button = document.querySelector('button');
    let navn = document.querySelector('#navn')
    let adresse = document.querySelector('#adresse')
    button.onclick = async function () {
        alert('Bingo');
        await post('/', { navn: navn.value, adresse: adresse.value });
        let liste = document.querySelector('ul');
        liste.innerHTML += '<li>' + navn.value + ' ' + adresse.value;
    }
}
main();
