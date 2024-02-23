let array1=[1, 3, 4, 17, 22, 23];
let array2=[1, 2, 6, 11, 19];
let result=[];

let index1 = 0;
let index2 = 0;

while (index1<array1.length || index2 < array2.length) {
    if (!(index1<array1.length)) {
        result.push(array2[index2]);
        index2++;
    } else if (!(index2 < array2.length)) {
        result.push(array1[index1]);
        index1++;
    }else if (array1[index1]<array2[index2]) {
        result.push(array1[index1])
        index1++;
    }else {
        result.push(array2[index2]);
        index2++;
    }
}
for (let i=0;i<result.length-1;i++) {
    console.log(result[i]);
}