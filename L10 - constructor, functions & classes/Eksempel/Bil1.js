
//mega besværligt, men faktisk det der sker
let Bil = {
    navn:"",antalHjul:4,
    koer : function(fart) {
        console.log("Kører " + fart + " km/t på " + this.antalHjul + " hjul");
    }
}

let minBil = Object.create(Bil);
console.log(minBil.antalHjul);
minBil.antalHjul = 5;
console.log(minBil.antalHjul);
minBil.koer(37);

