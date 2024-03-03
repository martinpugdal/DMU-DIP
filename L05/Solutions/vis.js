let elementvalues= {
    tal:{text:'Tal', onclick: event => event.target.value = Math.trunc(Math.random()*10)},
    tid:{text:'Tid', onclick: event => event.target.value=(new Date()).toLocaleDateString()}
}

let elements=document.querySelectorAll("input");
for(let inputelement of elements) {
    inputelement.outerHTML='<label id=' + inputelement.id + '-label for=' + inputelement.id + '>' + elementvalues[inputelement.id].text + '</label>' + inputelement.outerHTML;
}
elements=document.querySelectorAll("input");
for(let inputelement of elements) {
    inputelement.onclick=elementvalues[inputelement.id].onclick;
    elementvalues[inputelement.id].inputelement = inputelement; 
    //ny attribut inputelement, til eventuel brug nedenfor i knappen
}

document.querySelector('button').onclick=
() => {
    // elementvalues.tal.inputelement.value='';
    // elementvalues.tid.inputelement.value='';
    for(let inputelement of elements) {
        inputelement.value='';
    } 
}