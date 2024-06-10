
async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return respons.text();
}

function HentTal() {
    let resultat = get("https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new");
    return resultat;
}

function resolved(value) {
    console.log(value);
}
function rejected() {
    console.log("No good");
}
Promise.all([HentTal(), HentTal(), HentTal(), HentTal()]).then(resolved).catch(rejected);
console.log("Promises sat i gang");