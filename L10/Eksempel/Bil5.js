//class

class Bil {
    constructor(antalHjul) {
        this.#navn = "";
        this.antalHjul = antalHjul;
    }
    #navn;
    // koer = function(fart) {
    //     console.log("Kører " + fart + " km/t på " + this.antalHjul + " hjul");
    // }
    koer(fart) {
        console.log("Kører " + fart + " km/t på " + this.antalHjul + " hjul");
    }
}

let minBil = new Bil(4);
minBil.koer(40);
// console.log(minBil.#navn);

class Lastbil extends Bil {
    constructor(antalHjul, lasteevne) {
        super(antalHjul);
        this.lasteevne = lasteevne;
    }
    koer(fart) {
        super.koer(fart);
        console.log("lastbil:" + this.lasteevne);
    }
    // koer = function(fart) {
    //     super.koer(fart);
    //     console.log("lastbil:" + this.lasteevne);
    // }
}

let b = new Lastbil(8,1000);
b.koer(20);

console.log(minBil instanceof Bil);
console.log(minBil instanceof Lastbil);
console.log(b instanceof Bil);
console.log(b instanceof Lastbil);
