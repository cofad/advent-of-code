import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { partOne, partTwo } from "./day-5.ts";

const EXAMPLE_FILE_NAME = "day-5-data-example.txt";
const FILE_NAME = "day-5-data.txt";

Deno.test("Example horizontal and vertical overlaps should be 5", async () => {
  const overlaps = await partOne(EXAMPLE_FILE_NAME);
  assertEquals(overlaps, 5);
});

Deno.test("Example overlaps should be 12", async () => {
  const overlaps = await partTwo(EXAMPLE_FILE_NAME);
  assertEquals(overlaps, 12);
});

Deno.test("Horizontal and vertical overlaps should be 3990", async () => {
  const overlaps = await partOne(FILE_NAME);
  assertEquals(overlaps, 3990);
});

Deno.test("Overlaps should be 21305", async () => {
  const overlaps = await partTwo(FILE_NAME);
  assertEquals(overlaps, 21305);
});
