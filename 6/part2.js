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
        const markerLength = 4;
        const messageLength = 14;
        let currentPosition = markerLength - 1;

        // get marker
        while (currentPosition < line.length) {
            const marker = new Set();

            marker.add(line[currentPosition]);
            marker.add(line[currentPosition - 1]);
            marker.add(line[currentPosition - 2]);
            marker.add(line[currentPosition - 3]);

            if (Array.from(marker).length === 4) {
                console.log("start-of-packet marker position: ", currentPosition + 1);
                currentPosition = 0;
                break;
            }

            currentPosition++;
        }

        // get first message
        while (currentPosition < line.length) {
            const marker = new Set();

            marker.add(line[currentPosition]);
            marker.add(line[currentPosition - 1]);
            marker.add(line[currentPosition - 2]);
            marker.add(line[currentPosition - 3]);
            marker.add(line[currentPosition - 4]);
            marker.add(line[currentPosition - 5]);
            marker.add(line[currentPosition - 6]);
            marker.add(line[currentPosition - 7]);
            marker.add(line[currentPosition - 8]);
            marker.add(line[currentPosition - 9]);
            marker.add(line[currentPosition - 10]);
            marker.add(line[currentPosition - 11]);
            marker.add(line[currentPosition - 12]);
            marker.add(line[currentPosition - 13]);

            if (Array.from(marker).length === 14) {
                console.log("start-of-message marker position: ", currentPosition + 1);
                currentPosition += messageLength;
                break;
            }

            currentPosition++;
        }
    }
}
