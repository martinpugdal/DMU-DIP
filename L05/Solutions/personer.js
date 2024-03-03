let personer=[]

let knap=document.querySelector("#addButton")
knap.onclick = () => 
    {
        let navn=document.querySelector("#navn").value
        let alder = parseInt(document.querySelector("#alder").value)
        if (alder != NaN) {
            personer.push({navn:navn,alder:alder})
            document.querySelector("#Vispersoner").innerHTML = generateTable();
        }else {
            alert("not a number")
        }

    }
function generateTable() {
    let retur = "<table>";
    for(let person of personer) {
        retur += `<tr><td>${person.navn}</td><td>${person.alder}</td></tr>`
    }
    retur += "</table>"
    return retur
}