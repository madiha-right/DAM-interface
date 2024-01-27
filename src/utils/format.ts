export const formatNumberToDollar = (amount: number): string => {
  let formattedNumber: string;

  if (amount >= 1_000_000_000) {
    formattedNumber = (amount / 1_000_000_000).toFixed(2);
    return "$" + parseFloat(formattedNumber).toString() + "b";
  } else if (amount >= 1_000_000) {
    formattedNumber = (amount / 1_000_000).toFixed(2);
    return "$" + parseFloat(formattedNumber).toString() + "m";
  } else if (amount >= 1_000) {
    formattedNumber = (amount / 1_000).toFixed(2);
    return "$" + parseFloat(formattedNumber).toString() + "k";
  } else {
    return "$" + amount.toFixed(0);
  }
};

export const formatCount = (count: number): string => {
  return count.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPercentage = (value: number): string => {
  // Multiply by 100 and format the number with two decimal places
  let formattedValue = (value * 100).toFixed(2);

  // Prefix with '+' if the number is positive
  if (value > 0) {
    formattedValue = "+" + formattedValue;
  }

  return formattedValue + "%";
};
