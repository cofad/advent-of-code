const sonarSweep = await getSonarSweep();
const numIncreases = calculateNumIncreases();
console.log(numIncreases);

function calculateNumIncreases(): number {
  let numIncreases = 0;

  for(let i = 1; i < sonarSweep.length; i++) {
    if (sonarSweep[i] > sonarSweep[i-1]) {
      numIncreases++;
    }  
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