export const formatMoney = (value: string | undefined): string => {
  if (!value) return "";

  const number = Number(value);
  if (isNaN(number)) return "";

  return `$${new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(number)
    .replace(/\s/g, "")}`;
};