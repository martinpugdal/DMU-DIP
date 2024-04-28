let datestart;
function showclock() {
    let datenow=new Date();
    let clock = document.querySelector("#clock");
    clock.innerHTML = datenow.getTime() - datestart.getTime();
}
let timerId = null;
function start() {
    if (timerId == null) {
        datestart = new Date();
        timerId = setInterval(showclock, 10);
        showclock();
    }
}
function stop() {
    clearInterval(timerId);
    timerId = null;
}
