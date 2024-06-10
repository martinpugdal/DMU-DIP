//refactored, men stadig besværligt

let Bil = {
    navn:"",antalHjul:4,
    koer(fart) {
        console.log("Kører " + fart + " km/t på " + this.antalHjul + " hjul");
    }
}
function BilCtor(antalHjul) {
    let retur = Object.create(Bil);
    retur.antalHjul = antalHjul;
    return retur;
}

let minBil = BilCtor(6);
minBil.koer(37);
