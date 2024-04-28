import * as lib from './Opgave 2.3.js'

function compareSort(compare) {
    return function (array) {
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