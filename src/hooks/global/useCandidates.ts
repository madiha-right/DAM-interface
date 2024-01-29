import { atom, useAtom } from "jotai";
import type { ProtocolCommunityType } from "@/actions/protocols";

const candidatesAtom = atom<ProtocolCommunityType[] | []>([]);
const toggleCandidateListAtom = atom<boolean>(false);

export const useCandidates = () => {
  return useAtom(candidatesAtom);
};

export const useToggleCandidateList = () => {
  const [isOpenCandidateList, setIsOpenCandidateList] = useAtom(toggleCandidateListAtom);

  const toggle = () => {
    setIsOpenCandidateList(!isOpenCandidateList);
  };

  return [isOpenCandidateList, toggle] as const;
};
