const fs = require('node:fs');
const readline = require('node:readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let topCalories = [0, 0, 0];
  let currentCalorieCount = 0;

  for await (const line of rl) {
    if (line === '') {
        for (let i = 0; i < 3; i++) {
            if (currentCalorieCount > topCalories[i]) {
                topCalories.splice(i, 0, currentCalorieCount);
                break;
            }
        }

        currentCalorieCount = 0;
    }
    else {
        currentCalorieCount += Number(line);
    }
  }

  let totalCalories = 0;
  for (let i = 0; i < 3; i++) {
    console.log(topCalories[i]);
    totalCalories += topCalories[i];
  }

  console.log(`sum of top 3 calories:${totalCalories}`);
}

processLineByLine();