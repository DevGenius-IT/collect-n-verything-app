export const formatPrice = (amount: number, locale: string, currency: string): string => {
  const price = amount / 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(price);
};