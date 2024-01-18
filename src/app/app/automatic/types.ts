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
