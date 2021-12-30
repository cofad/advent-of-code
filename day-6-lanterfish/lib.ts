export const FILE_NAME = "data.txt";
export const FILE_NAME_EXAMPLE = "data-example.txt";

async function readInLanternfish(fileName: string): Promise<number[]> {
  let fileText = await Deno.readTextFile(fileName);
  fileText = "[" + fileText + "]";
  return await JSON.parse(fileText);
}

export async function calculateNumLanternfish(
  fileName: string,
  numDays: number,
): Promise<number> {
  let lanternfish = await readInLanternfish(fileName);

  for (let day = 0; day < numDays; day++) {
    const newFish = lanternfish.filter((fish) => fish === 0).map(() => 8);
    lanternfish = lanternfish
      .map((fish) => (fish === 0 ? 6 : fish - 1))
      .concat(newFish);
  }

  return lanternfish.length;
}
