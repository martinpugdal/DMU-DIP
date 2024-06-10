function showclock() {
    let date = new Date();
    let clock = document.querySelector("#clock");
    clock.innerHTML = date.toLocaleTimeString();
}
let timerId = null;
function start() {
    if (timerId == null) {
        timerId = setInterval(showclock, 1000);
        showclock();
    }
}
function stop() {
    clearInterval(timerId);
    timerId = null;
}
