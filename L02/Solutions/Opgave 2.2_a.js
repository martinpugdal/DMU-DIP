function BubbleSort(list) {
    function swap(list, j) {
        let temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
    }
    for (let i = list.length - 1; i >= 0; i--) {
        for (let j = 0; j <= i - 1; j++) {
            if (list[j] > list[j + 1]) {
                swap(list,j);
            }
        }
    }
}



let list = [7, 13, 9, 8, 4, 1, 2, 16, 0, 15];
BubbleSort(list);
console.log(list.toString())

module.exports = {BubbleSort};
