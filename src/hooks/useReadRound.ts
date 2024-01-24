import { useContractRead } from "wagmi";
import Dam from "@/abis/Dam.json";
import { CONTRACT_ADDRESSES } from "@/utils/constants";

type RoundData = [number, boolean, bigint, bigint];

export const useReadRound = () => {
  const readRound = useContractRead({
    address: CONTRACT_ADDRESSES.protocol.dam,
    abi: Dam.abi,
    functionName: "round",
    args: [],
  });
  const roundData = readRound.data as RoundData | undefined;

  return {
    id: roundData?.[0],
    ongoing: roundData?.[1],
    startTime: roundData?.[2],
    endTime: roundData?.[3],
  };
};
