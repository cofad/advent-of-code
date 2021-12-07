type Line = { x1: number; y1: number; x2: number; y2: number };
type Grid = number[][];

const lines = await getLines();
let grid = generateGrid();
grid = addLinesToGrid(lines, grid);
const overlaps = calculateOverlaps(grid);
console.log({ overlaps });

async function getLines(): Promise<Line[]> {
  let fileText = await Deno.readTextFile("day-5-data.txt");
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

function generateGrid(): Grid {
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

function addLinesToGrid(lines: Line[], grid: Grid): Grid {
  const updatedGrid = [...grid];

  lines.forEach((line) => {
    if (isHorizontalOrVertical(line)) {
      addLineToGrid(line, updatedGrid);
    }
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

  grid.forEach(row => {
    row.forEach(value => {
      if (value >= 2) overlaps++;
    });
  });

  return overlaps;
}