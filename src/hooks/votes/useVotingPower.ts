import { Address } from "viem";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { requestGetVotingPower, type VotingPowerDataType } from "@/actions/votes";

type ArgsType = {
  block: bigint;
  address: Address;
};

type VotingPowerReturnType = UseQueryResult<VotingPowerDataType, Error>;

export const useVotingPower = (
  payload: ArgsType,
  options?: UseQueryOptions<VotingPowerDataType, Error, VotingPowerDataType, string[]>,
): VotingPowerReturnType => {
  return useQuery({
    queryKey: ["votingPower"],
    queryFn: () => requestGetVotingPower(payload.block, payload.address),
    ...options,
  });
};
