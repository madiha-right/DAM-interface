import mongoose from "mongoose";
import { UrlType } from "@/types";
import { MANTLE_JOURNEY_BASE_URL } from "@/utils/site";

type Stat = {
  value: number;
  miles: number;
  cumulateMiles: number;
  _1DayChanges?: number;
  _7DayChanges?: number;
};

type MantleJourneyDataType = {
  _id: mongoose.Types.ObjectId;
  protocol: string;
  type?: string;
  stat: Stat;
  rank?: number;
  categories: string[];
  name: string;
  website: UrlType;
};

type ProtocolStatType = {
  txCount?: number;
  tvl?: number;
  milesToday: number;
  milesAccumulated: number;
};

export type ProtocolAutoType = {
  _id: mongoose.Types.ObjectId;
  protocol: string;
  stat: ProtocolStatType;
  categories: string[];
  name: string;
  website: UrlType;
};

export const getProtocolsAuto = async (): Promise<ProtocolAutoType[] | []> => {
  try {
    const resTxn = await fetch(MANTLE_JOURNEY_BASE_URL + "/leaderboard/protocol/txn");
    const resTvl = await fetch(MANTLE_JOURNEY_BASE_URL + "/leaderboard/protocol/tvl");
    const txn = await resTxn.json();
    const tvl = await resTvl.json();

    const data = mergeData(txn, tvl);

    return data.filter((item) => item.stat.milesToday >= 1 && item.stat.milesAccumulated >= 1);
  } catch (error) {
    console.error("error", error);
    return [];
  }
};

type AdditionalInfoType = {
  title: string;
  value: number | string;
  url: UrlType;
};

export type ProtocolCommunityType = {
  id: string;
  name: string;
  categories: string[];
  weight: number;
  title: string;
  description: string;
  sites: {
    website: UrlType;
    twitter: UrlType;
  };
  contributions: AdditionalInfoType[];
  metrics: AdditionalInfoType[];
  voteProportion?: number;
  voteWeight?: number;
};

