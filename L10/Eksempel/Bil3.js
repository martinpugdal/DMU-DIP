//constructor function, lidt bedre
//nedenstående svarer til objekt Bil sammen med BilCtor, men er lettere at anvende
function Bil(antalHjul) {
    this.navn = "";
    this.antalHjul = antalHjul;
    this.koer = (fart) => {
        console.log("Kører " + fart + " km/t på " + this.antalHjul + " hjul");
    }
}



let minBil = new Bil(1);
minBil.koer(137);
