type Board = string[][];
type Boards = Board[];

const data = await getData();
const drawOrder = extractDrawOrder(data);
let boards = extractBoards(data);

console.log({ data });
console.log({ drawOrder });
console.log({ boards });

let unmarkedValue;
let firstWinnerScore;
let lastWinnerScore;
let removedBoard;

for (let i = 0; i < drawOrder.length; i++) {
  updateBoards(drawOrder[i], boards);
  let rowWinner = getRowWinner(boards);
  let colWinner = getColWinner(boards);

  while (rowWinner.winnerBoard || colWinner.winnerBoard) {
    // Need to allow for multiple winners per round perhaps?

    if (rowWinner && rowWinner.winnerBoard) {
      if (!firstWinnerScore) {
        unmarkedValue = calculateUnmarkedValue(rowWinner.winnerBoard);
        console.log({ unmarkedValue });
        firstWinnerScore = unmarkedValue * parseInt(drawOrder[i]);
        console.log({ firstWinnerScore });
      }

      removedBoard = rowWinner;
      boards = removeBoard(rowWinner, boards);
    }

    if (colWinner && colWinner.winnerBoard) {
      if (!firstWinnerScore) {
        unmarkedValue = calculateUnmarkedValue(colWinner.winnerBoard);
        console.log({ unmarkedValue });
        firstWinnerScore = unmarkedValue * parseInt(drawOrder[i]);
        console.log({ firstWinnerScore });
      }

      removedBoard = colWinner;
      boards = removeBoard(colWinner, boards);
    }

    if (boards.length === 0 && removedBoard && removedBoard.winnerBoard) {
      console.log({ removedBoard });
      console.log(drawOrder[i]);
      unmarkedValue = calculateUnmarkedValue(removedBoard.winnerBoard);
      lastWinnerScore = unmarkedValue * parseInt(drawOrder[i]);
      console.log({ lastWinnerScore });
      console.log("out of boards");
      break;
    }

    rowWinner = getRowWinner(boards);
    colWinner = getColWinner(boards);
  }
}

async function getData(): Promise<string[]> {
  let data = await Deno.readTextFile("day-4-data.txt");
  data = '["' + data + '"]';
  data = data.replaceAll("\n", '","');
  const dataArray: string[] = JSON.parse(data);

  return dataArray;
}

function extractDrawOrder(data: string[]): string[] {
  const drawOrder: number[] = JSON.parse("[" + data[0] + "]");

  return drawOrder.map((draw) => draw.toString());
}

function extractBoards(data: string[]): Boards {
  const tempData = data.slice(2).filter((element) => element !== "");

  const boards: string[][] = [];

  const numBoards = tempData.length / 5;

  for (let i = 0; i < numBoards; i++) {
    boards.push(tempData.splice(0, 5));
  }

  // console.log(boards);

  const newBoards: Boards = [];

  boards.forEach((board) => {
    const temp: string[][] = [];

    board.forEach((row) => {
      const newRow = row
        .trim()
        .replaceAll(/\s{2,}/g, " ")
        .split(" ");
      temp.push(newRow);
    });

    newBoards.push(temp);
  });

  return newBoards;
}

function updateBoards(draw: string, boards: Boards) {
  boards.forEach((board) => {
    board.forEach((row) => {
      row.forEach((value, index) => {
        if (value.toString() === draw.toString()) {
          row[index] = "x";
        }
      });
    });
  });
}

function getRowWinner(boards: Boards): {
  winnerBoard: Board | undefined;
  winnerIndex: number | undefined;
} {
  let rowWinner = false;
  let winnerBoard: Board | undefined;
  let winnerIndex: number | undefined;

  for (let i = 0; i < boards.length; i++) {
    const board = boards[i];

    for (let r = 0; r < 5; r++) {
      const row = board[r];
      rowWinner = true;

      for (let k = 0; k < row.length; k++) {
        if (row[k] !== "x") {
          rowWinner = false;
          break;
        }
      }

      if (rowWinner) {
        winnerBoard = board;
        winnerIndex = i;
        break;
      }
    }

    if (rowWinner) {
      break;
    }
  }

  return { winnerBoard, winnerIndex };
}

function getColWinner(boards: Boards): {
  winnerBoard: Board | undefined;
  winnerIndex: number | undefined;
} {
  let colWinner = false;
  let winnerBoard: Board | undefined;
  let winnerIndex: number | undefined;

  for (let i = 0; i < boards.length; i++) {
    const board = boards[i];

    for (let c = 0; c < 5; c++) {
      colWinner = true;

      for (let r = 0; r < 5; r++) {
        const row = board[r];

        if (row[c] !== "x") {
          colWinner = false;
          break;
        }
      }

      if (colWinner) {
        winnerBoard = board;
        winnerIndex = i;
        break;
      }
    }

    if (colWinner) {
      break;
    }
  }

  return { winnerBoard, winnerIndex };
}

function calculateUnmarkedValue(board: Board): number {
  let unmarkedValue = 0;

  board.forEach((row) => {
    row.forEach((value) => {
      if (value !== "x") {
        unmarkedValue += parseInt(value, 10);
      }
    });
  });

  return unmarkedValue;
}

function removeBoard(
  board: { winnerBoard: Board | undefined; winnerIndex: number | undefined },
  boards: Boards
): Boards {
  const newBoards = [...boards];

  if (board.winnerIndex !== undefined) {
    newBoards.splice(board.winnerIndex, 1);
  }

  return newBoards;
}
