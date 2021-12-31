export const FILE_NAME = "data.txt";
export const FILE_NAME_EXAMPLE = "data-example.txt";

type CrabPositions = number[];

export function readInCrabPositions(
  fileName: string,
): CrabPositions {
  let fileText = Deno.readTextFileSync(fileName);
  fileText = "[" + fileText + "]";
  return JSON.parse(fileText);
}

export function calculateMinFuelForAlignment(
  crabPositions: CrabPositions,
): number {
  const optimalPositions = calculateOptimalPositions(crabPositions);

  const minFuelCost = Math.max(
    calculateFuelCost(crabPositions, optimalPositions[0]),
    calculateFuelCost(crabPositions, optimalPositions[1]),
  );

  return minFuelCost;
}

function calculateFuelCost(positions: CrabPositions, number: number): number {
  return positions.reduce((totalCost, position) => {
    totalCost += Math.abs(position - number);
    return totalCost;
  }, 0);
}

function calculateOptimalPositions(array: number[]): number[] {
  return calculateMedians(array);
}

function calculateMedians(array: number[]): number[] {
  const sortedArray = [...array].sort((a, b) => a - b);

  const medianIndexes = [
    Math.floor(array.length / 2),
    Math.ceil(array.length / 2),
  ];

  return [sortedArray[medianIndexes[0]], sortedArray[medianIndexes[1]]];
}
