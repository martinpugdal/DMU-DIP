function Animal(name, age) {
    this.name = name;
    this.age = age;
}

var dog = new Animal('foo', 5);
console.log(dog);
var cat = new Animal('koo', 3);
console.log(cat);

Animal.prototype.canRun = function () {
    console.log('yes ' + this.name + ' can run !');
}

dog.canRun()
cat.canRun()

function Human(name, age, money) {
    this.name = name ;
    this.age = age ; 
    this.money = money;
}
Human.prototype.canEarn = function () {
    console.log('yes ' + this.name + 'can earn');
}

let human1 = new Human("Ole", 17, 10000)
human1.canEarn()
//human1.canRun()

console.log(Animal.prototype === Object.getPrototypeOf(cat))
console.log(cat.__proto__ === Animal.prototype)
console.log(Animal.__proto__ === cat.__proto__)

// Human.prototype.__proto__ = Object.create(Animal.prototype);
// console.log(Animal.prototype === Human.prototype.__proto__.__proto__)
Human.prototype.__proto__ = Animal.prototype;
console.log(Animal.prototype === Human.prototype.__proto__)
human1.canRun()
Animal.prototype.newFunc=function() {console.log("something new")}

human1.newFunc()
cat.newFunc()

console.log(Animal.prototype === Human.prototype.__proto__.__proto__)
console.log(Animal.prototype === Object.getPrototypeOf(cat))
