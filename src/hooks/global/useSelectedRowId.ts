import { atom, useAtom } from "jotai";
import mongoose from "mongoose";

const selectedRowIdAtom = atom<mongoose.Types.ObjectId | string | null>(null);

export const useSelectedRowId = () => {
  return useAtom(selectedRowIdAtom);
};
