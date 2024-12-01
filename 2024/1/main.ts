import { zip } from "../../utils/utils.ts";

export function partOne(data: string): number {
  const [leftIds, rightIds] = extractIds(data);

  const distance = zip(leftIds, rightIds)
    .map(([leftId, rightId]) => Math.abs(leftId - rightId))
    .reduce((distance, delta) => distance + delta, 0);

  return distance;
}

export function partTwo(data: string): number {
  const [leftIds, rightIds] = extractIds(data);

  const similarityScore = leftIds
    .reduce((similarityScore, leftId) => {
      const matchingRightIdCount = rightIds.filter((x) => x === leftId).length;
      const similarityScoreDelta = leftId * matchingRightIdCount;
      return similarityScore + similarityScoreDelta;
    }, 0);

  return similarityScore;
}

function extractIds(data: string): [number[], number[]] {
  const ids = data
    .split("\n")
    .slice(0, -1)
    .map((line) => line.replace(/\s{2,}/g, " "))
    .map((line) => line.split(" ").map((word) => parseInt(word)));

  const leftIds = ids.map(([leftId, _]) => leftId).sort();
  const rightIds = ids.map(([_, rightId]) => rightId).sort();

  return [leftIds, rightIds];
}
