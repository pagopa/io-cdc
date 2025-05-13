export const getRandomResponse = () => {
  return Math.random() < 0.2;
};
export const getRandomError = () => {
  const codes = [500, 501];
  const index = Math.floor(Math.random() * codes.length);
  return codes[index];
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
