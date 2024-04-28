let persons = [
    {
        firstName: 'Yazeed',
        lastName: 'Hussein',
        age: 25
    },
    {
        firstName: 'Sam',
        lastName: 'Gamwise',
        age: 30
    },
    {
        firstName: 'Bill',
        lastName: 'Bailey',
        age: 20
    },
    {
        firstName: 'Baby',
        lastName: 'Driver',
        age: 16
    }
];


//map:
let mapped = persons.map((person) =>  ({fullname: person.firstName + " " + person.lastName, adult: person.age>=18?true:false}));
mapped.forEach(f => console.log(f.fullname + " is adult? " + f.adult));


//reduce:
let reduced = persons.reduce((totalAge, person) => totalAge + person.age, 0);
console.log("totalAge:" + reduced);

let reducedNames = persons.reduce((accumulatedNames, person) => accumulatedNames + person.firstName);
console.log(reducedNames);