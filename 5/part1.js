const fs = require("node:fs");
const readline = require("node:readline");

main();

async function main() {
    const fileStream = fs.createReadStream("input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let isStackInputComplete = false;
    const stacks = {};

    for await (const line of rl) {
        if (line === "") {
            isStackInputComplete = true;
            continue;
        }

        if (!isStackInputComplete) {
            updateStacksByInput(stacks, line);
        } else {
            const instructions = line.split(" ");
            updateStacksByInstruction(stacks, instructions);
        }
    }

    let message = "";
    for (const key of Object.keys(stacks).sort()) {
        message += stacks[key].pop();
    }
    console.log(message);
}

function splitAtNthCharacter(s, n) {
    const results = [];
    for (let i = 0; i < s.length; i += n) {
        results.push(s.substring(i, i + n - 1));
    }
    return results;
}

function updateStacksByInput(stacks, line) {
    const spaceDelimiterIndex = 4;
    const regexStackInputs = /\[.\]/;
    const sections = splitAtNthCharacter(line, spaceDelimiterIndex);

    if (regexStackInputs.test(line)) {
        sections.forEach((item, index) => {
            const char = item.substring(1, 2);
            if (char.trim() !== "") {
                if (!stacks[index + 1]) {
                    stacks[index + 1] = [char];
                } else {
                    stacks[index + 1].unshift(char);
                }
            }
        });
    }
}

function updateStacksByInstruction(stacks, instructions) {
    let move, from, to;
    let isMove = false,
        isFrom = false,
        isTo = false;

    instructions.forEach((instruction) => {
        if (isMove && !move) {
            move = instruction;
        } else if (isFrom && !from) {
            from = instruction;
        } else if (isTo && !to) {
            to = instruction;
        }

        if (instruction === "move") {
            isMove = true;
        } else if (instruction === "from") {
            isFrom = true;
        } else if (instruction === "to") {
            isTo = true;
        }
    });

    for (let i = 0; i < move; i++) {
        const temp = stacks[from].pop();
        stacks[to].push(temp);
    }
}
