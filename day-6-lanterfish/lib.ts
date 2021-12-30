async function readInLanternfish(fileName: string): Promise<number[]> {
  let fileText = await Deno.readTextFile(fileName);
  fileText = '[' + fileText + ']';
  return await JSON.parse(fileText);
}

export async function partOne(fileName: string): Promise<number[]> {
  const lanternfish = await readInLanternfish(fileName);
  console.log(lanternfish);
  return lanternfish;
}