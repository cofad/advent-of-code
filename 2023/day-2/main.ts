type Set = {
  red: number;
  green: number;
  blue: number;
};

type Game = {
  id: string;
  sets: Set[];
};

type Cubes = {
  red: number;
  green: number;
  blue: number;
};

export function partOne(data: string, cubes: Cubes): number {
  const games: Game[] = parseGames(data);

  return games
    .filter((game) => isGamePossible(game, cubes))
    .reduce((idSum, curGame) => idSum + Number(curGame.id), 0);
}

export function partTwo(data: string): number {
  const games: Game[] = parseGames(data);

  return games
    .map((game) => calcMinCubes(game))
    .map((cubes) => calcCubesPower(cubes))
    .reduce((totalPower, power) => totalPower + power, 0);
}

function isGamePossible(game: Game, cubes: Cubes) {
  return game.sets.every((set) => {
    return set.red <= cubes.red && set.green <= cubes.green && set.blue <= cubes.blue;
  });
}

function calcMinCubes(game: Game): Cubes {
  return game.sets.reduce(
    (cubes, set) => {
      return {
        red: Math.max(cubes.red, set.red),
        green: Math.max(cubes.green, set.green),
        blue: Math.max(cubes.blue, set.blue),
      };
    },
    { red: 0, green: 0, blue: 0 }
  );
}

function calcCubesPower(cubes: Cubes): number {
  return cubes.blue * cubes.green * cubes.red;
}

function parseGames(data: string): Game[] {
  const parseCube = (cubeString: string): Partial<Cubes> => {
    const [count, color] = cubeString.trim().split(" ");

    if (color !== "red" && color !== "blue" && color !== "green") throw new Error("Invalid cube color");

    const cube: Partial<Cubes> = {};
    cube[color] = parseInt(count);

    return cube;
  };

  return data.split("\n").map((line) => {
    return {
      id: line.split(":")[0].replace("Game ", ""),
      sets: line
        .split(":")[1]
        .split(";")
        .map((setsString) => setsString.split(","))
        .map((set) => {
          return set.reduce(
            (cubes, cubeString) => {
              return { ...cubes, ...parseCube(cubeString) };
            },
            {
              red: 0,
              green: 0,
              blue: 0,
            }
          );
        }),
    };
  });
}
