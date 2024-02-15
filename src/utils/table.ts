/* eslint-disable no-unused-vars */

export enum ColumnKeys {
  Name = "name",
  Categories = "categories",
  Tvl = "tvl",
  TxCount = "txCount",
  MilesToday = "milesToday",
  MilesAccumulated = "milesAccumulated",
  Received = "received",
  PowerBallot = "powerBallot",
  PowerWeight = "powerWeight",
}

export const getHeaderName = (key: ColumnKeys) => {
  switch (key) {
    case ColumnKeys.Name:
      return "Name";
    case ColumnKeys.Categories:
      return "Category";
    case ColumnKeys.Tvl:
      return "TVL";
    case ColumnKeys.TxCount:
      return "Tx Count";
    case ColumnKeys.MilesToday:
      return "Miles received today";
    case ColumnKeys.MilesAccumulated:
      return "Miles Accumulated";
    case ColumnKeys.Received:
      return "Received";
    case ColumnKeys.PowerBallot:
      return "";
    case ColumnKeys.PowerWeight:
      return "Weight";
    default:
      return "Wrong Key";
  }
};
