let horizontal = 0;
let depth = 0;

const commands = await getData();
console.log(commands);

commands.forEach((command) => {
  switch (command.command) {
    case "forward":
      horizontal += command.value;
      break;
    case "up":
      depth += command.value;
      break;
    case "down":
      depth -= command.value;
      break;
  }
});

console.log({ horizontal });
console.log({ depth });
console.log(-depth * horizontal);

async function getData(): Promise<{ command: string; value: number }[]> {
  let data = await Deno.readTextFile("day-2-pt-1-data.txt");
  data = '["' + data + '"]';
  data = data.replaceAll("\n", '","');
  const dataArray: string[] = JSON.parse(data);

  const mappedData = dataArray.map((data) => {
    const splitData = data.split(" ");

    return { command: splitData[0], value: parseInt(splitData[1], 10) };
  });

  return mappedData;
}
