import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { IStat } from "@/models/Round";
import Protocol, { IProtocol } from "@/models/Protocol";
import { UrlType } from "@/types";
import { MANTLE_JOURNEY_BASE_URL } from "@/utils/site";

type MantleJourneyStatType = {
  value: number;
  miles: number;
  cumulateMiles: number;
  _1DayChanges?: number;
  _7DayChanges?: number;
};

type MantleJourneyDataType = {
  _id: mongoose.Types.ObjectId;
  protocol: string; // name
  type?: string;
  stat: MantleJourneyStatType;
  rank?: number;
  categories: string[];
  name: string;
  website: UrlType;
};

export interface IProtocolWithStat {
  stat: IStat & {
    txCount?: number;
    tvl?: number;
    miles: IStat["miles"] & {
      today: number;
      accumulated: number;
    };
  };
  protocol: IProtocol;
}

export const getProtocols = async (): Promise<IProtocolWithStat[]> => {
  const resTxn = await fetch(MANTLE_JOURNEY_BASE_URL + "/leaderboard/protocol/txn");
  const resTvl = await fetch(MANTLE_JOURNEY_BASE_URL + "/leaderboard/protocol/tvl");
  const txn = await resTxn.json();
  const tvl = await resTvl.json();

  await dbConnect();

  const protocols = await Protocol.find({});

  if (!protocols) {
    throw new Error("No round found");
  }

  return mergeData(protocols, txn, tvl);
};

