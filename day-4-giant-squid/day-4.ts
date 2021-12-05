const data = await getData();
const drawOrder = extractDrawOrder(data);
const boards = extractBoards(data);

console.log({ data });
console.log({ drawOrder });
console.log({ boards });

async function getData(): Promise<string[]> {
  let data = await Deno.readTextFile("day-4-data-example.txt");
  data = '["' + data + '"]';
  data = data.replaceAll("\n", '","');
  const dataArray: string[] = JSON.parse(data);

  return dataArray;
}

function extractDrawOrder(data: string[]): number[] {
  return JSON.parse("[" + data[0] + "]");
}

function extractBoards(data: string[]): string[][] {
  const tempData = data.slice(2).filter((element) => element !== "");

  const boards: string[][] = [];

  for (let i = 0; i < tempData.length / 5; i++) {
    boards.push(tempData.slice(i, i + 4));
  }

  return boards;
}
