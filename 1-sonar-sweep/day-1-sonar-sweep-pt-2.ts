const sonarSweep = await getSonarSweep();
const numIncreases = calculateNumIncreases();
console.log(numIncreases);

function calculateNumIncreases(): number {
  let numIncreases = 0;
  let curSum = 0;
  let prevSum = sonarSweep[0] + sonarSweep[1] + sonarSweep[2];

  for(let i = 3; i < sonarSweep.length; i++) {
    curSum = sonarSweep[i-2] + sonarSweep[i-1] + sonarSweep[i];

    if (curSum > prevSum) {
      numIncreases++;
    }  

    prevSum = curSum;
  }

  return numIncreases;
}

async function getSonarSweep(): Promise<number[]> {
    let sonarSweepFile = await Deno.readTextFile('day-1-data.txt');
    sonarSweepFile = "[" + sonarSweepFile + "]";
    sonarSweepFile = sonarSweepFile.replaceAll('\n', ',' );
    const sonarSweep = JSON.parse(sonarSweepFile);
    return sonarSweep;
}
