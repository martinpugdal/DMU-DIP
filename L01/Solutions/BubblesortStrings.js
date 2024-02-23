let list = ['a', 'c2', 'ca', 'c1', 'ddd', 'add', 'acd', '15', '0'];
for (let i = list.length - 1; i >= 0; i--) {
    for (let j = 0; j <= i - 1; j++) {
        if (list[j] > list[j + 1]) {
            let temp = list[j];
            list[j] = list[j + 1];
            list[j + 1] = temp;
        }
    }
}
console.log(list.toString());//=>0,1,2,4,7,8,9,13,16