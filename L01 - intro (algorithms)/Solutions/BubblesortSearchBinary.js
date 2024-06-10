let list = [7, 13, 9, 8, 4, 1, 2, 16, 0, 15];
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

let searchfor=15;

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
if (foundIndex>-1) {
    console.log('found at ' + foundIndex);
} else {
    console.log('not found');
}

