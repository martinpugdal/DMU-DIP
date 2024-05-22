function getAPIURL() {
    return "http://localhost:8000";
}

async function post(url = getAPIURL(), objekt, sessionID = "") {
    objekt.sessionID = sessionID;
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return await respons.json();
}

async function get(url = getAPIURL(), sessionID = "") {
    const respons = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({
                sessionID: sessionID,
            }),
        },
        credentials: "include",
    });
    return await respons.json();
}

async function put(url = getAPIURL(), objekt, sessionID = "") {
    objekt.sessionID = sessionID;
    const respons = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(objekt),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (respons.status !== 204) throw new Error(respons.status);
}

export { getAPIURL, post, get, put };
