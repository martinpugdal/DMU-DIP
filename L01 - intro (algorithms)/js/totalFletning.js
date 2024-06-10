let sortedList1 = [1, 2, 3, 4, 5, 6];
let sortedList2 = [3, 5, 9, 10, 11, 12];

console.log(mergeSortedList(sortedList1, sortedList2)); // => [1, 2, 3, 3, 4, 5, 5, 6, 9, 10, 11, 12]

function mergeSortedList(sortedList1, sortedList2) {

    const mergedList = [];

    let i = 0;
    let j = 0;

    for (let k = 0; k < sortedList1.length + sortedList2.length; k++) {
        if (sortedList1[i] < sortedList2[j]) {
            mergedList[k] = sortedList1[i];
            i++;
        } else {
            mergedList[k] = sortedList2[j];
            j++;
        }
    }
    return mergedList;
}