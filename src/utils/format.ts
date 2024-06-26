import { formatEther } from "viem";
import { PRECISION } from "@/utils/constants";

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

export const formatCount = (count?: number | string): string => {
  if (!count) {
    return "0";
  }
  if (typeof count === "number") {
    count = count.toFixed(0);
  }
  return count.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * @notice Format a number as a percentage
 * @param value A number between 0 and 1
 * @returns A string representing the percentage
 * @example formatPercentage(0.123) => "12.3%"
 */
export const formatPercentage = (value: number): string => {
  const percentage = value * 100;
  // Check if the percentage is an integer
  if (percentage % 1 === 0) {
    // If it's an integer, return it without decimal places
    return percentage + "%";
  }
  // If it's not an integer, return it with one decimal place
  return percentage.toFixed(1) + "%";
};

export const formatEtherWithPrecision = (value: bigint, precision = PRECISION.long) => {
  // Use formatEther from viem to convert the value to a string
  const etherString = formatEther(value);

  // Split the string into two parts [before the decimal, after the decimal]
  const parts = etherString.split(".");

  if (parts.length === 2) {
    const decimalPart = parts[1].slice(0, precision); // Get only the first 'precision' digits
    return `${parts[0]}.${decimalPart}`; // Combine the whole part with the truncated decimal part
  } else {
    // In case the value is an integer and doesn't have a decimal part
    return parts[0];
  }
};

export const toObject = <T>(data: T): T => {
  return JSON.parse(
    JSON.stringify(
      data,
      (_, value) => (typeof value === "bigint" ? value.toString() : value), // return everything else unchanged
    ),
  );
};
