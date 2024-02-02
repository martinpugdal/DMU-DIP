// bubbleSortBinarySearch.ts
export {}

let list: number[] = [7, 13, 9, 8, 4, 1, 2, 16, 0];

for (let i = list.length - 1; i >= 0; i--) {
    for (let j = 0; j <= i - 1; j++) {
        if (list[j] > list[j + 1]) {
            let temp = list[j];
            list[j] = list[j+1];
            list[j+1] = temp;
        }
    }
}
console.log(list.toString()); // => 0,1,2,4,7,8,9,13,16

console.log(binarySearch(list, 9)); // => 6
console.log(binarySearch(list, 10)); // => -1

function binarySearch(sortedList: number[], key: number) : number {
    let start = 0;
    let end = sortedList.length - 1;

    while (start <= end) {
        // get the middle of the start and end
        let middle = Math.floor((start + end) / 2);

        if (sortedList[middle] === key) {
            // found the key
            return middle;
        } else if (sortedList[middle] < key) {
            // continue searching to the right
            start = middle + 1;
        } else {
            // search searching to the left
            end = middle - 1;
        }
    }
    // key wasn't found in the array
    return -1;
}