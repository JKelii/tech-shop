export const priceUpdate = (value: number) => {
  const total = value / 100;
  return `${total.toFixed(2)}$`;
};
