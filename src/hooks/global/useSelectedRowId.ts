import { atom, useAtom } from "jotai";

const selectedRowIdAtom = atom<string | null>(null);

export const useSelectedRowId = () => {
  return useAtom(selectedRowIdAtom);
};
