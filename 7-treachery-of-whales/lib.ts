export const FILE_NAME = "data.txt";
export const FILE_NAME_EXAMPLE = "data-example.txt";

type CrabPositions = number[];

export function readInCrabPositions(fileName: string): CrabPositions {
  let fileText = Deno.readTextFileSync(fileName);
  fileText = "[" + fileText + "]";
  return JSON.parse(fileText);
}

export function calculateMinFuelForAlignmentWithConstantFuelUsage(
  crabPositions: CrabPositions
): number {
  const optimalPositions = calculateOptimalPositions(crabPositions);

  const minFuelCost = Math.max(
    calculateFuelCostWithConstantUsage(crabPositions, optimalPositions[0]),
    calculateFuelCostWithConstantUsage(crabPositions, optimalPositions[1])
  );

  return minFuelCost;
}

export function calculateMinFuelForAlignmentWithVariableFuelUsage(
  crabPositions: CrabPositions
): number {
  const minPosition = getMinArrayValue(crabPositions);
  const maxPosition = getMaxArrayValue(crabPositions);

  const lowestFuelCost = Array(maxPosition - minPosition)
    .fill(0)
    .map((_value, i) => minPosition + i)
    .map((position) =>
      calculateFuelCostWithVariableUsage(crabPositions, position)
    )
    .reduce((a, b) => (b < a ? b : a));

  return lowestFuelCost;
}

function calculateFuelCostWithConstantUsage(
  positions: CrabPositions,
  targetPosition: number
): number {
  return positions.reduce((totalCost, position) => {
    totalCost += Math.abs(position - targetPosition);
    return totalCost;
  }, 0);
}

function calculateFuelCostWithVariableUsage(
  positions: CrabPositions,
  targetPosition: number
): number {
  return positions.reduce((totalCost, position) => {
    totalCost += sumOfNumbers(Math.abs(position - targetPosition));
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

function sumOfNumbers(n: number): number {
  return (n * (n + 1)) / 2;
}

function getMinArrayValue(array: number[]): number {
  return array.reduce((a, b) => (b < a ? b : a));
}

function getMaxArrayValue(array: number[]): number {
  return array.reduce((a, b) => (b > a ? b : a));
}
