/* eslint-disable no-unused-vars */

export enum ColumnKeys {
  Name = "name",
  Category = "category",
  Tvl = "tvl",
  TxCount = "txCount",
  MilesToday = "milesToday",
  MilesAccumulated = "milesAccumulated",
  ReceivedWeight = "weight",
  VoteProportion = "voteProportion",
  VoteWeight = "voteWeight",
}

export const getHeaderName = (key: ColumnKeys) => {
  switch (key) {
    case ColumnKeys.Name:
      return "Name";
    case ColumnKeys.Category:
      return "Category";
    case ColumnKeys.Tvl:
      return "TVL";
    case ColumnKeys.TxCount:
      return "Tx Count";
    case ColumnKeys.MilesToday:
      return "Miles received today";
    case ColumnKeys.MilesAccumulated:
      return "Miles Accumulated";
    case ColumnKeys.ReceivedWeight:
      return "Received";
    case ColumnKeys.VoteProportion:
      return "";
    case ColumnKeys.VoteWeight:
      return "Weight";
    default:
      return "Wrong Key";
  }
};
