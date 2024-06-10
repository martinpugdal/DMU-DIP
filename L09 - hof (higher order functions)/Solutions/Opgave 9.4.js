//9.4 a
function Compose(f1, f2, x) {
    return f1(f2(x));
}

//9.4 b
function Compose2(f1, f2) {
    return function (x) { return f1(f2(x)); }
}

//9.4 c
function Compose3(a) {
    return (x) => {
        let result = x;
        for (let i = a.length - 1; i >= 0; i--) {
            result = a[i](result);
        }
        return result;
    }
}





let f = function (x) { return x * x; };
let g = function (x) { return x + 5; };
let h = (x) => 7 * x;

console.log(Compose(f, g, 4));  //81
let gh = Compose2(g, h);
console.log(gh(7)); //54
let fSubtract3h = Compose3([f, (k) => k - 3, h]);
console.log(fSubtract3h(3)); //18*18=324