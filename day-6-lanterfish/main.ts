import { calculateNumLanternfish, FILE_NAME } from "./lib.ts";

const numLanternfish = await calculateNumLanternfish(FILE_NAME, 80);
console.log("\n\nPart One: Num Lanternfish = " + numLanternfish + "\n\n");
