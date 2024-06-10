// JSON.js
let json = '{"x":1,"a":[true, null, "test"]}';
let objekt = JSON.parse(json);
console.log(objekt); // => { x: 1, a: [ true, null, 'test' ] }

objekt = { x: 1, m: function () { }, a: [true, undefined, 'test'] };
json = JSON.stringify(objekt);
console.log(json); // => {"x":1,"a":[true,null,"test"]}

let obj1= {navn:'ole', alder:8, adresse:{vejnavn:'gaden',nummer:1}};
let str = JSON.stringify(obj1);
console.log(str);

let str2='{"navn":"ib", "alder": 7, "adresse":{"vejnavn":"Vestergade","nummer":"11"}}';
let obj2=JSON.parse(str2);
console.log(obj2.adresse.vejnavn);