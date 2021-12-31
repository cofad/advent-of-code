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
  const minPosition = getMinArrayValue(crabPositions);
  const maxPosition = getMaxArrayValue(crabPositions);

  const lowestFuelCost = Array(maxPosition - minPosition)
    .fill(0)
    .map((_value, i) => minPosition + i)
    .map((position) => calculateFuelCost(crabPositions, position))
    .reduce((a, b) => b < a ? b : a);

  return lowestFuelCost;
}

function calculateFuelCost(positions: CrabPositions, number: number): number {
  return positions.reduce((totalCost, position) => {
    totalCost += Math.abs(position - number);
    return totalCost;
  }, 0);
}

function getMinArrayValue(array: number[]): number {
  return array.reduce((a, b) => b < a ? b : a);
}

function getMaxArrayValue(array: number[]): number {
  return array.reduce((a, b) => b > a ? b : a);
}
