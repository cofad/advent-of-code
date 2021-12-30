import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import {
  calculateNumLanternfish,
  FILE_NAME,
  FILE_NAME_EXAMPLE,
} from "./lib.ts";

Deno.test("Part One Example Should Pass For 18 Days", async (): Promise<void> => {
  const numLanternfish = await calculateNumLanternfish(FILE_NAME_EXAMPLE, 18);
  assertEquals(numLanternfish, 26);
});

Deno.test("Part One Example Should Pass For 80 Days", async (): Promise<void> => {
  const numLanternfish = await calculateNumLanternfish(FILE_NAME_EXAMPLE, 80);
  assertEquals(numLanternfish, 5934);
});

Deno.test("Part One Should Pass For 80 Days", async (): Promise<void> => {
  const numLanternfish = await calculateNumLanternfish(FILE_NAME, 80);
  assertEquals(numLanternfish, 362346);
});
