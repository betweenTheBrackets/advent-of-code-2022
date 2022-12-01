const fs = require('node:fs');
const readline = require('node:readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let topCalories = 0;
  let currentCalorieCount = 0;

  for await (const line of rl) {
    if (line === '') {
        if (currentCalorieCount > topCalories) {
            topCalories = currentCalorieCount;
        }
        currentCalorieCount = 0;
    }
    else {
        currentCalorieCount += Number(line);
    }
  }

  console.log(`topCalories:${topCalories}`);
}

processLineByLine();