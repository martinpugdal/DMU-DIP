// callback1.js
function langvarig(nr, callback) {
    let type = Math.trunc(Math.random() * 3);
    if (type === 0) throw new Error(`${nr} Slet ikke OK!`);
    setTimeout(afslut, 1000);
    function afslut() {
        if (type === 1) callback(false, `${nr} OK!`);
        else if (type === 2) callback(true, `${nr} Ikke OK!`);
    }
}

//Eller den simple udgave:
function simpelLangvarig(nr, callback) {
    setTimeout(afslut, 5000);
    function afslut() {
        callback(false, `${nr} OK!`);
    }
}

try {
    langvarig(1, slut);
    console.log('Efter kald af langvarig()');
}
catch (e) {
    console.log('Exception: ' + e);
}

function slut(fejl, resultat) {
    if (fejl)
        console.log('Fejl: ' + fejl);
    else
        console.log('Resultat: ' + resultat);
}