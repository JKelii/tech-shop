export const priceUpdate = (value: number) => {
  const amount = value / 100;
  const total = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  return total;
};
