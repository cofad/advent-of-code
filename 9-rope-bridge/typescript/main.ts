import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const DATA_FILE_NAME_EXAMPLE = "data-example.txt";
const DATA_FILE_NAME_EXAMPLE_PT2 = "data-example-pt2.txt";
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
  console.log("Part One Example:", partOne(DATA_FILE_NAME_EXAMPLE));
  console.log("Part One        :", partOne(DATA_FILE_NAME));
  console.log("Part Two Example:", partTwo(DATA_FILE_NAME_EXAMPLE));
  console.log("Part Two Example:", partTwo(DATA_FILE_NAME_EXAMPLE_PT2));
  console.log("Part Two        :", partTwo(DATA_FILE_NAME));
}

function partOne(filename: string): number {
  const moves = parseFileToMoves(Deno.readTextFileSync(filename));
  const tailPositions = new Set<string>();
  const rope = createRope(2);
  const head = rope[0];

  // _logBoard(rope);

  moves.forEach((move) => {
    head.x += move.x;
    head.y += move.y;

    rope.forEach((position, index) => {
      if (position === head) return;

      const prevPosition = rope[index - 1];
      rope[index] = calculationPosition(prevPosition, position);

      if (index === rope.length - 1) {
        tailPositions.add(JSON.stringify(position));
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
  headPosition: Position,
  tailPosition: Position
): Position {
  const dx = headPosition.x - tailPosition.x;
  const dy = headPosition.y - tailPosition.y;
  let newTailPosition = {
    x: tailPosition.x,
    y: tailPosition.y,
  };

  if (Math.abs(dx) === 2 && Math.abs(dy) === 1) {
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

function partTwo(filename: string): number {
  const moves = parseFileToMoves(Deno.readTextFileSync(filename));

  return 0;
}

Deno.test(function shouldPassPartOneExample() {
  assertEquals(partOne(DATA_FILE_NAME_EXAMPLE), 13);
});

Deno.test(function shouldPassPartOne() {
  assertEquals(partOne(DATA_FILE_NAME), 6023);
});

Deno.test(function shouldPassPartTwoExample() {
  assertEquals(partTwo(DATA_FILE_NAME_EXAMPLE), 0);
});

Deno.test(function shouldPassPartTwoExampleTwo() {
  assertEquals(partTwo(DATA_FILE_NAME_EXAMPLE_PT2), 36);
});

Deno.test(function shouldPassPartTwo() {
  assertEquals(partTwo(DATA_FILE_NAME), null);
});
