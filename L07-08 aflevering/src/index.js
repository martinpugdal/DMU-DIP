import { YatzyDice } from './YatzyDice.js';
// GUI part
// initialize game variables
const dice = new YatzyDice();
let dices = document.querySelector('#dices').children;
let lockedDices = [];
let scoreTable = [...document.querySelector('.scores').querySelectorAll('td')].filter(
    td => td.classList.contains('score-field') && !td.id.includes('total') && !td.id.includes('bonus') && !td.id.includes('sum'));
let totalTable = [...document.querySelector('.scores').querySelectorAll('td')].filter(
    td => td.classList.contains('score-field') && (td.id.includes('total') || td.id.includes('bonus') || td.id.includes('sum')));

// reset dices
function resetDice() {
    for (let i = 0; i < dices.length; i++) {
        dices[i].setAttribute('src', `assets/Unknown.png`);
        dices[i].style.animation = 'none';
        dices[i].classList.remove('locked');
    }
    lockedDices = [];
    dice.setValues([0, 0, 0, 0, 0]);
    dice.resetThrowCount();
}

// reset game
function resetGame() {
    dice.setSum(0);
    dice.setTotal(0);
    resetTurn();
    clearScoreTable();
}

// update turn counter
function updateTurnCounter() {
    if (dice.getThrowCount() === 3) {
        document.querySelector('#rolls-left').textContent = 'No more rolls left';
    } else if (dice.getThrowCount() === 0) {
        document.querySelector('#rolls-left').textContent = '';
    } else {
        document.querySelector('#rolls-left').textContent = 'Turn ' + dice.getThrowCount();
    }
}

// clear score table
function clearScoreTable() {
    for (let i = 0; i < scoreTable.length; i++) {
        scoreTable[i].textContent = '';
        scoreTable[i].classList.remove('locked');
    }
    for (let i = 0; i < totalTable.length; i++) {
        totalTable[i].textContent = '';
    }
}

// reset turn
function resetTurn() {
    resetDice();
    updateTurnCounter();
    for (let i = 0; i < scoreTable.length; i++) {
        if (scoreTable[i].classList.contains('locked')) continue;
        scoreTable[i].textContent = '';
    }
}

// check if all fields are filled
function allFieldsIsFilled() {
    for (let i = 0; i < scoreTable.length; i++) {
        if (!scoreTable[i].classList.contains('locked')) {
            return false;
        }
    }
    return true;
}

// dice
for (let i = 0; i < dices.length; i++) {
    dices[i].addEventListener('click', function () {
        if (dice.getThrowCount() === 0) {
            return;
        }
        if (lockedDices.includes(i)) {
            lockedDices.splice(lockedDices.indexOf(i), 1);
            dices[i].style.animation = 'none';
            dices[i].classList.remove('locked');
        } else {
            lockedDices.push(i);
            dices[i].style.animation = 'shake 0.5s linear 0s infinite alternate';
            dices[i].classList.add('locked');
        }
    });
}

// score field
for (let i = 0; i < scoreTable.length; i++) {
    scoreTable[i].addEventListener('click', function () {
        if (dice.getThrowCount() === 0) {
            return;
        }
        if (scoreTable[i].classList.contains('locked')) {
            return;
        }
        let score = dice.getResults()[i];
        resetTurn();
        for (let i = 0; i < dices.length; i++) {
            dices[i].setAttribute('src', `assets/Unknown.png`);
        }
        lockedDices = [];
        scoreTable[i].textContent = score;
        scoreTable[i].classList.add('locked');
        dice.setTotal(dice.getTotal() + score);
        if (i < 6) {
            dice.setSum(dice.getSum() + score);
            if (dice.getSum() >= 63) {
                totalTable[1].textContent = dice.getBonus();
                dice.setTotal(dice.getTotal() + dice.getBonus());
            }
            totalTable[0].textContent = dice.getSum();
        }
        totalTable[2].textContent = dice.getTotal()
        if (allFieldsIsFilled()) {
            var result = confirm("Vil du starte et nyt spil?");
            if (result) {
                resetGame();
            }
        }
    });
}

// roll button stuff
let rollButton = document.querySelector('#roll');
rollButton.addEventListener('click', function () {
    if (dice.getThrowCount() === 3) {
        return;
    }
    if (rollButton.textContent != 'Roll!') {
        return;
    }
    dice.throwDice(lockedDices);
    rollButton.textContent = 'Rolling...';
    updateTurnCounter();
    var lastDice = 0;
    for (let i = 0; i < dices.length; i++) {
        if (lockedDices.includes(i)) {
            continue;
        }
        lastDice = i;
        dices[i].style.animation = 'roll 12ms linear 0s infinite alternate';
        setTimeout(function () {
            let diceValue = dice.getValues()[i];
            dices[i].setAttribute('src', `assets/Dice-${diceValue}.png`);
            dices[i].style.animation = 'none';
        }, (i+1) * 120)
    }
    setTimeout(function () {
        rollButton.textContent = 'Roll!';
        let results = dice.getResults();
        scoreTable.forEach((scoreField, index) => {
            if (scoreField.classList.contains('locked')) return;
            scoreField.textContent = results[index];
        });
        
    }, (lastDice+1) * 120);
});

// start game by resetting the game
resetGame();