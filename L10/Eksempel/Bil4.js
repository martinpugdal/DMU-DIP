//constructor function
function Bil(antalHjul) {
    this.navn = "";
    this.antalHjul = antalHjul;
    this.koer = function(fart) {
        console.log("1. Kører " + fart + " km/t på " + this.antalHjul + " hjul");
    }
}
let minBil = new Bil(1);
console.log(minBil.biltype);
Bil.prototype.biltype = "Ukendt";
console.log(minBil.biltype);
minBil.farve="Grøn";

Bil.vaegt = 1000;

let minBil2 = new Bil(1);

console.log(minBil2.biltype);
minBil.biltype = "Ford";
console.log(minBil.biltype);
let bil2 = new Bil(2);
console.log(bil2.biltype);
bil2.biltype = "Kia";
console.log(bil2.biltype);

//minBil.koer(50);
bil2.koer(45);
//I nedenstående refererer this ikke objektet.
Bil.prototype.koer = (fart) => {
    console.log("2. Kører " + fart + " km/t på " + this.antalHjul + " hjul");
}
minBil.koer(75);
//Denne er bedre
Bil.prototype.koer = function(fart) {
    console.log("3. Koerer " + fart + " km/t på " + this.antalHjul + " hjul");
}
minBil.koer(100);

Bil.prototype.toString = function() {return this.biltype};

console.log(minBil.toString());

//Statics
Bil.beregnKmPerLiter = function(km, liter) {
    return km/liter;
}

console.log(Bil.beregnKmPerLiter(100,6.2));

console.log(Object.prototype === Object.getPrototypeOf(minBil));
console.log(Bil.prototype === Object.getPrototypeOf(minBil));

