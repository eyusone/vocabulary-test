import { getRandomNumber } from './get-random-number';

export const randomizeArray = (array: Array<string>) => {
  return array.reduce(
    (newArr, _, i) => {
      let rand = i + getRandomNumber({ boundary: newArr.length - i });
      [newArr[rand], newArr[i]] = [newArr[i], newArr[rand]];
      return newArr;
    },
    [...array]
  );
};
