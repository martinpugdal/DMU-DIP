// promise1.js
function langvarig(nr) {
    return new Promise(function (resolve, reject) {
        let type = Math.trunc(Math.random() * 3);
        if (type === 0) throw new Error(`${nr} Slet ikke OK!`);
        setTimeout(afslut, 2000);
        function afslut() {
            if (type === 1) resolve(`${nr} OK!`);
            else if (type === 2) reject(`${nr} Ikke OK!`);
        }
    });
}

langvarig(1)
    .then(resultat => console.log('Resultat: ' + resultat.toString() + " " + new Date().toTimeString()))
    .catch(fejl => console.log('Fejl/exception: ' + fejl + " " + new Date().toTimeString()));

console.log('Efter kald af langvarig()' + " " + new Date().toTimeString());