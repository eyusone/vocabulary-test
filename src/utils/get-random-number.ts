export const getRandomNumber = ({ boundary }: { boundary: number }): number => {
  return Math.floor(Math.random() * boundary);
};
