const fs = require("node:fs");
const readline = require("node:readline");

main();

async function main() {
    const fileStream = fs.createReadStream("input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let fullyContainsCount = 0;

    for await (const line of rl) {
        const [elf1, elf2] = line.split(',');
        const [elf1MinText, elf1MaxText] = elf1.split('-');
        const [elf2MinText, elf2MaxText] = elf2.split('-');
        const elf1Min = Number(elf1MinText);
        const elf1Max = Number(elf1MaxText);
        const elf2Min = Number(elf2MinText);
        const elf2Max = Number(elf2MaxText);

        if (elf1Min <= elf2Min && elf2Min <= elf1Max) {
            // elf2's min overlaps elf1's work
            fullyContainsCount++;
        }
        else if (elf1Min <= elf2Max && elf2Max <= elf1Max) {
            // elf2's max overlaps elf1's work
            fullyContainsCount++;
        }
        else if (elf2Min <= elf1Min && elf1Min <= elf2Max) {
            // elf1's min overlaps elf2's work
            fullyContainsCount++;
        }
        else if (elf2Min <= elf1Max && elf1Max <= elf2Max) {
            // elf1's max overlaps elf2's work
            fullyContainsCount++;
        }
    }

    console.log(`count of pairs that have overlapping work: ${fullyContainsCount}`);
}
