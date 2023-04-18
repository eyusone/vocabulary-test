export const getRandomNumber = ({
  boundary = 10,
}: {
  boundary: number;
}): number => {
  return Math.floor(Math.random() * boundary);
};
