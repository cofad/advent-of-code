type Line = { x1: number; y1: number; x2: number; y2: number };
type Grid = number[][];

const EXAMPLE_FILE_NAME = "day-5-data-example.txt";
const FILE_NAME = "day-5-data.txt";

console.log(await partOne(EXAMPLE_FILE_NAME));
console.log(await partTwo(EXAMPLE_FILE_NAME));

console.log(await partOne(FILE_NAME));
console.log(await partTwo(FILE_NAME));

export async function partOne(fileName: string): Promise<number> {
  const lines = await getLines(fileName);
  let gridPartOne = generateBlankGrid();
  gridPartOne = addHorizontalAndVerticalLinesToGrid(lines, gridPartOne);
  const overlapsPartOne = calculateOverlaps(gridPartOne);
  return overlapsPartOne;
}

export async function partTwo(fileName: string): Promise<number> {
  const lines = await getLines(fileName);
  let gridPartTwo = generateBlankGrid();
  gridPartTwo = addLinesToGrid(lines, gridPartTwo);
  const overlapsPartTwo = calculateOverlaps(gridPartTwo);
  return overlapsPartTwo;
}

async function getLines(fileName: string): Promise<Line[]> {
  let fileText = await Deno.readTextFile(fileName);
  fileText = '["' + fileText + '"]';
  fileText = fileText.replaceAll("\n", '","');
  const dataArray: string[] = JSON.parse(fileText);

  dataArray.forEach((element, index) => {
    dataArray[index] = element.replace(" -> ", ",");
  });

  const newDataArray = dataArray.map((element) => element.split(","));

  const newNewDataArray = newDataArray.map((element) => {
    return {
      x1: parseInt(element[0], 10),
      y1: parseInt(element[1], 10),
      x2: parseInt(element[2], 10),
      y2: parseInt(element[3], 10),
    };
  });

  return newNewDataArray;
}

function generateBlankGrid(): Grid {
  const grid: Grid = [];

  for (let y = 0; y < 1000; y++) {
    const row = [];

    for (let x = 0; x < 1000; x++) {
      row.push(0);
    }

    grid.push(row);
  }

  return grid;
}

function isHorizontalOrVertical(line: Line): boolean {
  return isHorizontal(line) || isVertical(line);
}

function isHorizontal(line: Line): boolean {
  return line.y1 === line.y2;
}

function isVertical(line: Line): boolean {
  return line.x1 === line.x2;
}

function addHorizontalAndVerticalLinesToGrid(lines: Line[], grid: Grid): Grid {
  const updatedGrid = [...grid];

  lines.forEach((line) => {
    if (isHorizontalOrVertical(line)) {
      addLineToGrid(line, updatedGrid);
    }
  });

  return updatedGrid;
}

function addLinesToGrid(lines: Line[], grid: Grid): Grid {
  const updatedGrid = [...grid];

  lines.forEach((line) => {
    addLineToGrid(line, updatedGrid);
  });

  return updatedGrid;
}

function addLineToGrid(line: Line, grid: number[][]): void {
  if (isHorizontal(line)) {
    const start = line.x1 < line.x2 ? line.x1 : line.x2;
    const end = Math.abs(line.x2 - line.x1) + start;
    const y = line.y1;

    for (let x = start; x <= end; x++) {
      grid[y][x] += 1;
    }
  } else if (isVertical(line)) {
    const start = line.y1 < line.y2 ? line.y1 : line.y2;
    const end = Math.abs(line.y2 - line.y1) + start;
    const x = line.x1;

    for (let y = start; y <= end; y++) {
      grid[y][x] += 1;
    }
  } else {
    const length = Math.abs(line.x2 - line.x1);
    const xDir = Math.sign(line.x2 - line.x1);
    const yDir = Math.sign(line.y2 - line.y1);
    let x = line.x1;
    let y = line.y1;

    for (let i = 0; i <= length; i++) {
      grid[y][x] += 1;
      x += xDir;
      y += yDir;
    }
  }
}

function printGrid(grid: number[][]): void {
  grid.forEach((row) => {
    let rowText = "";

    row.forEach((value) => {
      rowText += value;
    });

    console.log(rowText);
  });
}

function calculateOverlaps(grid: Grid): number {
  let overlaps = 0;

  grid.forEach((row) => {
    row.forEach((value) => {
      if (value >= 2) overlaps++;
    });
  });

  return overlaps;
}
