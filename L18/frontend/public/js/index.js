import { get, getAPIURL, post } from "./httpsUtil.js";

// initialize important variables
const sessionID = new URLSearchParams(window.location.search).get("sessionID");
const roomID = window.location.pathname.split("/")[2];

const diceData = get(getAPIURL() + "/dice?roomID=" + roomID, sessionID).then(
    (values) => {
        console.log(values);
        return values;
    }
);

// initialize dice and other variables
// const dice = new YatzyDice();
let dices = document.querySelector("#dices").children;
// let lockedDices = [];
let scoreTable = [
    ...document.querySelector(".scores").querySelectorAll("td"),
].filter(
    (td) =>
        td.classList.contains("score-field") &&
        !td.id.includes("total") &&
        !td.id.includes("bonus") &&
        !td.id.includes("sum")
);
let totalTable = [
    ...document.querySelector(".scores").querySelectorAll("td"),
].filter(
    (td) =>
        td.classList.contains("score-field") &&
        (td.id.includes("total") ||
            td.id.includes("bonus") ||
            td.id.includes("sum"))
);

// reset dices
function resetDice() {
    for (let i = 0; i < dices.length; i++) {
        dices[i].setAttribute("src", `/static/img/Unknown.png`);
        dices[i].style.animation = "none";
        dices[i].classList.remove("locked");
    }
    post(getAPIURL() + "/dice/resetdice", {}, sessionID).then((values) => {
        console.log(values);
    });
}

// reset game
function resetGame() {
    diceData.sum = 0;
    dice.setTotal(0);
    diceData.bonus = 50;
    diceData.bonusGranted = false;
    resetTurn();
    clearScoreTable();
}

// update turn counter
function updateTurnCounter() {
    if (diceData.throwCount === 3) {
        document.querySelector("#rolls-left").textContent =
            "No more rolls left";
    } else if (diceData.throwCount === 0) {
        document.querySelector("#rolls-left").textContent = "";
    } else {
        document.querySelector("#rolls-left").textContent =
            "Turn " + diceData.throwCount;
    }
}

// clear score table
function clearScoreTable() {
    for (let i = 0; i < scoreTable.length; i++) {
        scoreTable[i].textContent = "";
        scoreTable[i].classList.remove("locked");
    }
    for (let i = 0; i < totalTable.length; i++) {
        totalTable[i].textContent = "";
    }
}

// reset turn
function resetTurn() {
    resetDice();
    updateTurnCounter();
    for (let i = 0; i < scoreTable.length; i++) {
        if (scoreTable[i].classList.contains("locked")) continue;
        scoreTable[i].textContent = "";
    }
}

// check if all fields are filled
function allFieldsIsFilled() {
    for (let i = 0; i < scoreTable.length; i++) {
        if (!scoreTable[i].classList.contains("locked")) {
            return false;
        }
    }
    return true;
}

// roll dice
function roll() {
    if (diceData.throwCount === 3) {
        return;
    }
    if (rollButton.textContent != "Roll!") {
        return;
    }
    // dice.throwDice(lockedDices);
    const obj = {
        locked: lockedDices,
    };
    diceData = post(getAPIURL() + "/dice/roll", obj, sessionID).then(
        (values) => {
            if (values.success === true) {
                return get(
                    getAPIURL() + "/dice?roomID=" + roomID,
                    sessionID
                ).then((values) => {
                    console.log(values);
                    return values;
                });
            }
        }
    );
    rollButton.textContent = "Rolling...";
    updateTurnCounter();
    var lastDice = 0;
    for (let i = 0; i < dices.length; i++) {
        if (lockedDices.includes(i)) {
            continue;
        }
        lastDice = i;
        dices[i].style.animation = "roll 12ms linear 0s infinite alternate";
        setTimeout(function () {
            let diceValue = dice.getValues()[i];
            dices[i].setAttribute("src", `/static/img/Dice-${diceValue}.png`);
            dices[i].style.animation = "none";
        }, (i + 1) * 120);
    }
    setTimeout(function () {
        if (dice.getThrowCount() === 3) {
            rollButton.textContent = "All rolls used!";
        } else {
            rollButton.textContent = "Roll!";
        }
        let results = dice.getResults();
        scoreTable.forEach((scoreField, index) => {
            if (scoreField.classList.contains("locked")) return;
            scoreField.textContent = results[index];
        });
    }, (lastDice + 1) * 120);
}

