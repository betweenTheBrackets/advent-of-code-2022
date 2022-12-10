const fs = require("node:fs");
const readline = require("node:readline");

main();

async function main() {
    const fileStream = fs.createReadStream("input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        let currentPosition = 3;

        while (currentPosition < line.length) {
            const marker = new Set();

            marker.add(line[currentPosition]);
            marker.add(line[currentPosition - 1]);
            marker.add(line[currentPosition - 2]);
            marker.add(line[currentPosition - 3]);

            if (Array.from(marker).length === 4) {
                console.log(currentPosition + 1);
                break;
            }

            currentPosition++;
        }
    }
}
