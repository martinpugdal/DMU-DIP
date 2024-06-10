

function GetResultat() {
    return Math.floor(Math.random()*11);
}
function HentTal() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            let resultat = GetResultat();
            if (resultat== 10) {
                throw new Error("Det fejlede big time");
            }
            if (resultat <= 7) {
                resolve(resultat);
            } else {
                reject();
            }
        }
        ,0)
    });
}

function resolved(value) {
    console.log(value);
}
function rejected(error) {
    console.log("No good");
}
Promise.all([HentTal(), HentTal(), HentTal(), HentTal()]).then(resolved).catch(rejected);
console.log("Promises sat i gang");