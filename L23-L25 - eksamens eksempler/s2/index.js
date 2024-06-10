class Bil {
	#bilmaerke;
	#pris;
	static bilmaerker = [
		"BMW",
		"Audi",
		"Mercedes",
		"VW",
		"Peugeot",
		"Renault",
		"Toyota",
		"Ford",
		"Opel",
		"Citroen",
	];
	static antalBiler = 0;

	constructor(bilmaerke, pris) {
		this.#bilmaerke = bilmaerke;
		this.#pris = pris;
		if (
			pris === undefined ||
			pris === null ||
			bilmaerke === undefined ||
			bilmaerke === null ||
			Bil.bilmaerker.indexOf(bilmaerke) === -1
		) {
			throw new Error("Forkert input");
		}
		Bil.antalBiler++;
	}

	toString() {
		return this.#bilmaerke + " koster " + this.#pris + " kr.";
	}
}

class Varevogn extends Bil {
	#lasteevne;

	constructor(bilmaerke, pris, lasteevne) {
		super(bilmaerke, pris);
		this.#lasteevne = lasteevne;
		if (lasteevne === undefined || lasteevne === null) {
			throw new Error("Forkert input");
		}
	}

	toString() {
		return (
			super.toString() +
			" og har en lasteevne på " +
			this.#lasteevne +
			" kg."
		);
	}
}

const varevogn1 = new Varevogn("BMW", 100000, 10);
console.log(varevogn1.toString());
const bil1 = new Bil("BMW", 100000);
console.log(bil1.toString());
const bil2 = new Bil("Audi", 200000);
console.log(bil2.toString());
const varevogn2 = new Varevogn("Audi", 200000, 20);
console.log(varevogn2.toString());

console.log("Antal biler: " + Bil.antalBiler);
