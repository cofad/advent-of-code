import { assertEquals } from "https://deno.land/std@0.200.0/assert/mod.ts";
import { partOne, partTwo } from "./main.ts";

const DATA_FILE_NAME = "./data.txt";
const DATA_PART_ONE_EXAMPLE_FILE_NAME = "./data-part-one-example.txt";
const DATA_PART_TWO_EXAMPLE_FILE_NAME = "./data-part-two-example.txt";

Deno.test("Part One Example", () => {
  const data = Deno.readTextFileSync(DATA_PART_ONE_EXAMPLE_FILE_NAME);
  assertEquals(partOne(data), 142);
});

Deno.test("Part One", () => {
  const data = Deno.readTextFileSync(DATA_FILE_NAME);
  assertEquals(partOne(data), 54605);
});

Deno.test("Part Two Example", () => {
  const data = Deno.readTextFileSync(DATA_PART_TWO_EXAMPLE_FILE_NAME);
  assertEquals(partTwo(data), 281);
});

Deno.test("Part Two", () => {
  const data = Deno.readTextFileSync(DATA_FILE_NAME);
  assertEquals(partTwo(data), 55429);
});
