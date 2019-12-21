
const scoreCard = {
    
    tags: ["enen", "tweeen", "drieen", "vieren", "vijfen", "zessen", "fullhouse", "threeoak", "fouroak", "fullhouse", "kleinestraat", "grotestraat", "yahtzee", "vrijekeus"],
    round: 1,
    turn: 0,
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
    },
    thrown: [],
    possibilities: {},

    setPossibilities: function() {

        let totalCount = 0;

        scoreCard.tags.forEach(tag => {
            this.possibilities[tag] = 0;
        })

        const throwArray = [];
        throwArray.push(this.thrown.filter(score => score === "1").length);
        throwArray.push(this.thrown.filter(score => score === "2").length);
        throwArray.push(this.thrown.filter(score => score === "3").length);
        throwArray.push(this.thrown.filter(score => score === "4").length);
        throwArray.push(this.thrown.filter(score => score === "5").length);
        throwArray.push(this.thrown.filter(score => score === "6").length);

        // console.log(throwArray);
        // check upper half scorecard & count total score
        for (let i=0; i<6; i++) {
            let score = throwArray[i] * (i+1)
            this.possibilities[this.tags[i]] = score;
            totalCount += score;  // count of all dice added up
        }

        // check lower half of the scorecard
        if (throwArray.includes(2) && throwArray.includes(3)) this.possibilities.fullhouse = 25;
        if (throwArray.includes(3) || throwArray.includes(4) || throwArray.includes(5)) this.possibilities.threeoak = totalCount;
        if (throwArray.includes(4) || throwArray.includes(5)) this.possibilities.fouroak = totalCount;

        if (throwArray.filter(score => score === 0 ).length === 2) {
            if ((throwArray[0] === 0 && throwArray [1] === 0) || (throwArray[4] === 0 && throwArray [5] === 0) || (throwArray[0] === 0 && throwArray [5] === 0)) this.possibilities.kleinestraat = 30;
        }

        if (throwArray.filter(score => score === 0 ).length === 1) {
            if (throwArray[0] === 0 || throwArray [5] === 0) {
                this.possibilities.kleinestraat = 30;
                this.possibilities.grotestraat = 40;
            }
        }

        if (throwArray.includes(5)) this.possibilities.yahtzee = 50;
        this.possibilities.vrijekeus = totalCount;
        // console.log(this.possibilities);
    }
    
}

export default scoreCard;