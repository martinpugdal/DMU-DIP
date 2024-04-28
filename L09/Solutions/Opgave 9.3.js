import * as lib from './Opgave 2.3.js'

function compareSort(compare) {
    if (typeof compare != 'function') throw Error('not a function as argument');
    if (compare.length>2) throw Error('too many parameters to compare function');
    if (arguments.length>1) throw Error('too many arguments');
    return function (array) {
        if (!Array.isArray(array)) throw Error('not an array:' + typeof array);
        if (arguments.length>1) throw Error('too many arguments');
        return array.sort(compare);
    }
}

let lenSort=compareSort(lib.compareLen);
let ignoreCaseSort=compareSort(lib.compareIgnoreCase);
//eller umiddelbart
// function lenSort(array) {
//     return compareSort(lib.compareLen)(array);
// }
//men det er ikke nær så godt

let list = ['abe', 'KATTE','abekat','ABE'];
console.log(lenSort(list));
console.log(ignoreCaseSort(list));
//let badSort1=compareSort([1,2,3]);
//let badSort2=compareSort(lib.compareLen, lib.compareIgnoreCase);
//let badSort3=compareSort((a, b, c) => a-b);
//console.log(lenSort(3));
console.log(lenSort(list, [1,2,3]));
