
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc, getDoc, query, where } from 'firebase/firestore'
import express from 'express';
import pug from 'pug';
const app = express();


const port = 8000;

const firebaseConfig = {
    apiKey: "AIzaSyBAaFcmW5-uKbIpnhhuTszoGpVprs_wiFs",
    authDomain: "chat-6ee49.firebaseapp.com",
    projectId: "chat-6ee49",
    storageBucket: "chat-6ee49.appspot.com",
    messagingSenderId: "889313791042",
    appId: "1:889313791042:web:fa5afcdb09ddbb182231db",
    measurementId: "G-W7VE9J7PXZ"
  };
  
  // Initialize Firebase
  const firestoreApp = initializeApp(firebaseConfig);
  const db = getFirestore(firestoreApp);

  async function getCars() {
    let carCol=collection(db, 'cars');
    let cars = await getDocs(carCol);

    let carList = cars.docs.map(doc => {
        let data = doc.data();
        data.docID = doc.id;
        return data;
    })
    return carList;
}

let beskeder = [{ afsender: "Ole", tekst: "Min første besked", chatrum: "rum1", nummer: "1" }, { afsender: "Ib", tekst: "Hallo, er der nogen?", chatrum: "rum2", nummer: "2" }];
let chatRum = [{ navn: "rum1" }, { navn: "rum2" }];

async function getAlleBeskeder() {
    let beskedCol=collection(db, 'beskeder');
    let beskedSnapshot = await getDocs(beskedCol);

    let retur = beskedSnapshot.docs.map(doc => {
        let data = doc.data();
        data.docID = doc.id;
        return data;
    })
    return beskeder;
}

async function getBeskederForRum(chatrum) {
    let beskedCol=collection(db, 'beskeder');
    let q = query(beskedCol, where('chatrum', '==', chatrum));
    let beskedSnapshot = await getDocs(q);

    let retur = beskedSnapshot.docs.map(doc => {
        let data = doc.data();
        data.docID = doc.id;
        return data;
    })
    return retur;
}

async function getChatRum() {
    let chatrumCol=collection(db, 'chatRum');
    let chatrumSnapshot = await getDocs(chatrumCol);

    let retur = chatrumSnapshot.docs.map(doc => {
        let data = doc.data();
        data.docID = doc.id;
        return data;
    })
    return retur;
}

async function gemBesked() {
    
}

// express indgange
//Tillad cors requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});
app.use(express.json());

app.get('/beskeder', async (request, response) => {
    response.status(200);
    response.send(await getAlleBeskeder());
});
app.get('/beskeder/:chatrum', async (request, response) => {
    response.status(200);
    response.send(await getBeskederForRum(request.params.chatrum));
});
app.get('/chatrum', async (request, response) => {
    response.status(200);
    response.send(await getChatRum());
});

app.post('/beskeder', (request, response) => {
    console.log(request.body);
    addDoc(collection(db, 'beskeder'), request.body);
    response.status(201);
    response.send("Added");
});
app.delete('/beskeder/:id', (request, response) => {
    deleteDoc(doc(db, 'beskeder', request.params.id));
    response.status(200);
    response.send("Deleted");
});

app.listen(port);

console.log('Lytter på port ' + port + ' ...');