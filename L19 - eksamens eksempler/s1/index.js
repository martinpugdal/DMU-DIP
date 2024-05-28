const biler = [
	{ nummerplade: "hej123", vægt: 123, mærke: "audi", hjul: 8 },
	{ nummerplade: "hej123", vægt: 321, mærke: "audi", hjul: 12 },
	{ nummerplade: "hej123", vægt: 41, mærke: "audi", hjul: 4 },
	{ nummerplade: "hej123", vægt: 12, mærke: "audi", hjul: 5 },
	{ nummerplade: "hej123", vægt: 123, mærke: "audi", hjul: 8 },
	{ nummerplade: "hej123", vægt: 51, mærke: "audi", hjul: 8 },
	{ nummerplade: "hej123", vægt: 123, mærke: "audi", hjul: 8 },
	{ nummerplade: "hej123", vægt: 123, mærke: "audi", hjul: 8 },
	{ nummerplade: "hej123", vægt: 123, mærke: "audi", hjul: 8 },
	{ nummerplade: "hej123", vægt: 123, mærke: "audi", hjul: 12 },
	{ nummerplade: "hej123", vægt: 123, mærke: "audi", hjul: 8 },
	{ nummerplade: "hej321", vægt: 123, mærke: "audi", hjul: 8 },
];

// Lav et array med de biler, der har netop 8 hjul.
console.log(biler.filter((bil) => bil.hjul == 8));

// Lav et array med alle nummerpladernes numre.
console.log(biler.map((bil) => bil.nummerplade));

// Find den mindste vægt.
console.log(
	biler.reduce((acc, bil) => (bil.vægt < acc ? bil.vægt : acc), Infinity)
);

// Lav et array med alle biler, der har størst antal hjul.
console.log(
	JSON.stringify(
		biler.filter(
			(bil) =>
				bil.hjul ==
				biler.reduce(
					(acc, bil1) => (bil1.hjul > acc ? bil1.hjul : acc),
					0
				)
		)
	)
);

// Lav et array af objekter, der giver antal biler for hvert antal hjul, altså f.eks. 7 biler med 4 hjul, 4 biler med 6 hjul osv.
console.log(
	biler
		.map((bil) => bil.hjul)
		.reduce((acc, hjul) => {
			acc[hjul] = acc[hjul] ? acc[hjul] + 1 : 1;
			return acc;
		}, {})
);
