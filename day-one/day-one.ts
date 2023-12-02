export function partOne(data: string): number {
  return data
    .split("\n")
    .map((l) => l.replaceAll(/[A-Za-z]/g, ""))
    .reduce((acc, curVal) => acc + Number(curVal.slice(0, 1) + curVal.slice(-1)), 0);
}

export function partTwo(data: string): number {
  return data
    .split("\n")
    .map((l) => l.replaceAll(/one/g, "one1one"))
    .map((l) => l.replaceAll(/two/g, "two2two"))
    .map((l) => l.replaceAll(/three/g, "three3three"))
    .map((l) => l.replaceAll(/four/g, "four4four"))
    .map((l) => l.replaceAll(/five/g, "five5five"))
    .map((l) => l.replaceAll(/six/g, "six6six"))
    .map((l) => l.replaceAll(/seven/g, "seven7seven"))
    .map((l) => l.replaceAll(/eight/g, "eight8eight"))
    .map((l) => l.replaceAll(/nine/g, "nine9nine"))
    .map((l) => l.replaceAll(/[A-Za-z]/g, ""))
    .reduce((acc, curVal) => acc + Number(curVal.slice(0, 1) + curVal.slice(-1)), 0);
}

// Could not get the regex to match overlapping numbers such as eightwo correctly
export function partTwoIncorrect(data: string): number {
  const digitMap = new Map<string, number>();

  digitMap.set("1", 1);
  digitMap.set("one", 1);
  digitMap.set("2", 2);
  digitMap.set("two", 2);
  digitMap.set("3", 3);
  digitMap.set("three", 3);
  digitMap.set("4", 4);
  digitMap.set("four", 4);
  digitMap.set("5", 5);
  digitMap.set("five", 5);
  digitMap.set("6", 6);
  digitMap.set("six", 6);
  digitMap.set("7", 7);
  digitMap.set("seven", 7);
  digitMap.set("8", 8);
  digitMap.set("eight", 8);
  digitMap.set("9", 9);
  digitMap.set("nine", 9);

  const digitRegex = /(?=(one|1|two|2|three|3|four|4|five|5|six|6|seven|7|eight|8|nine|9))/g;

  return data.split("\n").reduce((acc, curVal) => {
    console.log(curVal);

    const digits = curVal.match(digitRegex) || [];
    console.log(digits);

    const firstDigit = digits[0] || "";
    const lastDigit = digits[digits.length - 1] || "";

    const firstDigitValue = digitMap.get(firstDigit);
    const lastDigitValue = digitMap.get(lastDigit);

    console.log(firstDigitValue);
    console.log(lastDigitValue);

    if (firstDigitValue === undefined || lastDigitValue === undefined) throw new Error("invalid digit");

    console.log(Number(firstDigitValue.toString() + lastDigitValue.toString()));

    // return acc + (firstDigitValue * 10 + lastDigitValue);
    return acc + Number(firstDigitValue.toString() + lastDigitValue.toString());
  }, 0);
}
