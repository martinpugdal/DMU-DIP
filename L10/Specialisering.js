// opgave10.1.js
class Person {
    constructor(navn) { this.navn = navn; }
    toString() { return this.navn; }
}
class Studerende extends Person {
    constructor(navn, id) { super(navn); this.id = id; }
    toString() { return super.toString() + ": " + this.id; };
}

let p1 = new Person("Viggo");
let p2 = new Person("Børge");
let s1 = new Studerende("Ida", 123);
let s2 = new Studerende("Ole", 123);

let liste = [p1, p2, s1, s2];

class Kat {
    constructor(navn) { this.navn = navn; }
    toString() { return 'Kat: ' + this.navn; };
}

