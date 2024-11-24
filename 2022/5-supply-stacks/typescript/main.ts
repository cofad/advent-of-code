import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const DATA_FILE_NAME: string = "data.txt";
const DATA_FILE_NAME_EXAMPLE: string = "data-example.txt";

main();

function main(): void {
  console.log("Part One Example:", partOne(DATA_FILE_NAME_EXAMPLE));
  console.log("Part One        :", partOne(DATA_FILE_NAME));

  console.log("Part Two Example:", partTwo(DATA_FILE_NAME_EXAMPLE));
  console.log("Part Two        :", partTwo(DATA_FILE_NAME));
}

function partOne(filename: string): string {
  const data = Deno.readTextFileSync(filename);
  const stacks = getStacks(data);
  const moves = getMoves(data);

  moves.forEach((move) => {
    const numCrates = move[0];
    const startStack = move[1] - 1;
    const endStack = move[2] - 1;

    for (let i = 0; i < numCrates; i++) {
      const crate = stacks[startStack].pop();
      stacks[endStack].push(crate || "");
    }
  });

  const message = stacks.map((stack) => stack.pop()).join("");

  return message;
}

function partTwo(filename: string): string {
  const data = Deno.readTextFileSync(filename);
  const stacks = getStacks(data);
  const moves = getMoves(data);

  moves.forEach((move) => {
    const numCrates = move[0];
    const startStack = move[1] - 1;
    const endStack = move[2] - 1;

    const crates = stacks[startStack].slice(-numCrates);
    stacks[startStack] = stacks[startStack].slice(0, -numCrates);
    stacks[endStack] = stacks[endStack].concat(crates);
  });

  const message = stacks.map((stack) => stack.pop()).join("");

  return message;
}

function getStacks(data: string): string[][] {
  const stacks: string[][] = [];

  const init = data
    .split("\n\n")[0]
    .replaceAll("[", " ")
    .replaceAll("]", " ")
    .split("\n")
    .slice(0, -1)
    .map((row) => row.slice(0, -1).slice(1));

  const numStacks = init
    .map((row) => row.replaceAll("   ", ""))
    .reduce((max, row) => (row.length > max ? (max = row.length) : max), 0);

  for (let i = 0; i < numStacks; i++) {
    stacks.push([]);
  }

  init.forEach((row) => {
    let j = 0;
    while (row.charAt(0)) {
      if (row.charAt(0) !== " ") {
        stacks[j].push(row.charAt(0));
      }

      row = row.slice(4);
      j++;
    }
  });

  stacks.map((stack) => stack.reverse());

  return stacks;
}

function getMoves(data: string): number[][] {
  return data
    .split("\n\n")[1]
    .split("\n")
    .map((move) => move.replace("move ", ""))
    .map((move) => move.replace("from", ","))
    .map((move) => move.replace("to", ","))
    .map((move) => move.replaceAll(" ", ""))
    .map((move) => move.split(","))
    .map((move) => move.map((val) => Number(val)));
}

Deno.test(function shouldPassPartOneExample() {
  assertEquals(partOne(DATA_FILE_NAME_EXAMPLE), "CMZ");
});

Deno.test(function shouldPassPartOne() {
  assertEquals(partOne(DATA_FILE_NAME), "PSNRGBTFT");
});

Deno.test(function shouldPassPartTwoExample() {
  assertEquals(partTwo(DATA_FILE_NAME_EXAMPLE), "MCD");
});

Deno.test(function shouldPassPartTwo() {
  assertEquals(partTwo(DATA_FILE_NAME), "BNTZFPMMW");
});
