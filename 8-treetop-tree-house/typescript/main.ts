import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const DATA_FILE_NAME = "data.txt";
const DATA_FILE_NAME_EXAMPLE = "data-example.txt";

main();

function main(): void {
  console.log("Part One Example:", partOne(DATA_FILE_NAME_EXAMPLE));
  console.log("Part One        :", partOne(DATA_FILE_NAME));
  // console.log("Part Two Example One  :", partTwo(DATA_FILE_NAME_EXAMPLE));
  // console.log("Part Two              :", partTwo(DATA_FILE_NAME));
}

type Tree = {
  row: number;
  col: number;
  height: number;
  isVisible: boolean;
};

function partOne(filename: string): number {
  const data = Deno.readTextFileSync(filename);
  const trees = data
    .split("\n")
    .map((row) => row.split(""))
    .map((row, rowIndex) =>
      row.map((tree, colIndex) => toTree(tree, rowIndex, colIndex))
    )
    .map((row, _index, rawTrees) =>
      row.map((tree) => updateExteriorTreeVisibility(tree, rawTrees))
    )
    .map((row, _index, rawTrees) =>
      row.map((tree) => updateTreeVisibility(tree, rawTrees))
    );

  return countNumVisibleTrees(trees);
}

// function partTwo(filename: string): number {
// }

function countNumVisibleTrees(trees: Tree[][]): number {
  return trees.flat(1).reduce((count, curTree) => {
    count += curTree.isVisible ? 1 : 0;
    return count;
  }, 0);
}

function toTree(treeHeight: string, rowIndex: number, colIndex: number): Tree {
  return {
    row: rowIndex,
    col: colIndex,
    height: Number(treeHeight),
    isVisible: false,
  };
}

function isExteriorTree(tree: Tree, trees: Tree[][]): boolean {
  return (
    tree.row === 0 ||
    tree.row === trees.length - 1 ||
    tree.col === 0 ||
    tree.col === trees[0].length - 1
  );
}

function updateExteriorTreeVisibility(tree: Tree, trees: Tree[][]): Tree {
  return { ...tree, isVisible: isExteriorTree(tree, trees) };
}

function updateTreeVisibility(tree: Tree, trees: Tree[][]): Tree {
  if (isExteriorTree(tree, trees)) {
    return tree;
  } else {
    return { ...tree, isVisible: calculateVisibility(tree, trees) };
  }
}

function calculateVisibility(tree: Tree, trees: Tree[][]): boolean {
  return (
    calculateIsVisibleDirection(tree, trees, "up") ||
    calculateIsVisibleDirection(tree, trees, "right") ||
    calculateIsVisibleDirection(tree, trees, "bottom") ||
    calculateIsVisibleDirection(tree, trees, "left")
  );
}

function calculateIsVisibleDirection(
  tree: Tree,
  trees: Tree[][],
  direction: "up" | "right" | "bottom" | "left"
): boolean {
  const directions = {
    up: {
      isAligned: (neighborTree: Tree) => neighborTree.col === tree.col,
      isBehind: (neighborTree: Tree) => neighborTree.row <= tree.row,
    },
    right: {
      isAligned: (neighborTree: Tree) => neighborTree.row === tree.row,
      isBehind: (neighborTree: Tree) => neighborTree.col <= tree.col,
    },
    bottom: {
      isAligned: (neighborTree: Tree) => neighborTree.col === tree.col,
      isBehind: (neighborTree: Tree) => neighborTree.row >= tree.row,
    },
    left: {
      isAligned: (neighborTree: Tree) => neighborTree.row === tree.row,
      isBehind: (neighborTree: Tree) => neighborTree.col >= tree.col,
    },
  };

  const blockingTrees = trees
    .flat(1)
    .filter((neighborTree) => directions[direction].isAligned(neighborTree))
    .filter((neighborTree) => !directions[direction].isBehind(neighborTree))
    .filter((neighborTree) => neighborTree.height >= tree.height);

  return blockingTrees.length === 0;
}

Deno.test(function shouldPassPartOneExample() {
  assertEquals(partOne(DATA_FILE_NAME_EXAMPLE), 21);
});

Deno.test(function shouldPassPartOne() {
  assertEquals(partOne(DATA_FILE_NAME), 1823);
});

// Deno.test(function shouldPassPartTwoExample() {
//   assertEquals(partTwo(DATA_FILE_NAME_EXAMPLE), 24933642);
// });

// Deno.test(function shouldPassPartTwo() {
//   assertEquals(partTwo(DATA_FILE_NAME), 1498966);
// });
