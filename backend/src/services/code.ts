import config from "@backend/config";
import _ from "lodash";

const { discountCode: codeConfig } = config;

function createCode(
  length: number = codeConfig.length,
  characters: string = codeConfig.allowedChars,
): string {
  if (length < 1) {
    throw new Error("Provide positive error!");
  }

  const indexes = _getRandomNumbers(length, 0, characters.length - 1);
  return _getValuesStringByIndexes(characters, indexes);
}

function _getRandomNumbers(
  amount: number,
  min: number = 0,
  max: number = 9,
): number[] {
  const arr = new Array(amount).fill("*");
  return arr.map(() => _.random(min, max));
}

function _getValuesStringByIndexes(
  source: string,
  indexes: Array<number>,
): string {
  const valuesArray = indexes.map((i) => source[i]);
  return valuesArray.join("");
}

export { createCode };
