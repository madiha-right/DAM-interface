import { useContractRead } from "wagmi";
import { useIsMounted } from "connectkit";
import Dam from "@/abis/Dam.json";
import { CONTRACT_ADDRESSES } from "@/utils/constants";
import { formatEtherWithPrecision } from "@/utils/format";

type IncentiveDataType = [bigint, bigint];

export const useReadRoundIncentive = () => {
  const readRoundIncentive = useContractRead({
    address: CONTRACT_ADDRESSES.protocol.dam,
    abi: Dam.abi,
    functionName: "getTotalIncentive",
    args: [],
  });
  const incentiveData = readRoundIncentive.data as IncentiveDataType | undefined;
  const isMounted = useIsMounted();

  return {
    isLoading: readRoundIncentive.isLoading || !isMounted,
    accmulatedIncentive: incentiveData ? formatEtherWithPrecision(incentiveData[0]) : 0,
  };
};
