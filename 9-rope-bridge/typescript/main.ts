import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const DATA_FILE_NAME_EXAMPLE = "data-example.txt";
const DATA_FILE_NAME_EXAMPLE_PART_2 = "data-example-pt2.txt";
const DATA_FILE_NAME = "data.txt";

type Move = {
  x: number;
  y: number;
};

type Position = {
  x: number;
  y: number;
};

main();

function main(): void {
  console.log("Part One Example       :", partOne(DATA_FILE_NAME_EXAMPLE, 2));
  console.log("Part One               :", partOne(DATA_FILE_NAME, 2));
  console.log("Part Two Example       :", partTwo(DATA_FILE_NAME_EXAMPLE, 10));
  console.log(
    "Part Two Example Part 2:",
    partTwo(DATA_FILE_NAME_EXAMPLE_PART_2, 10)
  );
  console.log("Part Two               :", partTwo(DATA_FILE_NAME, 10));
}

function partOne(filename: string, ropeLength: number): number {
  const moves = parseFileToMoves(Deno.readTextFileSync(filename));
  return getTailPositionAfterAllMoves(moves, ropeLength);
}

function partTwo(filename: string, ropeLength: number): number {
  const moves = parseFileToMoves(Deno.readTextFileSync(filename));
  return getTailPositionAfterAllMoves(moves, ropeLength);
}

function getTailPositionAfterAllMoves(
  moves: Move[],
  ropeLength: number
): number {
  const tailPositions = new Set<string>();
  const rope = createRope(ropeLength);
  const head = rope[0];

  // _logBoard(rope);

  moves.forEach((move) => {
    head.x += move.x;
    head.y += move.y;

    rope.forEach((position, index) => {
      if (position === head) return;

      const prevPosition = rope[index - 1];
      const newPosition = calculationPosition(prevPosition, position);
      rope[index] = newPosition;

      if (index === rope.length - 1) {
        tailPositions.add(JSON.stringify(newPosition));
      }
    });

    // _logBoard(rope);
  });

  return tailPositions.size;
}

// For debugging
function _logBoard(rope: Position[]): void {
  const board = [
    ["x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x"],
  ];

  rope.forEach((position, index) => {
    board[position.y][position.x] = index.toString();
  });

  board.reverse();

  console.clear();
  console.log(board);
  prompt("Press enter to continue");
}

function createRope(length: number): Position[] {
  return Array.from({ length }).map(() => {
    return { x: 0, y: 0 };
  });
}

function calculationPosition(
  prevPosition: Position,
  position: Position
): Position {
  const dx = prevPosition.x - position.x;
  const dy = prevPosition.y - position.y;
  let newTailPosition = {
    x: position.x,
    y: position.y,
  };

  if (Math.abs(dx) === 2 && Math.abs(dy) === 2) {
    newTailPosition = {
      x: newTailPosition.x + Math.sign(dx) * 1,
      y: newTailPosition.y + Math.sign(dy) * 1,
    };
  } else if (Math.abs(dx) === 2 && Math.abs(dy) === 1) {
    newTailPosition = {
      x: newTailPosition.x + Math.sign(dx) * 1,
      y: newTailPosition.y + Math.sign(dy) * 1,
    };
  } else if (Math.abs(dy) === 2 && Math.abs(dx) === 1) {
    newTailPosition = {
      x: newTailPosition.x + Math.sign(dx) * 1,
      y: newTailPosition.y + Math.sign(dy) * 1,
    };
  } else if (Math.abs(dx) === 2) {
    newTailPosition = {
      x: newTailPosition.x + Math.sign(dx) * 1,
      y: newTailPosition.y,
    };
  } else if (Math.abs(dy) === 2) {
    newTailPosition = {
      x: newTailPosition.x,
      y: newTailPosition.y + Math.sign(dy) * 1,
    };
  }

  return newTailPosition;
}

function parseFileToMoves(fileString: string): Move[] {
  return fileString
    .split("\n")
    .flatMap((x) => {
      const [direction, count] = x.split(" ");
      return new Array(Number(count)).fill(direction);
    })
    .map((direction: "U" | "D" | "L" | "R") => {
      const directions = {
        R: { x: 1, y: 0 },
        L: { x: -1, y: 0 },
        U: { x: 0, y: 1 },
        D: { x: 0, y: -1 },
      };

      return directions[direction];
    });
}

Deno.test(function shouldPassPartOneExample() {
  assertEquals(partOne(DATA_FILE_NAME_EXAMPLE, 2), 13);
});

Deno.test(function shouldPassPartOne() {
  assertEquals(partOne(DATA_FILE_NAME, 2), 6023);
});

Deno.test(function shouldPassPartTwoExample() {
  assertEquals(partTwo(DATA_FILE_NAME_EXAMPLE, 10), 1);
});

Deno.test(function shouldPassPartTwoExampleTwo() {
  assertEquals(partTwo(DATA_FILE_NAME_EXAMPLE_PART_2, 10), 36);
});

Deno.test(function shouldPassPartTwo() {
  assertEquals(partTwo(DATA_FILE_NAME, 10), 2533);
});
