function gaetTalISyttenTabel() {
	const duration = Math.floor(Math.random() * 3000) + 1000; // 1-3sek
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const tal = Math.floor(Math.random() * 2000); // 0 - 2000
			if (tal % 17 === 0) {
				resolve(tal + " er deleligt med 17");
			} else {
				reject(tal + " er ikke deleligt med 17");
			}
		}, duration);
	});
}

function proevXGange(antal) {
	const promises = [];
	for (let i = 0; i < antal; i++) {
		promises.push(gaetTalISyttenTabel());
	}
	return new Promise((resolve, reject) => {
		Promise.all(promises)
			.then((values) => {
				resolve(values);
			})
			.catch((reason) => {
				reject(reason);
			});
	});
}

proevXGange(1000)
	.then((values) => {
		console.log(values);
	})
	.catch((reason) => {
		console.log(reason);
	});
