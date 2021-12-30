export const FILE_NAME = "data.txt";
export const FILE_NAME_EXAMPLE = "data-example.txt";

type Lanternfish = number[];
type LanternfishCounts = number[];

async function readInLanternfish(fileName: string): Promise<Lanternfish> {
  let fileText = await Deno.readTextFile(fileName);
  fileText = "[" + fileText + "]";
  return await JSON.parse(fileText);
}

function sumLanternfishCounts(lanternfishCounts: LanternfishCounts): number {
  return lanternfishCounts.reduce(
    (previousValue: number, currentValue: number) => {
      return previousValue + currentValue;
    },
  );
}

function createLanternfishCounts(lanternfish: Lanternfish): LanternfishCounts {
  const lanternfishCounts: number[] = new Array(9).fill(0);

  lanternfish.forEach((fish) => {
    lanternfishCounts[fish]++;
  });

  return lanternfishCounts;
}

function growLanternfish(
  lanternfishCounts: LanternfishCounts,
  days: number,
): LanternfishCounts {
  const counts = [...lanternfishCounts];

  for (let i = 0; i < days; i++) {
    const numAtZero = counts.shift();

    if (numAtZero !== undefined) {
      counts.push(numAtZero);
      counts[6] = counts[6] + numAtZero;
    }
  }

  return counts;
}

export async function calculateNumLanternfish(
  fileName: string,
  numDays: number,
): Promise<number> {
  const lanternfish = await readInLanternfish(fileName);
  let lanternfishCounts: number[];
  lanternfishCounts = createLanternfishCounts(lanternfish);
  lanternfishCounts = growLanternfish(lanternfishCounts, numDays);

  return sumLanternfishCounts(lanternfishCounts);
}
