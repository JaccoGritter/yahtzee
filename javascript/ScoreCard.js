
const scoreCard = {
    
    tags: ["enen", "tweeen", "drieen", "vieren", "vijfen", "zessen", "threeoak", "fouroak", "fullhouse", "kleinestraat", "grotestraat", "yahtzee", "vrijekeus"],
    round: 0,
    turn: 0,
    scores: {
        enen: -1,
        tweeen: -1,
        drieen: -1,
        vieren: -1,
        vijfen: -1,
        zessen: -1,
        fullhouse: -1,
        threeoak: -1,
        fouroak: -1,
        fullhouse: -1,
        kleinestraat: -1,
        grotestraat: -1,
        yahtzee: -1,
        vrijekeus: -1,
        subtotaalboven: 0,
        bonus: 0,
        totaalboven: 0,
        subtotaalonder: 0,
        totaalscore: 0
    },
    thrown: [],
    possibilities: {},

    setPossibilities(thrown) {

        this.thrown = thrown;

        let totalCount = 0;

        scoreCard.tags.forEach(tag => {
            this.possibilities[tag] = 0;
        });

        const throwArray = [];
        throwArray.push(this.thrown.filter(score => score === "1").length);
        throwArray.push(this.thrown.filter(score => score === "2").length);
        throwArray.push(this.thrown.filter(score => score === "3").length);
        throwArray.push(this.thrown.filter(score => score === "4").length);
        throwArray.push(this.thrown.filter(score => score === "5").length);
        throwArray.push(this.thrown.filter(score => score === "6").length);

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
        if (throwArray.includes(5)) this.possibilities.yahtzee = 50;

        // create string of thrown numbers without duplicates to be able to check streets
        let throwString = "";
        for (let i=0; i<6; i++) {
            if (throwArray[i] != 0) throwString += (i+1);
        }

        if (throwString.includes("1234") || throwString.includes("2345") || throwString.includes("3456")) this.possibilities.kleinestraat = 30;

        if (throwString.includes("12345") || throwString.includes("23456")) this.possibilities.grotestraat = 40;

        this.possibilities.vrijekeus = totalCount;
    }
    
}

export default scoreCard;