const fs = require("node:fs");
const readline = require("node:readline");

main();

async function main() {
    const fileStream = fs.createReadStream("input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    const trees = [];
    let currentRow = 0;

    for await (const line of rl) {
        trees[currentRow] = [];

        for (const char of line) {
            trees[currentRow].push(char);
        }
        currentRow++;
    }

    const interiorIndexes = getInteriorIndexes(trees);
    let visibleTrees = countEdges(trees);

    for (const interiorIndex of interiorIndexes) {
        if (isVisibleFrom('top', trees, interiorIndex) || isVisibleFrom('right', trees, interiorIndex) || isVisibleFrom('bottom', trees, interiorIndex) || isVisibleFrom('left', trees, interiorIndex)) {
            visibleTrees++;
        }
    }

    console.log(visibleTrees);
}

function countEdges(trees) {
    const rows = trees.length;
    const columns = trees[0].length;

    return ((rows - 2) * 2) + (columns * 2);
}

function getInteriorIndexes(trees) {
    const rows = trees.length;
    const columns = trees[0].length;
    const interiorTrees = [];

    for (let i = 1; i < columns - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            interiorTrees.push({
                row: i,
                column: j,
            });
        }
    }

    return interiorTrees;
}

function isVisibleFrom(direction, trees, treeLocation) {
    let currentRow = treeLocation.row;
    let currentColumn = treeLocation.column;
    const currentTreeHeight = trees[treeLocation.row][treeLocation.column];

    if (direction === 'top') {
        do {
            currentRow--;
            if (trees[currentRow][currentColumn] >= currentTreeHeight) {
                return false;
            }
        } while (currentRow > 0)

        return true;
    }
    else if (direction === 'bottom') {
        do {
            currentRow++;
            if (trees[currentRow][currentColumn] >= currentTreeHeight) {
                return false;
            }
        } while (currentRow < trees.length - 1)

        return true;
    }
    else if (direction === 'left') {
        do {
            currentColumn--;
            if (trees[currentRow][currentColumn] >= currentTreeHeight) {
                return false;
            }
        } while (currentColumn > 0)

        return true;
    }
    else if (direction === 'right') {
        do {
            currentColumn++;
            if (trees[currentRow][currentColumn] >= currentTreeHeight) {
                return false;
            }
        } while (currentColumn < trees[0].length - 1)

        return true;
    }
}
