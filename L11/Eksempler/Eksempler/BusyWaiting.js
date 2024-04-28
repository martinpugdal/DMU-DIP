
//Problem med langvarig function
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function GetResultat() {
    sleep(5000);
    return 15;
}

// console.log("start");
// console.log(GetResultat());
// console.log("Slut på synkront");


//Nedenstående forsøg på at køre asynkront virker ikke
function langvarig() {
    return new Promise(function (resolve, reject) {
        let resultat = GetResultat();
        if (resultat > 10) {
            resolve();
        } else {
            reject();
        }
    });
}

function resolved() {
    console.log("Hurra");
}
function rejected() {
    console.log("Gik ikke");
}
// langvarig().then(resolved, rejected);
// console.log("Slut på ikke-asynkront Promise");


//asynkron løsning
function asynkronLangvarig() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            let resultat = GetResultat();
            if (resultat > 10) {
                resolve();
            } else {
                reject();
            }
        }
        ,0)
    });
}

// console.log("Asynkron start");
// asynkronLangvarig().then(resolved, rejected);
// console.log("Slut på asynkront Promise vha SetTimeout");

async function kaldSynkront() {
    console.log("Nu kaldes asynkronLangvarig synkront");
    await asynkronLangvarig().then(resolved,rejected);
    console.log("Ny er det synkrone kald færdigt");
}

kaldSynkront();
console.log("Men hovedtråden fortsætter stadig");
