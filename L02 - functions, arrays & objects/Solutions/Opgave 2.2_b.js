lib = require('./Opgave 2.2_a')
function binarySearch(list, searchfor) {
    let lower=0;
    let upper=list.length-1;
    
    let foundIndex = -1;
    while (lower<upper+1) {
        let half=upper - Math.trunc((upper-lower)/2);
        if (list[half] === searchfor) {
            upper = lower-1;
            foundIndex = half;
        } else if (list[half]<searchfor) {
            lower = half + 1;
        } else {
            upper = half - 1;
        }
    }
    return foundIndex;
}

let list = [7, 13, 9, 8, 4, 1, 2, 16, 0, 15];
lib.BubbleSort(list);
console.log(list.toString())

let foundIndex = binarySearch(list, 15)
if (foundIndex>-1) {
    console.log('found at ' + foundIndex);
} else {
    console.log('not found');
}
