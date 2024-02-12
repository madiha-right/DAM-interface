import mongoose from "mongoose";
import { ModelNames } from "@/utils/constants";

export interface IStat {
  miles?: {
    start: number;
    end: number;
    accumulatedStart: number;
    accumulatedEnd: number;
  };
  votes?: {
    total: bigint;
    bit: bigint;
    mnt: bigint;
    l2Mnt: bigint;
  };
}

interface IProtocolWithStat {
  stat: IStat;
  protocol: mongoose.Types.ObjectId;
}

export interface IRoundBase extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  roundId: number;
  snapshot: bigint;
  totalVotes: bigint;
  created_at: Date;
  updated_at: Date;
}

interface IRound extends IRoundBase {
  protocols: IProtocolWithStat[];
}

const RoundSchema = new mongoose.Schema<IRound>(
  {
    roundId: {
      type: Number,
      required: true,
      min: 1,
    },
    snapshot: {
      type: BigInt,
      required: true,
    },
    totalVotes: {
      type: BigInt,
      required: true,
    },
    protocols: {
      type: [
        {
          protocol: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ModelNames.Protocol,
            required: true,
          },
          stat: {
            miles: {
              start: { type: Number, required: true },
              end: Number,
              accumulatedStart: { type: Number, required: true },
              accumulatedEnd: Number,
            },
            votes: {
              total: { type: BigInt, required: true },
              bit: BigInt,
              mnt: BigInt,
              l2Mnt: BigInt,
            },
          },
        },
      ],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

export default mongoose.models.Round || mongoose.model<IRound>(ModelNames.Round, RoundSchema);
