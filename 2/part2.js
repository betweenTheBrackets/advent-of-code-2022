const fs = require("node:fs");
const readline = require("node:readline");

const handShape = {
    rock: "A",
    paper: "B",
    scissors: "C",
};

const requiredOutcome = {
    lose: "X",
    draw: "Y",
    win: "Z",
};

const playScore = {
    lose: 0,
    draw: 3,
    win: 6,
};

const shapeScore = {
    [`${handShape.rock}`]: 1,
    [`${handShape.paper}`]: 2,
    [`${handShape.scissors}`]: 3,
};

const outcomeScore = {
    // rock scenarios
    [`${handShape.rock}:${requiredOutcome.lose}`]: {
        myScore: shapeScore[handShape.scissors] + playScore.lose,
        opponentScore: shapeScore[handShape.rock] + playScore.win,
    },
    [`${handShape.rock}:${requiredOutcome.draw}`]: {
        myScore: shapeScore[handShape.rock] + playScore.draw,
        opponentScore: shapeScore[handShape.rock] + playScore.draw,
    },
    [`${handShape.rock}:${requiredOutcome.win}`]: {
        myScore: shapeScore[handShape.paper] + playScore.win,
        opponentScore: shapeScore[handShape.rock] + playScore.lose,
    },

    // paper scenarios
    [`${handShape.paper}:${requiredOutcome.lose}`]: {
        myScore: shapeScore[handShape.rock] + playScore.lose,
        opponentScore: shapeScore[handShape.paper] + playScore.win,
    },
    [`${handShape.paper}:${requiredOutcome.draw}`]: {
        myScore: shapeScore[handShape.paper] + playScore.draw,
        opponentScore: shapeScore[handShape.paper] + playScore.draw,
    },
    [`${handShape.paper}:${requiredOutcome.win}`]: {
        myScore: shapeScore[handShape.scissors] + playScore.win,
        opponentScore: shapeScore[handShape.paper] + playScore.lose,
    },

    // scissors scenarios
    [`${handShape.scissors}:${requiredOutcome.lose}`]: {
        myScore: shapeScore[handShape.paper] + playScore.lose,
        opponentScore: shapeScore[handShape.scissors] + playScore.win,
    },
    [`${handShape.scissors}:${requiredOutcome.draw}`]: {
        myScore: shapeScore[handShape.scissors] + playScore.draw,
        opponentScore: shapeScore[handShape.scissors] + playScore.draw,
    },
    [`${handShape.scissors}:${requiredOutcome.win}`]: {
        myScore: shapeScore[handShape.rock] + playScore.win,
        opponentScore: shapeScore[handShape.scissors] + playScore.lose,
    },
};

function getOutcome(opponentPick, requiredOutcome) {
    return outcomeScore[`${opponentPick}:${requiredOutcome}`];
}

async function main() {
    const fileStream = fs.createReadStream("input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let opponentScore = 0;
    let myScore = 0;

    for await (const line of rl) {
        const [opponentPick, requiredOutcome] = line.split(" ");

        const outcome = getOutcome(opponentPick, requiredOutcome);
        opponentScore += outcome.opponentScore;
        myScore += outcome.myScore;
    }

    console.log(`myScore: ${myScore}`);
    console.log(`opponentScore: ${opponentScore}`);
}

main();
