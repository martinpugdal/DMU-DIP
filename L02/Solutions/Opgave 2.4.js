let tekst = "Her er en tekst med et ord gentaget en række gange i denne tekst en";

let ordliste = tekst.split(' ');
let map = {};
for (let ord of ordliste) {
    if (ord in map) {
        map[ord]++;
    } else {
        map[ord] = 1;
    }
}
console.log(map);