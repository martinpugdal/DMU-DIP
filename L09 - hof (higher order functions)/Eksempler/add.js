function add(x) {
    return (y) => x + y;
}

//add = (x) => (y) => x + y;

// Hver for sig 
add10 = add(10); 
add15 = add(15);
result = add10(20);
console.log(result); // 30

console.log(add15(45));

// Eller på en gang
result = add(10)(20);
console.log(result); // 30




//mere avanceret:
function avanceretAdd(x) {
    let temp = (a) => a + 1;
    return (y) => temp(x) + y;
}

add10Plus1 = avanceretAdd(10);
console.log("add10Plus1: " + add10Plus1(20));

//endnu mere avanceret:
function mereAvanceretAdd(fcn) {
    return (y) => fcn() + y;
}

let someNumber = 7;
someNumber=(new Date()).getDay();
addFcn = mereAvanceretAdd(() => someNumber*someNumber);
console.log("addFcn: " + addFcn(10));