import {
  calculateMinFuelForAlignmentWithConstantFuelUsage,
  calculateMinFuelForAlignmentWithVariableFuelUsage,
  FILE_NAME,
  readInCrabPositions,
} from "./lib.ts";

const crabPositions = await readInCrabPositions(FILE_NAME);
const minFuelForAlignmentPartOne =
  calculateMinFuelForAlignmentWithConstantFuelUsage(crabPositions);

const minFuelForAlignmentPartTwo =
  calculateMinFuelForAlignmentWithVariableFuelUsage(crabPositions);

console.log("");
console.log("Part One: Min Fuel For Alignment = " + minFuelForAlignmentPartOne);
console.log("Part TWo: Min Fuel For Alignment = " + minFuelForAlignmentPartTwo);
console.log("");
