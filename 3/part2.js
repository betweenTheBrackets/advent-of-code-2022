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
    let elf1, elf2, elf3;

    for await (const line of rl) {
        if (!elf1) {
            elf1 = new Set(line);
            continue;
        }
        else if (!elf2) {
            elf2 = new Set(line);
            continue;
        }
        else if (!elf3) {
            elf3 = new Set(line);
        }

        const badgeItemType = new Set([...elf1].filter((x) => elf2.has(x) && elf3.has(x)));
        const [priority] = badgeItemType;
        sumOfPriorities += itemPriorities[priority];

        // reset
        elf1 = elf2 = elf3 = undefined;
    }

    console.log(`sum of priorities: ${sumOfPriorities}`);
}
