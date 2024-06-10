function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function megetLangFunction() {
    await sleep(5000);
}
async function TestSleep() {
    console.log("Nu starter vi");
    await megetLangFunction();
    console.log("Efter meget lang tid");
}

TestSleep();