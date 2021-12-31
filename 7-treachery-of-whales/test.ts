import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import {
  calculateMinFuelForAlignment,
  FILE_NAME,
  FILE_NAME_EXAMPLE,
  readInCrabPositions,
} from "./lib.ts";

Deno.test("Part One Example Should Pass", () => {
  const crabPositions = readInCrabPositions(FILE_NAME_EXAMPLE);
  const minFuel = calculateMinFuelForAlignment(crabPositions);
  assertEquals(minFuel, 37);
});

Deno.test("Part One Should Pass", () => {
  const crabPositions = readInCrabPositions(FILE_NAME);
  const minFuel = calculateMinFuelForAlignment(crabPositions);
  assertEquals(minFuel, 340987);
});
