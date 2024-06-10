// Tilføj kode for opgave 4.1 - 4.5 her!

//4.1
let ps = document.querySelectorAll('p');
for (let p of ps) {
    p.className = 'red';
}

//4.2
let heads=document.querySelectorAll('h1+*+*');
for (let h of heads) {
    h.style.color='brown';
}

//4.3
let li=document.getElementsByTagName('ul')[0];
for (let i=0;i<li.children.length;i++) {
    if (i%2===0) {li.children[i].style.color='lightblue';}
}

//eller:
/*for (let even of lis = document.querySelectorAll('li:nth-child(odd)')) {
    even.style.backgroundColor = 'lightblue';
}*/

//4.4
let sections=document.querySelectorAll('h1+p');
for (let s of sections) {
    s.outerHTML='<h2> ' + s.innerHTML + '</h2>';
    let test=6;
}

//4.5
let id=1;
let indholdStr='<Div id="Indhold"></div>';
document.body.innerHTML = indholdStr + document.body.innerHTML;
let indhold=document.querySelector('#Indhold');
let headlines = document.querySelectorAll('h1');
for (let h of headlines) {
    h.id='id' + id;
    indhold.innerHTML = '<a href=#' + h.id + '>Overskrift ' + h.textContent + '</a><BR>' + indhold.innerHTML;
    id++;
}

