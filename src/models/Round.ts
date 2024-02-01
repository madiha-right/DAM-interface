import mongoose from "mongoose";
import { Address } from "viem";
import type { UrlType } from "@/types";
import { ModelNames } from "@/utils/constants";

export interface IStat {
  milesOnStart: number;
  milesAccumulatedOnStart: number;
  milesOnEnd?: number;
  milesAccumulatedOnEnd?: number;
}

// TODO: seperate auto and community?
export interface IProtocol {
  _id: mongoose.Types.ObjectId;
  name: string;
  categories: string[];
  treasuryAddress?: Address;
  website: UrlType;
  stat: IStat;
}

export interface IRound extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  round_id: number;
  snapshot: bigint;
  protocols: IProtocol[];
  created_at: Date;
  updated_at: Date;
}

const RoundSchema = new mongoose.Schema<IRound>(
  {
    round_id: {
      type: Number,
      required: true,
      min: 1,
    },
    snapshot: {
      type: BigInt,
      required: true,
    },
    protocols: {
      type: [
        {
          name: { type: String, required: true },
          categories: { type: [String], required: true },
          treasuryAddress: { type: String },
          website: { type: String, required: true },
          stat: {
            milesOnStart: { type: Number, required: true },
            milesAccumulatedOnStart: { type: Number, required: true },
            milesOnEnd: Number,
            milesAccumulatedOnEnd: Number,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

export default mongoose.models.Round || mongoose.model<IRound>(ModelNames.Round, RoundSchema);
