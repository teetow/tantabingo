import squareData from "./squaredata";
import arrayShuffle from "array-shuffle";

export type SquareDesc = {
  title?: string;
}

const getRandomNums = (amount: number, max: number) => {
  const seq = Array.from(Array(max).keys());
  return arrayShuffle(seq).splice(0, amount);
};

export const getSquares = (numSquares: number) => {
  return getRandomNums(numSquares, squareData.length).map(
    (id) => squareData[id]
  );
};
