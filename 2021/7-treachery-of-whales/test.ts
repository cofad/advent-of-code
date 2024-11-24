import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import {
  calculateMinFuelForAlignmentWithConstantFuelUsage,
  calculateMinFuelForAlignmentWithVariableFuelUsage,
  FILE_NAME,
  FILE_NAME_EXAMPLE,
  readInCrabPositions,
} from "./lib.ts";

Deno.test("Part One Example Should Pass", () => {
  const crabPositions = readInCrabPositions(FILE_NAME_EXAMPLE);
  const minFuel =
    calculateMinFuelForAlignmentWithConstantFuelUsage(crabPositions);
  assertEquals(minFuel, 37);
});

Deno.test("Part One Should Pass", () => {
  const crabPositions = readInCrabPositions(FILE_NAME);
  const minFuel =
    calculateMinFuelForAlignmentWithConstantFuelUsage(crabPositions);
  assertEquals(minFuel, 340987);
});

Deno.test("Part Two Example Should Pass", () => {
  const crabPositions = readInCrabPositions(FILE_NAME_EXAMPLE);
  const minFuel =
    calculateMinFuelForAlignmentWithVariableFuelUsage(crabPositions);
  assertEquals(minFuel, 168);
});

Deno.test("Part Two Should Pass", () => {
  const crabPositions = readInCrabPositions(FILE_NAME);
  const minFuel =
    calculateMinFuelForAlignmentWithVariableFuelUsage(crabPositions);
  assertEquals(minFuel, 96987874);
});
