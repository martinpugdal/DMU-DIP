const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];


let div = document.querySelector("#mountains");
let keys=Object.keys(MOUNTAINS[0]);
// let tableStr =`<table><tr><th>${keys[0]}</th><th>${keys[1]}</th><th>${keys[2]}</th></tr>`;
let tableStr = '<table><tr><th>' + keys[0] + '</th><th>' + keys[1] + '</th><th>' + keys[2]+ '</th></tr>'
for (let m of MOUNTAINS) {
    tableStr += `<tr>`;
    let i=0;
    for (let k of keys) {
        tableStr += `<td>${m[keys[i++]]}</td>`
    }
    tableStr += '</tr>';
}
tableStr += '</table>';
div.innerHTML=tableStr;
