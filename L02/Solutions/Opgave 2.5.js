let p1={navn:'Ole', email:'o@a.b', nummer:'12345678'};
let p2={navn:'Ib', email:'i@a.b', nummer:'12345678'};
let p3={navn:'Kim', email:'k@a.b', nummer:'12345678'};

let personer=[p1, p2, p3];

// let personer = [];
// personer.push(p1);
// personer.push(p2);
show(personer);

personer[1] = {navn:'Karl', email:'ka@a.b', nummer:'12345699'};
show(personer);
delete(personer[0]);
show(personer);



function show(list) {
    console.log('Liste:');
    for (let i in list) {
        console.log(list[i]);
    }
}