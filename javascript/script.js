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
    updateScoreboard();
    if (scoreCard.turn >= 3) return;
    const diceList = document.getElementsByClassName("die");
    for (let i = 0; i < 5; i++) {
        let die = document.getElementById(diceList[i].id);
        if (die.dataset.isActive === "true") {
            let randomDie = Math.floor(Math.random() * 6);
            die.style.backgroundImage = imgArray[randomDie];
            die.dataset.value = randomDie + 1;
            die.classList.add("rolldie");
            setTimeout(() => {
                die.classList.remove("rolldie");
            }, 1000);
        }
    }
    scoreCard.turn++;
    document.getElementById("turn").innerHTML = scoreCard.turn;
    //handleScore();
}

const checkPossibilities = () => {
    const thrown = [];
    const diceList = document.getElementsByClassName("die");
    for (let i = 0; i < 5; i++) thrown.push(diceList[i].dataset.value);
    thrown.sort();
    scoreCard.thrown = thrown;
    scoreCard.setPossibilities();
    scoreCard.tags.forEach(tag => {
        // console.log(tag);
        let element = document.getElementById(tag);
        if (scoreCard.scores[tag] === 0) {
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
}

const updateScoreboard = () => {
    for (let score in scoreCard.scores) {
        //console.log(game.scores[score]);
        let element = document.getElementById(score);
        element.innerHTML = scoreCard.scores[score];
        element.classList.remove("possibility");
        element.removeEventListener("click", makeChoice);
    }
}

const initializeGame = () => {
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


}


initializeGame();
updateScoreboard();


