export const FILE_NAME = "data.txt";
export const FILE_NAME_EXAMPLE = "data-example.txt";

type CrabPositions = number[];

export async function readInCrabPositions(
  fileName: string,
): Promise<CrabPositions> {
  let fileText = await Deno.readTextFile(fileName);
  fileText = "[" + fileText + "]";
  return await JSON.parse(fileText);
}

export function calculateMinFuelForAlignment(
  crabPositions: CrabPositions,
): number {
  return 0;
}