// export const getProtocolsCommunity = (): ProtocolCommunityType[] | [] => {
//   return [
//     {
//       _id: "1222",
//       name: "Aave",
//       categories: ["Defi"],
//       vote: { received: 0 },
//       title:
//         "Aave is an open source and non-custodial protocol enabling the creation of money markets.",
//       description:
//         "Aave is an open source and non-custodial protocol enabling the creation of money markets. Users can earn interest on deposits and borrow assets. Deposits are used to provide liquidity and borrowers can borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion. The protocol’s objective is to provide a highly reliable and efficient infrastructure for decentralized finance. Aave is the first DeFi protocol to introduce flash loans, a type of loan that does not require collateral to borrow.",
//       sites: {
//         website: "https://aave.com/",
//         twitter: "https://twitter.com/AaveAave",
//       },
//       contributions: [
//         { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
//         { title: "app", value: 10, url: "https://app.aave.com/" },
//         { title: "github", value: 1, url: "https://github.com" },
//       ],
//       metrics: [
//         { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
//         { title: "app", value: 10, url: "https://app.aave.com/" },
//         { title: "github", value: 1, url: "https://github.com" },
//       ],
//     },
//     {
//       _id: "122233",
//       name: "Compound",
//       categories: ["Defi"],
//       vote: { received: 0 },
//       title:
//         "Aave is an open source and non-custodial protocol enabling the creation of money markets.",
//       description:
//         "Aave is an open source and non-custodial protocol enabling the creation of money markets. Users can earn interest on deposits and borrow assets. Deposits are used to provide liquidity and borrowers can borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion. The protocol’s objective is to provide a highly reliable and efficient infrastructure for decentralized finance. Aave is the first DeFi protocol to introduce flash loans, a type of loan that does not require collateral to borrow.",
//       sites: {
//         website: "https://aave.com/",
//         twitter: "https://twitter.com/AaveAave",
//       },
//       contributions: [
//         { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
//         { title: "app", value: 10, url: "https://app.aave.com/" },
//         { title: "github", value: 1, url: "https://github.com" },
//       ],
//       metrics: [
//         { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
//         { title: "app", value: 10, url: "https://app.aave.com/" },
//         { title: "github", value: 1, url: "https://github.com" },
//       ],
//     },
//     {
//       _id: "132",
//       name: "Uniswap",
//       categories: ["Defi"],
//       vote: { received: 0 },
//       title:
//         "Uniswap is an open source and non-custodial protocol enabling the creation of money markets.",
//       description:
//         "Uniswap is an open source and non-custodial protocol enabling the creation of money markets. Users can earn interest on deposits and borrow assets. Deposits are used to provide liquidity and borrowers can borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion. The protocol’s objective is to provide a highly reliable and efficient infrastructure for decentralized finance. Aave is the first DeFi protocol to introduce flash loans, a type of loan that does not require collateral to borrow.",
//       sites: {
//         website: "https://aave.com/",
//         twitter: "https://twitter.com/AaveAave",
//       },
//       contributions: [
//         { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
//         { title: "app", value: 10, url: "https://app.aave.com/" },
//         { title: "github", value: 1, url: "https://github.com" },
//       ],
//       metrics: [
//         { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
//         { title: "app", value: 10, url: "https://app.aave.com/" },
//         { title: "github", value: 1, url: "https://github.com" },
//       ],
//     },
//     {
//       _id: "1255552",
//       name: "Dam",
//       categories: ["Infrastructure"],
//       vote: { received: 0 },
//       title:
//         "Dam is an open source and non-custodial protocol enabling the creation of money markets.",
//       description:
//         "Dam is an open source and non-custodial protocol enabling the creation of money markets. Users can earn interest on deposits and borrow assets. Deposits are used to provide liquidity and borrowers can borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion. The protocol’s objective is to provide a highly reliable and efficient infrastructure for decentralized finance. Aave is the first DeFi protocol to introduce flash loans, a type of loan that does not require collateral to borrow.",
//       sites: {
//         website: "https://aave.com/",
//         twitter: "https://twitter.com/AaveAave",
//       },
//       contributions: [
//         { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
//         { title: "app", value: 10, url: "https://app.aave.com/" },
//         { title: "github", value: 1, url: "https://github.com" },
//       ],
//       metrics: [
//         { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
//         { title: "app", value: 10, url: "https://app.aave.com/" },
//         { title: "github", value: 1, url: "https://github.com" },
//       ],
//     },
//     {
//       _id: "122200000",
//       name: "Axie Infinity",
//       categories: ["Gaming"],
//       vote: { received: 0 },
//       title:
//         "Axie Infinity is an open source and non-custodial protocol enabling the creation of money markets.",
//       description:
//         "Axie Infinity is an open source and non-custodial protocol enabling the creation of money markets. Users can earn interest on deposits and borrow assets. Deposits are used to provide liquidity and borrowers can borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion. The protocol’s objective is to provide a highly reliable and efficient infrastructure for decentralized finance. Aave is the first DeFi protocol to introduce flash loans, a type of loan that does not require collateral to borrow.",
//       sites: {
//         website: "https://aave.com/",
//         twitter: "https://twitter.com/AaveAave",
//       },
//       contributions: [
//         { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
//         { title: "app", value: 10, url: "https://app.aave.com/" },
//         { title: "github", value: 1, url: "https://github.com" },
//       ],
//       metrics: [
//         { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
//         { title: "app", value: 10, url: "https://app.aave.com/" },
//         { title: "github", value: 1, url: "https://github.com" },
//       ],
//     },
//   ];
// };

const mergeData = (
  protocols: IProtocolWithStat[],
  transactionsData: MantleJourneyDataType[],
  tvlData: MantleJourneyDataType[],
): IProtocolWithStat[] => {
  const combined: Record<string, IProtocolWithStat> = {};

  for (const item of protocols) {
    combined[item.protocol.name] = item;
  }

  for (const item of transactionsData) {
    if (combined[item.protocol]) {
      combined[item.protocol].stat.txCount = item.stat.value;
      combined[item.protocol].stat.miles.today = item.stat.miles;
      combined[item.protocol].stat.miles.accumulated = item.stat.cumulateMiles;
    }
  }

  for (const item of tvlData) {
    if (combined[item.protocol]) {
      combined[item.protocol].stat.tvl = item.stat.value;
      combined[item.protocol].stat.miles.today += item.stat.miles;
      combined[item.protocol].stat.miles.accumulated += item.stat.cumulateMiles;
    }
  }

  return Object.values(combined);
};
