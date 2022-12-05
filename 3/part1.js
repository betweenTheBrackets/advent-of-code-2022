const fs = require("node:fs");
const readline = require("node:readline");
const itemPriorities = require('./itemPriorities');

main();

async function main() {
    const fileStream = fs.createReadStream("input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let sumOfPriorities = 0;

    for await (const line of rl) {
        const length = line.length;
        const firstHalf = line.substring(0, length / 2);
        const secondHalf = line.substring(length / 2);

        const commonItems = getCommonItems(firstHalf, secondHalf, length / 2);

        if (commonItems.length > 0) {
            for (let i = 0; i < commonItems.length; i++) {
                sumOfPriorities += itemPriorities[commonItems[i]];
            }
        }
    }

    console.log(`sum of priorities: ${sumOfPriorities}`);
}

function getCommonItems(first, second, length) {
    const items = new Set();

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (first[i] === second[j]) {
                items.add(first[i]);
            }
        }
    }

    return Array.from(items);
}