// lock dice
function lockDice(diceNumber) {
    if (diceData.locked[diceNumber] === true) {
        diceData.locked[diceNumber] = false;
        dices[diceNumber].style.animation = "none";
        dices[diceNumber].classList.remove("locked");
    } else {
        diceData.locked[diceNumber] = true;
        dices[diceNumber].style.animation =
            "shake 0.5s linear 0s infinite alternate";
        dices[diceNumber].classList.add("locked");
    }
}

// scorefield click, data update and game reset check
function scoreTableClick(scoreFieldIndex) {
    if (scoreTable[scoreFieldIndex].classList.contains("locked")) {
        return;
    }
    let score = dice.getResults()[scoreFieldIndex];
    resetTurn();
    for (let i = 0; i < dices.length; i++) {
        dices[i].setAttribute("src", `/static/img/Unknown.png`);
    }
    rollButton.textContent = "Roll!";
    lockedDices = [];
    scoreTable[scoreFieldIndex].textContent = score;
    scoreTable[scoreFieldIndex].classList.add("locked");
    dice.setTotal(dice.getTotal() + score);
    if (scoreFieldIndex < 6) {
        dice.setSum(dice.getSum() + score);
        if (dice.getSum() >= 63) {
            totalTable[1].textContent = dice.getBonus();
            dice.setTotal(dice.getTotal() + dice.getBonus());
        }
        totalTable[0].textContent = dice.getSum();
    }
    totalTable[2].textContent = dice.getTotal();
    if (allFieldsIsFilled()) {
        const sessionID = new URLSearchParams(window.location.search).get(
            "sessionID"
        );
        get(getAPIURL() + "/user", sessionID).then((values) => {
            console.log(values);
            if (
                values.room.id !== -1 &&
                values.room.id ===
                    document.getElementById("room-id").textContent
            ) {
                const loc = location.href;
                location.href = loc.substring(0, loc.indexOf("/game"));
            } else {
                alert("Are you trippin'?");
            }
        });
    }
}

function setupGameInformation() {
    get(
        getAPIURL() + (roomID !== null ? "/user?roomID=" + roomID : "/user/"),
        sessionID
    ).then((values) => {
        if (values.success === true) {
            const room = values.room;
            const player = values.player;
            console.log(player);
            document.getElementById("room-id").textContent = room.id;
            document.getElementById("player-name").textContent = player.name;
            const playerList = document.getElementById("players");
            playerList.textContent = "";
            for (let i = 0; i < room.players.length; i++) {
                const player = room.players[i];
                const li = document.createElement("li");
                li.textContent = player.name;
                playerList.appendChild(li);
            }
        }
    });
}

function startGame() {
    get(getAPIURL() + "/dice?roomID=" + roomID, sessionID).then((values) => {
        console.log(values);
        // diceData = values;
    });
}

// dice listeners
for (let i = 0; i < dices.length; i++) {
    dices[i].addEventListener("click", function () {
        if (dice.getThrowCount() === 0) {
            return;
        }
        lockDice(i);
    });
}

// score field listeners
for (let i = 0; i < scoreTable.length; i++) {
    scoreTable[i].addEventListener("click", function () {
        if (dice.getThrowCount() === 0) {
            return;
        }
        scoreTableClick(i);
    });
}

// roll button listener
let rollButton = document.querySelector("#roll");
rollButton.addEventListener("click", function () {
    roll();
});

document.getElementById("leave-room").addEventListener("click", function () {
    console.log("Leave room");
    location.href = location.href.substring(0, location.href.indexOf("/game"));
});

// start game by resetting the game
// resetGame();
setupGameInformation();
startGame();
