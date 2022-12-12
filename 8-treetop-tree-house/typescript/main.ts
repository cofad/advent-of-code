import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const DATA_FILE_NAME = "data.txt";
const DATA_FILE_NAME_EXAMPLE = "data-example.txt";

main();

function main(): void {
  console.log("Part One Example:", partOne(DATA_FILE_NAME_EXAMPLE));
  console.log("Part One        :", partOne(DATA_FILE_NAME));
  console.log("Part Two Example:", partTwo(DATA_FILE_NAME_EXAMPLE));
  console.log("Part Two        :", partTwo(DATA_FILE_NAME));
}

type Tree = {
  row: number;
  col: number;
  height: number;
  isVisible?: boolean;
  scenicScore?: number;
};

function partOne(filename: string): number {
  const trees = readInTrees(filename).map((row, _index, rawTrees) =>
    row.map((tree) => updateTreeVisibility(tree, rawTrees))
  );

  return countNumVisibleTrees(trees);
}

function partTwo(filename: string): number {
  const trees = readInTrees(filename).map((row, _index, rawTrees) =>
    row.map((tree) => updateScenicScore(tree, rawTrees))
  );

  return calculateMaxScenicScore(trees);
}

function countNumVisibleTrees(trees: Tree[][]): number {
  return trees.flat(1).reduce((count, curTree) => {
    count += curTree.isVisible ? 1 : 0;
    return count;
  }, 0);
}

function calculateMaxScenicScore(trees: Tree[][]): number {
  return trees.flat(1).reduce((maxScore, curTree) => {
    if (curTree.scenicScore) {
      if (curTree.scenicScore > maxScore) {
        maxScore = curTree.scenicScore;
      }
    }

    return maxScore;
  }, 0);
}

function readInTrees(filename: string): Tree[][] {
  const data = Deno.readTextFileSync(filename);
  const trees = data
    .split("\n")
    .map((row) => row.split(""))
    .map((row, rowIndex) =>
      row.map((tree, colIndex) => toTree(tree, rowIndex, colIndex))
    );
  return trees;
}

function toTree(treeHeight: string, rowIndex: number, colIndex: number): Tree {
  return {
    row: rowIndex,
    col: colIndex,
    height: Number(treeHeight),
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

function updateTreeVisibility(tree: Tree, trees: Tree[][]): Tree {
  return {
    ...tree,
    isVisible: isExteriorTree(tree, trees) || calculateVisibility(tree, trees),
  };
}

function flatOne<T>(array: T[][]) {
  let flattened: T[] = [];
  array.forEach((x) => (flattened = flattened.concat(x)));
  return flattened;
}

function calculateVisibility(tree: Tree, trees: Tree[][]): boolean {
  const row = trees[tree.row];
  const col = flatOne(trees).filter((x) => x.col === tree.col);

  const upTrees = col.slice(0, tree.row);
  const downTrees = col.slice(tree.row + 1);
  const leftTrees = row.slice(0, tree.col);
  const rightTrees = row.slice(tree.col + 1);

  const isVisible =
    upTrees.filter((x) => x.height >= tree.height).length === 0 ||
    downTrees.filter((x) => x.height >= tree.height).length === 0 ||
    leftTrees.filter((x) => x.height >= tree.height).length === 0 ||
    rightTrees.filter((x) => x.height >= tree.height).length === 0;

  return isVisible;
}

function updateScenicScore(tree: Tree, trees: Tree[][]): Tree {
  const row = trees[tree.row];
  const col = flatOne(trees).filter((x) => x.col === tree.col);

  const upTrees = col.slice(0, tree.row);
  const downTrees = col.slice(tree.row + 1);
  const leftTrees = row.slice(0, tree.col);
  const rightTrees = row.slice(tree.col + 1);

  let upScore = upTrees.reverse().findIndex((x) => x.height >= tree.height);
  let downScore = downTrees.findIndex((x) => x.height >= tree.height);
  let leftScore = leftTrees.reverse().findIndex((x) => x.height >= tree.height);
  let rightScore = rightTrees.findIndex((x) => x.height >= tree.height);

  upScore = upScore === -1 ? upTrees.length : upScore + 1;
  downScore = downScore === -1 ? downTrees.length : downScore + 1;
  leftScore = leftScore === -1 ? leftTrees.length : leftScore + 1;
  rightScore = rightScore === -1 ? rightTrees.length : rightScore + 1;

  return { ...tree, scenicScore: upScore * downScore * leftScore * rightScore };
}

Deno.test(function shouldPassPartOneExample() {
  assertEquals(partOne(DATA_FILE_NAME_EXAMPLE), 21);
});

Deno.test(function shouldPassPartOne() {
  assertEquals(partOne(DATA_FILE_NAME), 1823);
});

Deno.test(function shouldPassPartTwoExample() {
  assertEquals(partTwo(DATA_FILE_NAME_EXAMPLE), 8);
});

Deno.test(function shouldPassPartTwo() {
  assertEquals(partTwo(DATA_FILE_NAME), 211680);
});
