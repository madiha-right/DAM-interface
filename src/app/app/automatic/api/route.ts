import type { MantleJourneyDataType, ProtocolDataType } from "@/app/app/automatic/types";

const MANTLE_JOURNEY_BASE_URL = "https://mdi-quests-api-production.up.railway.app";

export async function GET(): Promise<Response> {
  const resTxn = await fetch(MANTLE_JOURNEY_BASE_URL + "/leaderboard/protocol/txn");
  const resTvl = await fetch(MANTLE_JOURNEY_BASE_URL + "/leaderboard/protocol/tvl");
  const txn = await resTxn.json();
  const tvl = await resTvl.json();

  const data = mergeData(txn, tvl);

  return Response.json({ data });
}
/**
 * TODO:
 * 1. Add error handling
 * 2. format tvl, tx count, miles
 * - miles should be percentage that represents growth rate based on last round's info
 * - mock data for last round (In real world it will be the data of before round begins)
 * - how are we gonna compare the growth rate? Big O notation should be considered
 */
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