export const getProtocolsCommunity = (): ProtocolCommunityType[] | [] => {
  return [
    {
      id: "1222",
      name: "Aave",
      categories: ["Defi"],
      weight: 0,
      title:
        "Aave is an open source and non-custodial protocol enabling the creation of money markets.",
      description:
        "Aave is an open source and non-custodial protocol enabling the creation of money markets. Users can earn interest on deposits and borrow assets. Deposits are used to provide liquidity and borrowers can borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion. The protocol’s objective is to provide a highly reliable and efficient infrastructure for decentralized finance. Aave is the first DeFi protocol to introduce flash loans, a type of loan that does not require collateral to borrow.",
      sites: {
        website: "https://aave.com/",
        twitter: "https://twitter.com/AaveAave",
      },
      contributions: [
        { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
        { title: "app", value: 10, url: "https://app.aave.com/" },
        { title: "github", value: 1, url: "https://github.com" },
      ],
      metrics: [
        { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
        { title: "app", value: 10, url: "https://app.aave.com/" },
        { title: "github", value: 1, url: "https://github.com" },
      ],
    },
    {
      id: "122233",
      name: "Compound",
      categories: ["Defi"],
      weight: 0,
      title:
        "Aave is an open source and non-custodial protocol enabling the creation of money markets.",
      description:
        "Aave is an open source and non-custodial protocol enabling the creation of money markets. Users can earn interest on deposits and borrow assets. Deposits are used to provide liquidity and borrowers can borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion. The protocol’s objective is to provide a highly reliable and efficient infrastructure for decentralized finance. Aave is the first DeFi protocol to introduce flash loans, a type of loan that does not require collateral to borrow.",
      sites: {
        website: "https://aave.com/",
        twitter: "https://twitter.com/AaveAave",
      },
      contributions: [
        { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
        { title: "app", value: 10, url: "https://app.aave.com/" },
        { title: "github", value: 1, url: "https://github.com" },
      ],
      metrics: [
        { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
        { title: "app", value: 10, url: "https://app.aave.com/" },
        { title: "github", value: 1, url: "https://github.com" },
      ],
    },
    {
      id: "132",
      name: "Uniswap",
      categories: ["Defi"],
      weight: 0,
      title:
        "Uniswap is an open source and non-custodial protocol enabling the creation of money markets.",
      description:
        "Uniswap is an open source and non-custodial protocol enabling the creation of money markets. Users can earn interest on deposits and borrow assets. Deposits are used to provide liquidity and borrowers can borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion. The protocol’s objective is to provide a highly reliable and efficient infrastructure for decentralized finance. Aave is the first DeFi protocol to introduce flash loans, a type of loan that does not require collateral to borrow.",
      sites: {
        website: "https://aave.com/",
        twitter: "https://twitter.com/AaveAave",
      },
      contributions: [
        { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
        { title: "app", value: 10, url: "https://app.aave.com/" },
        { title: "github", value: 1, url: "https://github.com" },
      ],
      metrics: [
        { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
        { title: "app", value: 10, url: "https://app.aave.com/" },
        { title: "github", value: 1, url: "https://github.com" },
      ],
    },
    {
      id: "1255552",
      name: "Dam",
      categories: ["Infrastructure"],
      weight: 0,
      title:
        "Dam is an open source and non-custodial protocol enabling the creation of money markets.",
      description:
        "Dam is an open source and non-custodial protocol enabling the creation of money markets. Users can earn interest on deposits and borrow assets. Deposits are used to provide liquidity and borrowers can borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion. The protocol’s objective is to provide a highly reliable and efficient infrastructure for decentralized finance. Aave is the first DeFi protocol to introduce flash loans, a type of loan that does not require collateral to borrow.",
      sites: {
        website: "https://aave.com/",
        twitter: "https://twitter.com/AaveAave",
      },
      contributions: [
        { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
        { title: "app", value: 10, url: "https://app.aave.com/" },
        { title: "github", value: 1, url: "https://github.com" },
      ],
      metrics: [
        { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
        { title: "app", value: 10, url: "https://app.aave.com/" },
        { title: "github", value: 1, url: "https://github.com" },
      ],
    },
    {
      id: "122200000",
      name: "Axie Infinity",
      categories: ["Gaming"],
      weight: 0,
      title:
        "Axie Infinity is an open source and non-custodial protocol enabling the creation of money markets.",
      description:
        "Axie Infinity is an open source and non-custodial protocol enabling the creation of money markets. Users can earn interest on deposits and borrow assets. Deposits are used to provide liquidity and borrowers can borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion. The protocol’s objective is to provide a highly reliable and efficient infrastructure for decentralized finance. Aave is the first DeFi protocol to introduce flash loans, a type of loan that does not require collateral to borrow.",
      sites: {
        website: "https://aave.com/",
        twitter: "https://twitter.com/AaveAave",
      },
      contributions: [
        { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
        { title: "app", value: 10, url: "https://app.aave.com/" },
        { title: "github", value: 1, url: "https://github.com" },
      ],
      metrics: [
        { title: "docs", value: 100, url: "https://docs.aave.com/developers/introduction" },
        { title: "app", value: 10, url: "https://app.aave.com/" },
        { title: "github", value: 1, url: "https://github.com" },
      ],
    },
  ];
};

const mergeData = (
  transactionsData: MantleJourneyDataType[],
  tvlData: MantleJourneyDataType[],
): ProtocolAutoType[] => {
  const combined: Record<string, ProtocolAutoType> = {};

  for (const item of transactionsData) {
    // eslint-disable-next-line no-unused-vars
    const { rank, type, categories, stat, ...rest } = item; // Destructuring to exclude
    combined[item.protocol] = {
      ...rest,
      categories: item.categories,
      stat: {
        txCount: item.stat.value,
        milesToday: item.stat.miles,
        milesAccumulated: item.stat.cumulateMiles,
      },
    };
  }

  for (const item of tvlData) {
    // eslint-disable-next-line no-unused-vars
    const { rank, type, categories, stat, ...rest } = item; // Destructuring to exclude
    if (combined[item.protocol]) {
      combined[item.protocol] = {
        ...combined[item.protocol],
        stat: {
          ...combined[item.protocol].stat,
          tvl: item.stat.value,
          milesToday: combined[item.protocol].stat.milesToday + item.stat.miles,
          milesAccumulated: combined[item.protocol].stat.milesAccumulated + item.stat.cumulateMiles,
        },
      };
    } else {
      combined[item.protocol] = {
        ...rest,
        categories: item.categories,
        stat: {
          tvl: item.stat.value,
          milesToday: item.stat.miles,
          milesAccumulated: item.stat.cumulateMiles,
        },
      };
    }
  }

  return Object.values(combined);
};
