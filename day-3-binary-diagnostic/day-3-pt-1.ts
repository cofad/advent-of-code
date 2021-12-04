const bytes = await getData();
console.log({ bytes });

const bitCounts: number[] = new Array(bytes[0].length).fill(0);

console.log(bitCounts);

bytes.forEach((byte) => {
  byte.split("").forEach((bit, j) => {
    parseInt(bit, 2) === 0 ? bitCounts[j]-- : bitCounts[j]++;
  });
});

console.log({ bitCounts });

let gamma = "";

bitCounts.forEach((bitCount) => {
  bitCount > 0 ? (gamma += "1") : (gamma += "0");
});

console.log({ gamma });

const epsilon = gamma
  .replaceAll("0", "A")
  .replaceAll("1", "0")
  .replaceAll("A", "1");

console.log({ epsilon });

const powerConsumption = parseInt(gamma, 2) * parseInt(epsilon, 2);
console.log(powerConsumption);

async function getData(): Promise<string[]> {
  let data = await Deno.readTextFile("day-3-data.txt");
  data = '["' + data + '"]';
  data = data.replaceAll("\n", '","');
  const dataArray: string[] = JSON.parse(data);

  return dataArray;
}
