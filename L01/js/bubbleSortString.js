// bubbleSort.js
let list = ["acca", "abba", "d", "b", "f", "e", "c", "a"];

for (let i = list.length - 1; i >= 0; i--) {
    for (let j = 0; j <= i - 1; j++) {
        if (list[j] > list[j + 1]) {
            let temp = list[j];
            list[j] = list[j+1];
            list[j+1] = temp;
        }
    }
}
console.log(list.toString()); // => a,abba,acca,b,c,d,e,f
