import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import { partOne } from "./day-6.ts";

const FILE_NAME = "day-6-data.txt";
const FILE_NAME_EXAMPLE = "day-6-data-example.txt";

Deno.test( "Part One Example Should Pass", async ():Promise<void> => {
    const lanternfish = await partOne(FILE_NAME_EXAMPLE);
    assertEquals(lanternfish, [3,4,3,1,2]);
});