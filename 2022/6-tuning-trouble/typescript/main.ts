import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const DATA_FILE_NAME = "data.txt";
const buildExampleFileName = (exNo: string) => `data-example-${exNo}.txt`;

main();

function main(): void {
  console.log("Part One Example One  :", partOne(buildExampleFileName("1")));
  console.log("Part One Example Two  :", partOne(buildExampleFileName("2")));
  console.log("Part One Example Three:", partOne(buildExampleFileName("3")));
  console.log("Part One Example Four :", partOne(buildExampleFileName("4")));
  console.log("Part One Example Five :", partOne(buildExampleFileName("5")));
  console.log("Part One              :", partOne(DATA_FILE_NAME));

  console.log("Part Two Example One  :", partTwo(buildExampleFileName("1")));
  console.log("Part Two Example Two  :", partTwo(buildExampleFileName("2")));
  console.log("Part Two Example Three:", partTwo(buildExampleFileName("3")));
  console.log("Part Two Example Four :", partTwo(buildExampleFileName("4")));
  console.log("Part Two Example Five :", partTwo(buildExampleFileName("5")));
  console.log("Part Two              :", partTwo(DATA_FILE_NAME));
}

function partOne(filename: string): number {
  const data = Deno.readTextFileSync(filename);
  return findMarkerPosition(data, 4);
}

function partTwo(filename: string): number {
  const data = Deno.readTextFileSync(filename);
  return findMarkerPosition(data, 14);
}

function findMarkerPosition(signal: string, markerLength: number) {
  let position = markerLength;

  let marker = signal.slice(position - markerLength, position);

  while (!areCharsUnique(marker)) {
    position++;
    marker = signal.slice(position - markerLength, position);
  }

  return position;
}

function areCharsUnique(text: string) {
  const chars = text.split("");
  const set = new Set(chars);
  return set.size === chars.length;
}

Deno.test(function shouldPassPartOneExampleOne() {
  assertEquals(partOne(buildExampleFileName("1")), 7);
});

Deno.test(function shouldPassPartOneExampleTwo() {
  assertEquals(partOne(buildExampleFileName("2")), 5);
});

Deno.test(function shouldPassPartOneExampleThree() {
  assertEquals(partOne(buildExampleFileName("3")), 6);
});

Deno.test(function shouldPassPartOneExampleFour() {
  assertEquals(partOne(buildExampleFileName("4")), 10);
});

Deno.test(function shouldPassPartOneExampleFive() {
  assertEquals(partOne(buildExampleFileName("5")), 11);
});

Deno.test(function shouldPassPartOne() {
  assertEquals(partOne(DATA_FILE_NAME), 1582);
});

Deno.test(function shouldPassPartTwoExampleOne() {
  assertEquals(partTwo(buildExampleFileName("1")), 19);
});

Deno.test(function shouldPassPartTwoExampleTwo() {
  assertEquals(partTwo(buildExampleFileName("2")), 23);
});

Deno.test(function shouldPassPartTwoExampleThree() {
  assertEquals(partTwo(buildExampleFileName("3")), 23);
});

Deno.test(function shouldPassPartTwoExampleFour() {
  assertEquals(partTwo(buildExampleFileName("4")), 29);
});

Deno.test(function shouldPassPartTwoExampleFive() {
  assertEquals(partTwo(buildExampleFileName("5")), 26);
});

Deno.test(function shouldPassPartTwo() {
  assertEquals(partTwo(DATA_FILE_NAME), 3588);
});
