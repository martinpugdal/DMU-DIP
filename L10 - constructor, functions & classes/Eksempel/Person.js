function Person(navn) {
    this.navn = navn;
}
Person.prototype.toString = function () { return 'Person: ' + this.navn; }
let person = new Person('Viggo');
console.log(person.__proto__ === Person.prototype)  //true
console.log(person.navn); // => Viggo
console.log(person.toString()); // => Person: Viggo
console.log(person.constructor.name); // => Person
console.log(person.constructor === Person); // => true
console.log(Person.prototype.name); // => Person
console.log(person instanceof Person); // => true
console.log(typeof person.constructor); // => function
console.log(typeof Person.prototype); // => object

let noctor = {name:"Kim"}
console.log(typeof noctor.constructor); // => function
