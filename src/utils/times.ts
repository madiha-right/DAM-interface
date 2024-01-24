import { formatTimestamp } from "@/lib/dayjs";

export const daysToSeconds = (days: number) => {
  return days * 24 * 60 * 60;
};

export const getCurrentTimeInSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

export const getDeadline = (days: number) => {
  return BigInt(getCurrentTimeInSeconds() + daysToSeconds(days));
};

export { formatTimestamp };
