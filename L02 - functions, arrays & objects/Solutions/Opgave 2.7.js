
let list = [7, 13, 9, 8, 4, 1, 2, 16, 0];

list.max = function max() {
    let maximum = this[0];
    for (let i = 1; i < this.length; i++) {
        const tal = this[i];
        if (tal > maximum)
            maximum = tal;
    }
    return maximum;
}
console.log(list.max());

function contains(element) {
    return this.includes(element);
}
list.contains = contains;
console.log(list.contains(7));

list['sum'] = function () {
    let sum = 0;
    for (let tal of this)
        sum += tal;
    return sum;
}
console.log(list.sum());