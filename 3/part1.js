const fs = require("node:fs");
const readline = require("node:readline");
const itemPriorities = require("./itemPriorities");

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
        const firstHalf = new Set(line.substring(0, length / 2));
        const secondHalf = new Set(line.substring(length / 2));

        const commonItems = Array.from(new Set([...firstHalf].filter((x) => secondHalf.has(x))));

        if (commonItems.length > 0) {
            for (let i = 0; i < commonItems.length; i++) {
                sumOfPriorities += itemPriorities[commonItems[i]];
            }
        }
    }

    console.log(`sum of priorities: ${sumOfPriorities}`);
}
