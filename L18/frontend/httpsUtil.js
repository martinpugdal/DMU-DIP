function getAPIURL() {
	return "http://localhost:8000";
}

async function post(url = getAPIURL(), objekt) {
	const respons = await fetch(url, {
		method: "POST",
		body: JSON.stringify(objekt),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await respons.json();
}

async function get(url = getAPIURL()) {
	const respons = await fetch(url);
	return await respons.json();
}

async function put(url = getAPIURL(), objekt) {
	const respons = await fetch(url, {
		method: "PUT",
		body: JSON.stringify(objekt),
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (respons.status !== 204) throw new Error(respons.status);
}

async function validSession(sessionID) {
	const url = getAPIURL() + "/session?sessionID=" + sessionID;
	const respons = await get(url);
	if (respons.status !== 200) return false;
	return true;
}

export { getAPIURL, post, get, put, validSession };
