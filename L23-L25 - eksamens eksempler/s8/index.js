// Lav en funktion randomTal, der tager et tal som parameter og
// returnerer en funktion, der returnerer et tilfældigt tal mellem 0 og parameteren.

function randomTal(number) {
    return () => Math.floor(Math.random() * number);
}

// Lav en anden funktion tilfaeldigAlder som en variabel
// ved at kalde randomTal med en passende parameter og gemme resultat-funktionen i variablen
const tilfaeldigAlder = randomTal(100);

// Lav en klasse Person med attributter Alder og Hoejde.
function Person(alder, hoejde) {
    this.alder = alder;
    this.hoejde = hoejde;
}

// Lav en funktion LavTilfaeldigePersoner(), der tager to parametre:
// en funktion, der genererer tilfældige aldre og en funktion,
// der genererer tilfældige højder.
// Funktionen skal returnere et array med 20 tilfældige personer
// ved brug af de to funktioner, der kommer med som parametre.
function LavTilfaeldigePersoner(alderFunc, hoejdeFunc) {
    const personer = [];

    for (let i = 0; i < 20; i++) {
        let person = new Person(alderFunc(), hoejdeFunc());
        personer.push(person);
    }
    return personer;
}

const personer = LavTilfaeldigePersoner(tilfaeldigAlder, tilfaeldigAlder);
for (const personNumber in personer) {
    console.log(personer[personNumber]);
}
