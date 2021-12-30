import { calculateNumLanternfish, FILE_NAME } from "./lib.ts";

const numLanternfishPartTwo = await calculateNumLanternfish(FILE_NAME, 256);
const numLanternfishPartOne = await calculateNumLanternfish(FILE_NAME, 80);

console.log("");
console.log("Part One: Num Lanternfish = " + numLanternfishPartOne);
console.log("Part Two: Num Lanternfish = " + numLanternfishPartTwo);
console.log("");
