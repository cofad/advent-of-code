import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import {
  calculateMinFuelForAlignment,
  FILE_NAME,
  FILE_NAME_EXAMPLE,
  readInCrabPositions,
} from "./lib.ts";

Deno.test("Part One Example Should Pass", async (): Promise<void> => {
  const crabPositions = await readInCrabPositions(FILE_NAME_EXAMPLE);
  const minFuel = await calculateMinFuelForAlignment(crabPositions);
  assertEquals(minFuel, 0);
});

Deno.test("Part One Should Pass", async (): Promise<void> => {
  const crabPositions = await readInCrabPositions(FILE_NAME);
  const minFuel = await calculateMinFuelForAlignment(crabPositions);
  assertEquals(minFuel, 0);
});
