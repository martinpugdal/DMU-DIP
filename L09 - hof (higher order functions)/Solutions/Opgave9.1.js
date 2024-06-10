let personer = [
    { navn: 'Ole', alder: 25, mobil: 12345678 },
    { navn: 'Ida', alder: 19, mobil: 23456789 },
    { navn: 'Ask', alder: 32, mobil: 34567890 }
]

let findMobil = personer.filter((p) => p.mobil == 23456789);
//eller brug find
console.log(findMobil[0].navn);

//console.log(personer.map((p) => p.alder).reduce((total, alder) => Math.min(alder, total)));
console.log(personer.reduce((total, p) => Math.min(p.alder, total), Number.MAX_VALUE));

personer.forEach((p, index) => p.id = index);
console.log(personer);

console.log(personer.map((p) => p.navn).sort().reduce((total, n) => total + ', ' + n));

console.log(personer.filter((p) => p.alder>30).map((p) => ({navn: p.navn, alder: p.alder})));
