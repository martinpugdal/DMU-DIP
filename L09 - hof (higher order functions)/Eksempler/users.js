let users = [
    {
    name: 'Yazeed',
    age: 25
    },
    {
    name: 'Sam',
    age: 30
    },
    {
    name: 'Bill',
    age: 20
    }
    ];

    totalAge = users.reduce((total, user) => user.age + total, 0);
console.log("Average: " + totalAge/users.length);



let tal = [1, 2, 3, 4, 5];
let sum = 0;
tal.forEach(element => sum += element);
console.log("Sum: " + sum); // => 15
tal.forEach((element) => element++);
console.log(tal); // => [ 1, 2, 3, 4, 5]
tal.forEach((element, index, array) => array[index]++);
console.log(tal); // => [ 2, 3, 4, 5, 6]