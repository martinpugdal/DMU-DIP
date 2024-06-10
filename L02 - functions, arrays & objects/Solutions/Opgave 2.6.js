let stringToParse='()[{}()](({{)}))'
let stack=[];
let ends = {'{': '}', '(':')', '[':']'};
let balanceret = true;
for (let i=0;i<stringToParse.length;i++) {
    if (Object.keys(ends).includes(stringToParse[i])) {
        stack.push(stringToParse[i]);
    }  else {
        let value = stack.pop();
        if (!(stringToParse[i]===ends[value])) {
            balanceret = false;
            console.log('Ikke balanceret på plads ' + i);
            break;
        }
    }
}
if (!(stack.length === 0)) {
    balanceret = false;
    console.log('Ikke balanceret, der mangler ' + stack.length + ' tegn at blive afstakket');
}
if (balanceret) {
    console.log('Balanceret');
}