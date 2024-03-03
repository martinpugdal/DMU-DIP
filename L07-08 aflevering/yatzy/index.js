// dice class for yatzy game
class YatzyDice {
    
    constructor() {
        this.values = [0, 0, 0, 0, 0]
        this.throwCount = 0;
        this.sum = 0;
        this.bonus = 50;
        this.total = 0;
    }
    
    getRandom() {
        return Math.floor(Math.random() * 6) + 1;
    }

    getValues() {
        return this.values;
    }

    setValues(values) {
        this.values = values;
    }
    
    getSum() {
        return this.sum;
    }
    
    setSum(sum) {
        this.sum = sum;
    }
    
    getBonus() {
        return this.bonus;
    }
    
    getTotal() {
        return this.total;
    }
    
    setTotal(total) {
        this.total = total;
    }

    getThrowCount() {
        return this.throwCount;
    }

    resetThrowCount() {
        this.throwCount = 0;
    }

    throwDice(diceNumbersToSkip = []) {
        for (let i = 0; i < 5; i++) {
            if (diceNumbersToSkip.includes(i)) {
                continue;
            }
            this.values[i] = this.getRandom();
        }
        this.throwCount++;
    }

    getResults() {
        const results = [].fill(0, 0, 14);
        for (let i = 0; i < 6; i++) {
            results[i] = this.sameValuePoints(i);
        }
        results[6] = this.onePairPoints();
        results[7] = this.twoPairPoints();
        results[8] = this.threeSamePoints();
        results[9] = this.fourSamePoints();
        results[10] = this.fullHousePoints();
        results[11] = this.smallStraightPoints();
        results[12] = this.largeStraightPoints();
        results[13] = this.chancePoints();
        results[14] = this.yatzyPoints();
        return results;
    }

    frequency() {
        const frequency = [0, 0, 0, 0, 0, 0];
        for (const value of this.values) {
            frequency[value-1]++;
        }
        return frequency;
    }

    sameValuePoints(value) {
        return this.frequency()[value] * (value+1);
    }

    onePairPoints() {
        let pairPoints = 0;
        const frequency = this.frequency();
        for (let i = 0; i < frequency.length; i++) {
            if (frequency[i] >= 2 && frequency[i] < 4) {
                pairPoints = (i+1);
            }
        }
        return (pairPoints * 2);
    }

    twoPairPoints() {
        let points = 0;
        const pair1Points = this.onePairPoints() / 2;
        const frequency = this.frequency();
        for (let i = 0; i < pair1Points-1; i++) {
            if (frequency[i] >= 2 && frequency[i] < 4) {
                points = (pair1Points * 2) + ((i+1) * 2);
            }
        }
        return points;
    }

    threeSamePoints() {
        let threeSamePoints = 0;
        const frequency = this.frequency();
        for (let i = 0; i < frequency.length; i++) {
            if (frequency[i] >= 3) {
                threeSamePoints = ((i+1) * 3);
            }
        }
        return threeSamePoints;
    }

    fourSamePoints() {
        let fourSamePoints = 0;
        const frequency = this.frequency();
        for (let i = 0; i < frequency.length; i++) {
            if (frequency[i] >= 4) {
                fourSamePoints = ((i+1) * 4);
            }
        }
        return fourSamePoints;
    }

    fullHousePoints() {
        let fullHousePoints = 0;
        let threeSamePoints = 0;
        let pairPoints = 0;
        const frequency = this.frequency();
        for (let i = 0; i < frequency.length; i++) {
            if (frequency[i] >= 3) {
                threeSamePoints = (i+1);
            }
        }
        for (let i = 0; i < frequency.length; i++) {
            if (frequency[i] >= 2 && threeSamePoints !== (i+1)) {
                pairPoints = (i+1);
            }
        }
        if (threeSamePoints !== 0 && pairPoints !== 0) {
            fullHousePoints = (threeSamePoints * 3) + (pairPoints * 2);
        }
        return fullHousePoints;
    }

    smallStraightPoints() {
        let smallStraightPoints = 0;
        const frequency = this.frequency();
        if (
            frequency[0] === 1 &&
            frequency[1] === 1 &&
            frequency[2] === 1 &&
            frequency[3] === 1 &&
            frequency[4] === 1
        ) {
            smallStraightPoints = (1 + 2 + 3 + 4 + 5);
        }
        return smallStraightPoints;
    }

    largeStraightPoints() {
        let largeStraightPoints = 0;
        const frequency = this.frequency();
        if (
            frequency[1] === 1 &&
            frequency[2] === 1 &&
            frequency[3] === 1 &&
            frequency[4] === 1 &&
            frequency[5] === 1
        ) {
            largeStraightPoints = 20;
        }
        return largeStraightPoints;
    }

    chancePoints() {
        let chancePoints = 0;
        for (const face of this.getValues()) {
            chancePoints += face;
        }
        return chancePoints;
    }

    yatzyPoints() {
        let yatzyPoints = 0;
        const frequency = this.frequency();
        for (const freqNum of frequency) {
            if (freqNum === 5) {
                yatzyPoints = 50;
            }
        }
        return yatzyPoints;
    }
}


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