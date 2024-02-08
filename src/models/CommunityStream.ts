import mongoose from "mongoose";
import { Address } from "viem";
import type { UrlType } from "@/types";
import { ModelNames } from "@/utils/constants";
import { AdditionalInfoType } from "@/actions/protocols";

export interface ICommunityStream extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  categories: string[];
  treasuryAddress: Address;
  sites: {
    website: UrlType;
    twitter: UrlType;
  };
  contributions: AdditionalInfoType[];
  metrics: AdditionalInfoType[];
}

const CommunityStreamSchema = new mongoose.Schema<ICommunityStream>(
  {
    name: { type: String, required: true },
    categories: { type: [String], required: true },
    treasuryAddress: { type: String, required: true },
    votes: {
      total: { type: BigInt, required: true },
      bit: { type: BigInt, required: true },
      mnt: { type: BigInt, required: true },
      l2Mnt: { type: BigInt, required: true },
    },
    sites: {
      website: { type: String, required: true },
      twitter: { type: String, required: true },
    },
    contributions: {
      type: [
        {
          title: { type: String, required: true },
          value: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
      required: true,
    },
    metrics: {
      type: [
        {
          title: { type: String, required: true },
          value: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

export default mongoose.models.CommunityStream ||
  mongoose.model<ICommunityStream>(ModelNames.CommunityStream, CommunityStreamSchema);
