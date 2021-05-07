function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

function formatCurrency(currency: string, value: number): string {
  const formatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
}

export { classNames, formatCurrency };
