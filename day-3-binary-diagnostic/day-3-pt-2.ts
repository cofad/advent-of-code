const bytes = await getData();
const gamma = calculateGamma(bytes);
const epsilon = calculateEpsilon(gamma);
const powerConsumption = calculatePowerConsumption(gamma, epsilon);
const oxygenGeneratorRating = calculateOxygenGeneratorRating(bytes);
const co2ScrubberRating = calculateCo2ScrubberRating(bytes);
const lifeSupportRating = calculateLifeSupportRating(
  oxygenGeneratorRating,
  co2ScrubberRating
);

console.log({ bytes });
console.log({ gamma });
console.log({ epsilon });
console.log({ powerConsumption });
console.log({ oxygenGeneratorRating });
console.log({ co2ScrubberRating });
console.log({ lifeSupportRating });

async function getData(): Promise<string[]> {
  let data = await Deno.readTextFile("day-3-data.txt");
  data = '["' + data + '"]';
  data = data.replaceAll("\n", '","');
  const dataArray: string[] = JSON.parse(data);

  return dataArray;
}

function calculateGamma(bytes: string[]): string {
  let gamma = "";
  const bitCounts = calculateBitCount(bytes);

  bitCounts.forEach((bitCount) => {
    bitCount > 0 ? (gamma += "1") : (gamma += "0");
  });

  return gamma;
}

function calculateBitCount(bytes: string[]) {
  const bitCounts: number[] = new Array(bytes[0].length).fill(0);

  bytes.forEach((byte) => {
    byte.split("").forEach((bit, j) => {
      parseInt(bit, 2) === 0 ? bitCounts[j]-- : bitCounts[j]++;
    });
  });

  return bitCounts;
}

function calculateEpsilon(gamma: string): string {
  return gamma.replaceAll("0", "A").replaceAll("1", "0").replaceAll("A", "1");
}

function calculatePowerConsumption(gamma: string, epsilon: string): number {
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function calculateOxygenGeneratorRating(bytes: string[]): number {
  let data = [...bytes];

  for (let i = 0; i < data[0].length; i++) {
    const bitCount = calculateBitCount(data);

    data = data.filter(
      (element) => element.charAt(i) === (bitCount[i] >= 0 ? "1" : "0")
    );

    if (data.length === 1) break;
  }

  return parseInt(data[0], 2);
}

function calculateCo2ScrubberRating(bytes: string[]): number {
  let data = [...bytes];

  for (let i = 0; i < data[0].length; i++) {
    const bitCount = calculateBitCount(data);

    data = data.filter(
      (element) => element.charAt(i) === (bitCount[i] >= 0 ? "0" : "1")
    );

    if (data.length === 1) break;
  }

  return parseInt(data[0], 2);
}

function calculateLifeSupportRating(
  oxygenGeneratorRating: number,
  co2ScrubberRating: number
): number {
  return oxygenGeneratorRating * co2ScrubberRating;
}
