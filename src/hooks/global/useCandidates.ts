import { atom, useAtom } from "jotai";
import { IProtocolWithStat } from "@/actions/protocols";

export interface ICandidate extends IProtocolWithStat {
  power: {
    ballot: number;
    weight: number;
  };
}

const candidatesAtom = atom<ICandidate[] | []>([]);
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
