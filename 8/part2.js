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

    const treeLocations = getTreeLocations(trees);
    let topScenicScore = 0;

    for (const treeLocation of treeLocations) {
        const currentScenicScore = calculateScenicScore(trees, treeLocation);

        topScenicScore = Math.max(topScenicScore, currentScenicScore);
    }

    console.log(topScenicScore);
    // console.log(calculateScenicScore(trees, { row: 3, column: 2 }));
}

function getTreeLocations(trees) {
    const rows = trees.length;
    const columns = trees[0].length;
    const treeLocations = [];

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            treeLocations.push({
                row: i,
                column: j,
            });
        }
    }

    return treeLocations;
}

function calculateScenicScore(trees, treeLocation) {
    let currentRow = treeLocation.row;
    let currentColumn = treeLocation.column;

    let viewableTrees = {
        up: 0,
        right: 0,
        down: 0,
        left: 0,
    };

    const maxTreeHeight = trees[treeLocation.row][treeLocation.column];

    // look up
    while (currentRow > 0) {
        currentRow--;
        viewableTrees.up++;

        const currentTreeHeight = trees[currentRow][currentColumn];
        if (currentTreeHeight >= maxTreeHeight) {
            break;
        }
    }

    currentRow = treeLocation.row;

    // look down
    while (currentRow < trees[0].length - 1) {
        currentRow++;
        viewableTrees.down++;

        const currentTreeHeight = trees[currentRow][currentColumn];
        if (currentTreeHeight >= maxTreeHeight) {
            break;
        }
    }

    currentRow = treeLocation.row;

    // look left
    while (currentColumn > 0) {
        currentColumn--;
        viewableTrees.left++;

        const currentTreeHeight = trees[currentRow][currentColumn];
        if (currentTreeHeight >= maxTreeHeight) {
            break;
        }
    }

    currentColumn = treeLocation.column;

    // look right
    while (currentColumn < trees.length - 1) {
        currentColumn++;
        viewableTrees.right++;

        const currentTreeHeight = trees[currentRow][currentColumn];
        if (currentTreeHeight >= maxTreeHeight) {
            break;
        }
    }

    return (
        viewableTrees.up *
        viewableTrees.right *
        viewableTrees.down *
        viewableTrees.left
    );
}

function isVisibleFrom(direction, trees, treeLocation) {
    let currentRow = treeLocation.row;
    let currentColumn = treeLocation.column;
    const currentTreeHeight = trees[treeLocation.row][treeLocation.column];

    if (direction === "top") {
        do {
            currentRow--;
            if (trees[currentRow][currentColumn] >= currentTreeHeight) {
                return false;
            }
        } while (currentRow > 0);

        return true;
    } else if (direction === "bottom") {
        do {
            currentRow++;
            if (trees[currentRow][currentColumn] >= currentTreeHeight) {
                return false;
            }
        } while (currentRow < trees.length - 1);

        return true;
    } else if (direction === "left") {
        do {
            currentColumn--;
            if (trees[currentRow][currentColumn] >= currentTreeHeight) {
                return false;
            }
        } while (currentColumn > 0);

        return true;
    } else if (direction === "right") {
        do {
            currentColumn++;
            if (trees[currentRow][currentColumn] >= currentTreeHeight) {
                return false;
            }
        } while (currentColumn < trees[0].length - 1);

        return true;
    }
}
