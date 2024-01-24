import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DEFAULT_DATE_FORMAT } from "@/utils/constants";

dayjs.extend(utc);

export const formatTimestamp = (timestamp: number | bigint, format?: string) => {
  if (!format) {
    format = DEFAULT_DATE_FORMAT;
  }
  if (typeof timestamp === "bigint") {
    timestamp = Number(timestamp);
  }
  return dayjs.unix(timestamp).utc().format(format);
};
