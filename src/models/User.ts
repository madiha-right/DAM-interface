import mongoose from "mongoose";
import { Address } from "viem";
import { ModelNames } from "@/utils/constants";

export interface IUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  address: Address;
  rounds: mongoose.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    address: { type: String, required: true, unique: true },
    rounds: { type: [mongoose.Schema.Types.ObjectId], ref: ModelNames.Round },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

export default mongoose.models.User || mongoose.model<IUser>(ModelNames.User, UserSchema);
