// index.js
const navn = document.querySelector('#navn');
const password = document.querySelector('#password');
const login = document.querySelector('#login');
const fejl = document.querySelector('#fejl');


async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (respons.status !== 201) // Created
        throw new Error(respons.status);
    return await respons.text();
}

login.onclick = async () => {
    try {
        await post("http://localhost:8000/login", { navn: navn.value, password: password.value });
        window.location.href = "http://localhost:8000/session";
    } catch (e) {
        password.value = "";
        fejl.innerHTML = "Forkert password eller intet navn!";
    }
}