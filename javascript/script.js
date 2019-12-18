const die1img = "url('./images/Alea_1.png')";
const die2img = "url('./images/Alea_2.png')";
const die3img = "url('./images/Alea_3.png')";
const die4img = "url('./images/Alea_4.png')";
const die5img = "url('./images/Alea_5.png')";
const die6img = "url('./images/Alea_6.png')";
const imgArray = [die1img, die2img, die3img, die4img, die5img, die6img];

const game = {
    round: 1,
    turn: 1,
    scores: {
        enen: 0,
        tweeen: 0,
        drieen: 0,
        vieren: 0,
        vijfen: 0,
        zessen: 0,
        fullhouse: 0,
        threeoak: 0,
        fouroak: 0,
        fullhouse: 0,
        kleinestraat: 0,
        grotestraat: 0,
        yahtzee: 0,
        vrijekeus: 0,
        subtotaalboven: 0,
        bonus: 0,
        totaalboven: 0,
        subtotaalonder: 0,
        totaalscore: 0
    }
}

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
    const diceList = document.getElementsByClassName("die");
        for (let i = 0; i < 5; i++) {
            let die = document.getElementById(diceList[i].id);
            if(die.dataset.isActive === "true"){
                let randomDie = Math.floor(Math.random() * 6);
                die.style.backgroundImage = imgArray[randomDie];
                die.dataset.value = randomDie + 1;
                die.classList.add("rolldie");
                setTimeout(() => {
                    die.classList.remove("rolldie");
                }, 1000); 
                }
        }
}

const addScore = (ev) => {
    console.log(ev);
}

const updateScoreboard = () => {
    for (let score in game.scores) {
        //console.log(game.scores[score]);
        element = document.getElementById(score);
        element.innerHTML = game.scores[score];
    }
}

updateScoreboard();
rollDice();