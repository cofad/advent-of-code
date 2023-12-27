type Map = {
  name: string;
  ranges: Range[];
};

type Range = { sourceStart: number; sourceEnd: number; offset: number };

export function partOne(data: string): number {
  const seeds = parseSeeds(data);

  const maps = [
    "seed-to-soil",
    "soil-to-fertilizer",
    "fertilizer-to-water",
    "water-to-light",
    "light-to-temperature",
    "temperature-to-humidity",
    "humidity-to-location",
  ].map((mapName) => parseMap(data, mapName));

  const mappedSeeds = seeds.map((seed) => calcMappedValue(maps, seed));

  const smallestSeed = Math.min(...mappedSeeds.map((seed) => seed));

  return smallestSeed;
}

export function partTwo(data: string): number {
  return 0;
}

function calcMappedValue(maps: Map[], seed: number): number {
  return maps.reduce((mappedValue, map) => {
    const range = map.ranges.find((range) => mappedValue >= range.sourceStart && mappedValue <= range.sourceEnd);
    return range ? mappedValue + range?.offset : mappedValue;
  }, seed);
}

function parseSeeds(data: string): number[] {
  const seedRegex = new RegExp(/seeds: (.*)/);
  const seeds = seedRegex.exec(data)?.[1].split(" ");
  if (!seeds) throw new Error("Failed to parse seeds");

  return seeds.map((seed) => parseInt(seed));
}

function parseMap(data: string, mapName: string): Map {
  const mapRegexString = `${mapName} map:\n((.+\n)*)`;
  const mapRegex = new RegExp(mapRegexString);

  const map = mapRegex
    .exec(data)?.[1]
    .trim()
    .split("\n")
    .map((x) => {
      const [destStart, sourceStart, length] = x.split(" ");

      return {
        sourceStart: parseInt(sourceStart),
        sourceEnd: parseInt(sourceStart) + parseInt(length) - 1,
        offset: parseInt(destStart) - parseInt(sourceStart),
      };
    });

  if (!map) throw new Error("Map is undefined");

  return { ranges: map, name: mapName };
}
