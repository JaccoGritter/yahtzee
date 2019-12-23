const die1img = "url('./images/Alea_1.png')";
const die2img = "url('./images/Alea_2.png')";
const die3img = "url('./images/Alea_3.png')";
const die4img = "url('./images/Alea_4.png')";
const die5img = "url('./images/Alea_5.png')";
const die6img = "url('./images/Alea_6.png')";
const imgArray = [die1img, die2img, die3img, die4img, die5img, die6img];
import scoreCard from './ScoreCard.js';

const drag = ev => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

const allowDrop = ev => {
    ev.preventDefault();
}

const drop = ev => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text/plain");
    let draggedNode = document.getElementById(data);
    if (scoreCard.turn === 0) {
        draggedNode.style.width = draggedNode.style.height = "40px";
        return;
    }
    if (ev.target.className === "dropbox") {
        let isInserted = false;
        let nodes = ev.target.children;
        for (let i = 0; i < nodes.length; i++) {
            if (draggedNode.dataset.value < nodes[i].dataset.value) {
                ev.target.insertBefore(draggedNode, nodes[i]);
                isInserted = true;
                break;
            }
        }
        if (!isInserted) ev.target.appendChild(draggedNode);
        draggedNode.dataset.isActive = ev.target.dataset.isActive;
    }
    draggedNode.style.width = draggedNode.style.height = "40px";
}

const enlargeDieSize = (ev) => {
    ev.target.style.width = "50px";
    ev.target.style.height = "50px";
}

const normalizeDieSize = (ev) => {
    ev.target.style.width = "40px";
    ev.target.style.height = "40px";
}

const rollDice = () => {
    if (scoreCard.turn >= 3) return;
    scoreCard.turn++;
    updateScoreboard();
    const diceList = container1.getElementsByClassName("die");
    for (let i = 0; i < diceList.length; i++) {
        let die = diceList[i];
        let randomDie = Math.floor(Math.random() * 6);
        die.style.backgroundImage = imgArray[randomDie];
        die.dataset.value = randomDie + 1;
        die.classList.add("rolldie");
        setTimeout(() => {
            die.classList.remove("rolldie");
        }, 1000);   
    }
}

const checkPossibilities = () => {
    if(scoreCard.turn === 0) return;
    const thrown = [];
    const diceList = document.getElementsByClassName("die");
    for (let i = 0; i < 5; i++) thrown.push(diceList[i].dataset.value);
    thrown.sort();
    scoreCard.setPossibilities(thrown);
    scoreCard.tags.forEach(tag => {
        let element = document.getElementById(tag);
        if (scoreCard.scores[tag] === -1) {
            element.innerHTML = scoreCard.possibilities[tag];
            element.classList.add("possibility");
            element.addEventListener("click", makeChoice);
        };
    });
}

const makeChoice = () => {
    const tag = event.target.id;
    scoreCard.scores[tag] = scoreCard.possibilities[tag];
    scoreCard.turn = 0;
    scoreCard.round++;
    updateScoreboard();
    resetDice();
    if(scoreCard.round === 13) endGame();
}

const updateScoreboard = () => {
    if (scoreCard.turn === 0) {
        document.getElementById("turn").innerHTML = "Start de volgende beurt";
    } else if (scoreCard.turn === 3) {
        document.getElementById("turn").innerHTML = "Maak je keuze";
    } else document.getElementById("turn").innerHTML = "Beurt " + scoreCard.turn;
    let bovenScore = 0;
    for (let i=0; i<6; i++) {
        if (scoreCard.scores[scoreCard.tags[i]] >= 0) bovenScore += scoreCard.scores[scoreCard.tags[i]];
    }
    scoreCard.scores.subtotaalboven = bovenScore;
    if (scoreCard.scores.subtotaalboven >= 63) scoreCard.scores.bonus = 35;
    scoreCard.scores.totaalboven = scoreCard.scores.subtotaalboven + scoreCard.scores.bonus;

    let onderScore = 0;
    for (let i=6; i<14; i++) {
        if (scoreCard.scores[scoreCard.tags[i]] >= 0) {
            onderScore += scoreCard.scores[scoreCard.tags[i]];
        }
    }
    scoreCard.scores.subtotaalonder = onderScore;
    scoreCard.scores.totaalscore = scoreCard.scores.totaalboven + scoreCard.scores.subtotaalonder;

    for (let score in scoreCard.scores) {
        let element = document.getElementById(score);
        element.innerHTML = (scoreCard.scores[score] === -1 ? '-' : scoreCard.scores[score]);
        element.classList.remove("possibility");
        element.removeEventListener("click", makeChoice);
    }
}

const resetDice = () => {
    while (container2.hasChildNodes()) {  
        container1.appendChild(container2.removeChild(container2.firstChild));
      }
}

const startGame = () => {
    document.getElementById("throwButton").addEventListener("click", rollDice);
    document.getElementById("checkButton").addEventListener("click", checkPossibilities);

    let dice = document.querySelectorAll(".die");
    dice.forEach(die => {
        die.addEventListener("dragstart", drag);
        die.addEventListener("mousedown", enlargeDieSize);
        die.addEventListener("mouseup", normalizeDieSize);
        die.style.backgroundImage = imgArray[0];
    });

    let boxes = document.querySelectorAll(".dropbox");
    // console.log(boxes);
    boxes.forEach(box => {
        box.addEventListener("drop", drop);
        box.addEventListener("dragover", allowDrop);
    });

    updateScoreboard();
}

const endGame = () => {
    document.getElementById("turn").innerHTML = "Game Over!  Score: " + scoreCard.scores.totaalscore;
    document.getElementById("throwButton").removeEventListener("click", rollDice);
    document.getElementById("checkButton").removeEventListener("click", checkPossibilities);
}

startGame();



