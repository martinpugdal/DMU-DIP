function compare(s1,s2) {
    if (s1<s2) {
        return -1;
    } else if (s1>s2) {
        return 1;
    } else {return 0;}
}

function compareLen(s1, s2) {
    if (s1.length<s2.length) {
        return -1;
    } else if (s1.length>s2.length) {
        return 1;
    } else {return 0;}    
}
function compareIgnoreCase(s1, s2) {
    return compare(s1.toLowerCase(), s2.toLowerCase());
}

function BubbleSort(list, comparator) {
    function swap(list, j) {
        let temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
    }
    for (let i = list.length - 1; i >= 0; i--) {
        for (let j = 0; j <= i - 1; j++) {
            if (comparator(list[j], list[j + 1])>0) {
                swap(list,j);
            }
        }
    }
}

let list = [7, 13, 9, 8, 4, 1, 2, 16, 0, 15];
BubbleSort(list, compare);
console.log(list.toString())
let list2 = ['a', 'c2', 'ca', 'c1', 'A', 'ddd', 'add', 'C2', 'aCd', 'acd', '15', '0'];
BubbleSort(list2, compare);
console.log(list2.toString())
BubbleSort(list2, compareLen);
console.log(list2.toString())
BubbleSort(list2, compareIgnoreCase);
console.log(list2.toString())

