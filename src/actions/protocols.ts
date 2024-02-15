import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Round, { IStat } from "@/models/Round";
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
    votes: IStat["votes"] & {
      weight?: number;
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
    throw new Error("No protocols found");
  }

  return mergeData(protocols, txn, tvl);
};

export const getProtocolsWithStat = async (roundId: number): Promise<IProtocolWithStat[]> => {
  const resTxn = await fetch(MANTLE_JOURNEY_BASE_URL + "/leaderboard/protocol/txn");
  const resTvl = await fetch(MANTLE_JOURNEY_BASE_URL + "/leaderboard/protocol/tvl");
  const txn = await resTxn.json();
  const tvl = await resTvl.json();

  await dbConnect();

  const round = await Round.findOne({ roundId }).populate("protocols.protocol");

  if (!round) {
    return [];
    // throw new Error("No round found");
  }

  return mergeDataWithStat(round.protocols, txn, tvl);
};

const mergeDataWithStat = (
  protocols: IProtocolWithStat[],
  transactionsData: MantleJourneyDataType[],
  tvlData: MantleJourneyDataType[],
): IProtocolWithStat[] => {
  const combined: Record<string, IProtocolWithStat> = {};

  for (const item of protocols) {
    combined[item.protocol.name] = item;
  }

  for (const item of transactionsData) {
    if (combined[item.name]) {
      combined[item.name] = {
        protocol: combined[item.name].protocol,
        stat: {
          votes: combined[item.name].stat.votes,
          txCount: item.stat.value,
          miles: {
            ...combined[item.name].stat.miles,
            today: item.stat.miles,
            accumulated: item.stat.cumulateMiles,
          },
        },
      };
    }
  }

  for (const item of tvlData) {
    if (combined[item.name]) {
      combined[item.name] = {
        protocol: combined[item.name].protocol,
        stat: {
          ...combined[item.name].stat,
          tvl: item.stat.value,
          miles: {
            ...combined[item.name].stat.miles,
            today: combined[item.name].stat.miles.today + item.stat.miles,
            accumulated: combined[item.name].stat.miles.accumulated + item.stat.cumulateMiles,
          },
        },
      };
    }
  }

  return Object.values(combined);
};

const mergeData = (
  protocols: IProtocol[],
  transactionsData: MantleJourneyDataType[],
  tvlData: MantleJourneyDataType[],
): IProtocolWithStat[] => {
  const combined: Record<string, IProtocolWithStat> = {};

  for (const item of protocols) {
    combined[item.name] = {
      protocol: item,
      stat: {} as unknown as IProtocolWithStat["stat"],
    };
  }

  for (const item of transactionsData) {
    if (combined[item.name]) {
      combined[item.name].stat = {
        ...combined[item.name].stat,
        txCount: item.stat.value,
        miles: {
          ...combined[item.name].stat.miles,
          today: item.stat.miles,
          accumulated: item.stat.cumulateMiles,
        },
      };
    }
  }

  for (const item of tvlData) {
    if (combined[item.name]) {
      combined[item.name].stat = {
        ...combined[item.name].stat,
        tvl: item.stat.value,
      };

      combined[item.name].stat.miles.today += item.stat.miles;
      combined[item.name].stat.miles.accumulated += item.stat.cumulateMiles;
    }
  }

  return Object.values(combined);
};
