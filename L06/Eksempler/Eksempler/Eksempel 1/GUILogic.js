import { add } from './logic.js';

let plusknap = document.querySelector("#plusknap");
alert("Plusknap:" + plusknap);
plusknap.onclick = () => {
    let op1=document.querySelector("#operand1")
    let op2=document.querySelector("#operand2")

    alert("Resultatet er " + add(parseInt(op1.value), parseInt(op2.value)));
}



