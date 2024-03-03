let spans = document.querySelectorAll('span');
let tekster = document.querySelectorAll('h1');

let valgt = 0;
for (let span = 0; span < spans.length; span++) {
    tekster[span].style.display = (span === valgt ? 'block' : 'none');
    spans[span].onclick = () => {
        if (span != valgt) {
            tekster[valgt].style.display = 'none';
            tekster[span].style.display = 'block';
            valgt = span;
        }
    }
}