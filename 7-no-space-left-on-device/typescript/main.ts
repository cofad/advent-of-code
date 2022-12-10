import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const DATA_FILE_NAME = "data.txt";
const DATA_FILE_NAME_EXAMPLE = "data-example.txt";

main();

function main(): void {
  console.log("Part One Example One  :", partOne(DATA_FILE_NAME_EXAMPLE));
  console.log("Part One              :", partOne(DATA_FILE_NAME));

  console.log("Part Two Example One  :", partTwo(DATA_FILE_NAME_EXAMPLE));
  console.log("Part Two              :", partTwo(DATA_FILE_NAME));
}

function partOne(filename: string): number {
  const data = Deno.readTextFileSync(filename);
  const root = parseDataToTree(data);
  calculateDirSizes(root);

  return extractDirSizes(root)
    .filter((size) => size < 100000)
    .reduce((sum, curSize) => {
      sum += curSize;
      return sum;
    }, 0);
}

function partTwo(filename: string): number {
  const data = Deno.readTextFileSync(filename);
  const root = parseDataToTree(data);
  calculateDirSizes(root);
  const dirSizes = extractDirSizes(root);

  const rootSize = dirSizes.reduce((max, curSize) => {
    return curSize > max ? curSize : max;
  }, 0);

  const freeSpace = 70000000 - rootSize;
  const neededSpace = 30000000 - freeSpace;

  return dirSizes
    .filter((size) => size > neededSpace)
    .reduce(
      (smallest, curSize) => (curSize < smallest ? curSize : smallest),
      dirSizes[0]
    );
}

type Node = {
  parent: Node | null;
  children: Node[];
  type: "dir" | "file";
  value: string | null;
  size: number;
};

function parseDataToTree(data: string): Node {
  const commands = data
    .replaceAll("\n", "  ")
    .replaceAll("cd", "cd ")
    .split("$")
    .map((output) => output.trim())
    .slice(1)
    .map((output) => {
      const segments = output
        .split("$")
        .map((x) => x.split("  "))
        .map((x) => {
          return {
            command: x[0],
            values: [...x].slice(1),
          };
        });

      return segments[0];
    });

  const root: Node = {
    parent: null,
    value: "/",
    children: [],
    type: "dir",
    size: 0,
  };

  let currentNode: Node | undefined | null = root;

  commands.forEach((cmd) => {
    if (cmd.command === "cd") {
      if (cmd.values[0] === "/") {
        return;
      } else if (cmd.values[0] === "..") {
        currentNode = currentNode?.parent;
      } else {
        currentNode = currentNode?.children.find(
          (node) => node.value === cmd.values[0]
        );
      }
    }

    if (cmd.command === "ls") {
      cmd.values.forEach((val) => {
        const first = val.split(" ")[0];
        const second = val.split(" ")[1];

        currentNode?.children.push({
          parent: currentNode,
          children: [],
          type: first === "dir" ? "dir" : "file",
          value: second,
          size: first !== "dir" ? Number(first) : 0,
        });
      });
    }
  });

  return root;
}

function calculateDirSizes(node: Node): void {
  if (node.children.length === 0) {
    return;
  }

  node.children.forEach((child) => {
    calculateDirSizes(child);
  });

  let size = 0;

  node.children.forEach((child) => {
    const childSize = child ? child.size : 0;
    size += childSize;
  });

  if (node.children.length !== 0) {
    node.size = size;
  }
}

function extractDirSizes(node: Node): number[] {
  let sizes: number[] = [];

  if (node?.type === "dir") {
    sizes.push(node.size);
  }

  node?.children.forEach((child) => {
    const childSize = extractDirSizes(child);
    sizes = [...sizes, ...childSize];
  });

  return sizes;
}

Deno.test(function shouldPassPartOneExample() {
  assertEquals(partOne(DATA_FILE_NAME_EXAMPLE), 95437);
});

Deno.test(function shouldPassPartOne() {
  assertEquals(partOne(DATA_FILE_NAME), 1749646);
});

Deno.test(function shouldPassPartTwoExample() {
  assertEquals(partTwo(DATA_FILE_NAME_EXAMPLE), 24933642);
});

Deno.test(function shouldPassPartTwo() {
  assertEquals(partTwo(DATA_FILE_NAME), 1498966);
});
