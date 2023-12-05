import { clone } from "../utils.ts";

type Card = {
  winningNumbers: number[];
  numbers: number[];
  count: number;
};

export function partOne(data: string): number {
  const cards = parseCards(data);
  const points = calculateTotalPoints(cards);

  return points;
}

export function partTwo(data: string): number {
  const cards = parseCards(data);
  const awardedCards = awardCards(cards);
  const totalCardCount = calculateTotalCardCount(awardedCards);

  return totalCardCount;
}

function calculateTotalPoints(cards: Card[]): number {
  return cards.reduce((totalPoints, card) => {
    return totalPoints + calculatePoints(card);
  }, 0);
}

function calculateNumCardWins(card: Card): number {
  return card.numbers.filter((number) => card.winningNumbers.includes(number)).length;
}

function calculatePoints(card: Card): number {
  const numWinners = calculateNumCardWins(card);
  return numWinners > 0 ? Math.pow(2, numWinners - 1) : 0;
}

function awardCards(cards: Card[]): Card[] {
  const clonedCards = clone(cards);

  clonedCards.forEach((card, cardIndex) => {
    const numWins = calculateNumCardWins(card);

    Array(numWins)
      .fill(0)
      .map((_win, winIndex) => winIndex)
      .forEach((winIndex) => {
        const wonCard = clonedCards[cardIndex + winIndex + 1];

        wonCard.count = wonCard.count + 1 * card.count;
      });
  });

  return clonedCards;
}

function calculateTotalCardCount(cards: Card[]) {
  return cards.reduce((totalCardCount, card) => totalCardCount + card.count, 0);
}

function parseCards(data: string): Card[] {
  const lines = data
    .replaceAll(/Card[ ]+\d+: /g, "")
    .split("\n")
    .map((line) => {
      const [winningNumbers, numbers] = line.split("|");

      return {
        winningNumbers: winningNumbers
          .replaceAll("  ", " ")
          .trim()
          .split(" ")
          .map((x) => parseInt(x)),

        numbers: numbers
          .replaceAll("  ", " ")
          .trim()
          .split(" ")
          .map((x) => parseInt(x)),

        count: 1,
      };
    });
  return lines;
}
