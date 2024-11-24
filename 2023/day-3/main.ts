type PartNumber = {
  value: number;
  xStart: number;
  xEnd: number;
  y: number;
};

type Symbol = {
  value: string;
  x: number;
  y: number;
};

type Gear = Symbol & { gearRatio: number };

export function partOne(data: string): number {
  const symbols = parseSymbols(data);
  const possiblePartNumbers = parsePartNumbers(data);

  const partNumberSum = possiblePartNumbers
    .filter((number) => isValidPartNumber(number, symbols))
    .reduce((pnSum, pn) => pnSum + pn.value, 0);

  return partNumberSum;
}

export function partTwo(data: string): number {
  const symbols = parseSymbols(data);
  const possiblePartNumbers = parsePartNumbers(data);

  const totalGearRatio = symbols
    .filter((symbol) => isGear(symbol, possiblePartNumbers))
    .map((symbol) => toGear(symbol, possiblePartNumbers))
    .reduce((totalGearRatio, gear) => totalGearRatio + gear.gearRatio, 0);

  return totalGearRatio;
}

function isValidPartNumber(partNumber: PartNumber, symbols: Symbol[]) {
  const alignedSymbols = symbols.filter((symbol) => {
    // Check if on the same row or above or below
    if (partNumber.y > symbol.y + 1) return false;
    if (partNumber.y < symbol.y - 1) return false;

    // Check if horizontally aligned with symbol
    if (partNumber.xStart > symbol.x + 1) return false;
    if (partNumber.xEnd < symbol.x - 1) return false;

    return true;
  });

  return alignedSymbols.length > 0;
}

function getAlignedPartNumbers(symbol: Symbol, possiblePartNumbers: PartNumber[]): PartNumber[] {
  return possiblePartNumbers.filter((partNumber) => {
    if (partNumber.y > symbol.y + 1) return false;
    if (partNumber.y < symbol.y - 1) return false;

    if (partNumber.xStart > symbol.x + 1) return false;
    if (partNumber.xEnd < symbol.x - 1) return false;

    return true;
  });
}

function isGear(symbol: Symbol, possiblePartNumbers: PartNumber[]): boolean {
  if (symbol.value !== "*") return false;

  return getAlignedPartNumbers(symbol, possiblePartNumbers).length === 2;
}

function toGear(symbol: Symbol, possiblePartNumbers: PartNumber[]): Gear {
  const gearPartNumbers = getAlignedPartNumbers(symbol, possiblePartNumbers);

  return {
    ...symbol,
    gearRatio: gearPartNumbers[0].value * gearPartNumbers[1].value,
  };
}

function parsePartNumbers(data: string): PartNumber[] {
  const lineLength = data.split("\n")[0].length;
  data = data.replaceAll("\n", "");
  const regex = new RegExp(/\d+/g);
  const matches = data.matchAll(regex);

  const partNumbers = [];

  for (const match of matches) {
    if (match.index === undefined) throw new Error("No index");

    const pn: PartNumber = {
      value: Number(match[0]),
      xStart: match.index % lineLength,
      xEnd: (match.index % lineLength) + match[0].length - 1,
      y: Math.floor(match.index / lineLength),
    };

    partNumbers.push(pn);
  }

  return partNumbers;
}

function parseSymbols(data: string): Symbol[] {
  const lineLength = data.split("\n")[0].length;
  data = data.replaceAll("\n", "");
  const regex = new RegExp(/[^\d.]+/g);
  const matches = data.matchAll(regex);

  const symbols = [];

  for (const match of matches) {
    if (match.index === undefined) throw new Error("No index");

    const symbol: Symbol = {
      value: match[0],
      x: match.index % lineLength,
      y: Math.floor(match.index / lineLength),
    };

    symbols.push(symbol);
  }

  return symbols;
}
