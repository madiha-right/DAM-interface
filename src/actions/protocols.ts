import { MANTLE_JOURNEY_BASE_URL } from "@/utils/site";

type Stat = {
  _id: string;
  value: number;
  miles: number;
  cumulateMiles: number;
  _1DayChanges?: number;
  _7DayChanges?: number;
};

export type MantleJourneyDataType = {
  _id: string;
  protocol: string;
  type?: string;
  stat: Stat;
  rank?: number;
  categories: string[];
  name: string;
  website: string;
};

export type ProtocolDataType = {
  _id: string;
  protocol: string;
  txCount?: number;
  tvl?: number;
  milesToday: number;
  milesAccumulated: number;
  category: string;
  name: string;
  website: string;
};

/**
 * TODO:
 * 1. on start round, save the protocol data to the database
 * 2. on end round, compare current protocol data to the saved data
 */

export const getProtocols = async (): Promise<ProtocolDataType[] | []> => {
  try {
    const resTxn = await fetch(MANTLE_JOURNEY_BASE_URL + "/leaderboard/protocol/txn");
    const resTvl = await fetch(MANTLE_JOURNEY_BASE_URL + "/leaderboard/protocol/tvl");
    const txn = await resTxn.json();
    const tvl = await resTvl.json();

    const data = mergeData(txn, tvl);

    return data;
  } catch (error) {
    console.error("error", error);
    return [];
  }
};

const mergeData = (
  transactionsData: MantleJourneyDataType[],
  tvlData: MantleJourneyDataType[],
): ProtocolDataType[] => {
  const combined: Record<string, ProtocolDataType> = {};

  for (const item of transactionsData) {
    // eslint-disable-next-line no-unused-vars
    const { rank, type, categories, ...rest } = item; // Destructuring to exclude
    combined[item.protocol] = {
      ...rest,
      category: item.categories[0],
      txCount: item.stat.value,
      milesToday: item.stat.miles,
      milesAccumulated: item.stat.cumulateMiles,
    };
  }

  for (const item of tvlData) {
    // eslint-disable-next-line no-unused-vars
    const { rank, type, categories, ...rest } = item; // Destructuring to exclude
    if (combined[item.protocol]) {
      combined[item.protocol] = {
        ...combined[item.protocol],
        tvl: item.stat.value,
        milesToday: combined[item.protocol].milesToday + item.stat.miles,
        milesAccumulated: combined[item.protocol].milesAccumulated + item.stat.cumulateMiles,
      };
    } else {
      combined[item.protocol] = {
        ...rest,
        category: item.categories[0],
        tvl: item.stat.value,
        milesToday: item.stat.miles,
        milesAccumulated: item.stat.cumulateMiles,
      };
    }
  }

  return Object.values(combined);
};
