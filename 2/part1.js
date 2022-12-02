const fs = require("node:fs");
const readline = require("node:readline");

const opponentPicks = {
    rock: 'A',
    paper: 'B',
    scissors: 'C',
};

const myPicks = {
    rock: 'X',
    paper: 'Y',
    scissors: 'Z',
};

const shapeScore = {
    [`${opponentPicks.rock}`]: 1,
    [`${opponentPicks.paper}`]: 2,
    [`${opponentPicks.scissors}`]: 3,
    [`${myPicks.rock}`]: 1,
    [`${myPicks.paper}`]: 2,
    [`${myPicks.scissors}`]: 3,
};

const outcomeScore = {
    // opponent score
    [`${opponentPicks.rock}:${myPicks.paper}`]: 0,
    [`${opponentPicks.rock}:${myPicks.rock}`]: 3,
    [`${opponentPicks.rock}:${myPicks.scissors}`]: 6,
    [`${opponentPicks.paper}:${myPicks.scissors}`]: 0,
    [`${opponentPicks.paper}:${myPicks.paper}`]: 3,
    [`${opponentPicks.paper}:${myPicks.rock}`]: 6,
    [`${opponentPicks.scissors}:${myPicks.rock}`]: 0,
    [`${opponentPicks.scissors}:${myPicks.scissors}`]: 3,
    [`${opponentPicks.scissors}:${myPicks.paper}`]: 6,

    // my score
    [`${myPicks.rock}:${opponentPicks.paper}`]: 0,
    [`${myPicks.rock}:${opponentPicks.rock}`]: 3,
    [`${myPicks.rock}:${opponentPicks.scissors}`]: 6,
    [`${myPicks.paper}:${opponentPicks.scissors}`]: 0,
    [`${myPicks.paper}:${opponentPicks.paper}`]: 3,
    [`${myPicks.paper}:${opponentPicks.rock}`]: 6,
    [`${myPicks.scissors}:${opponentPicks.rock}`]: 0,
    [`${myPicks.scissors}:${opponentPicks.scissors}`]: 3,
    [`${myPicks.scissors}:${opponentPicks.paper}`]: 6,
};

function getOutcome(opponentPick, myPick) {
    const opponentScore = outcomeScore[`${opponentPick}:${myPick}`] + shapeScore[opponentPick];
    const myScore = outcomeScore[`${myPick}:${opponentPick}`] + shapeScore[myPick];

    return {
        opponentScore,
        myScore,
    };
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
        const [opponentPick, myPick] = line.split(" ");

        const outcome = getOutcome(opponentPick, myPick);
        opponentScore += outcome.opponentScore;
        myScore += outcome.myScore;
    }

    console.log(`myScore: ${myScore}`);
    console.log(`opponentScore: ${opponentScore}`);
}

main();
