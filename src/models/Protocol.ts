/* eslint-disable no-unused-vars */

import mongoose from "mongoose";
import { Address } from "viem";
import type { UrlType } from "@/types";
import { ModelNames } from "@/utils/constants";

export enum StreamType {
  Auto = "auto",
  Community = "community",
  Both = "both",
}

type AdditionalInfoType = {
  title: string;
  value: number | string;
  url: UrlType;
};

export interface IProtocol extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  type: StreamType;
  name: string;
  categories: string[];
  treasuryAddress: Address;
  title: string;
  description: string;
  sites: {
    website: UrlType;
    twitter: UrlType;
  };
  contributions: AdditionalInfoType[];
  metrics: AdditionalInfoType[];
}

const ProtocolSchema = new mongoose.Schema<IProtocol>(
  {
    type: { type: String, required: true, enum: Object.values(StreamType) },
    name: { type: String, required: true },
    categories: { type: [String], required: true },
    treasuryAddress: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    sites: {
      website: { type: String, required: true },
      twitter: { type: String, required: true },
    },
    contributions: [
      {
        title: { type: String, required: true },
        value: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    metrics: [
      {
        title: { type: String, required: true },
        value: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

export default mongoose.models.Protocol ||
  mongoose.model<IProtocol>(ModelNames.Protocol, ProtocolSchema);
