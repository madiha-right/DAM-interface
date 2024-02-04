import { Address, erc20ABI, useContractWrite, useWaitForTransaction, useContractRead } from "wagmi";
import { useToast } from "@/hooks/useToast";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/constants";

type ArgsType = {
  owner: Address;
  spender: Address;
  token: Address;
  amount: bigint;
};

export const useApproveERC20 = (args: ArgsType) => {
  const { owner, spender, token, amount } = args;
  const { toast } = useToast();

  const readAllowance = useContractRead({
    address: token,
    abi: erc20ABI,
    functionName: "allowance",
    args: [owner, spender],
    enabled: !!owner,
  });

  const writeApprove = useContractWrite({
    address: token,
    abi: erc20ABI,
    functionName: "approve",
    onError(error) {
      console.error(error);
      toast(TOAST_ERROR);
    },
  });

  const txApprove = useWaitForTransaction({
    hash: writeApprove.data?.hash,
    onSuccess(data) {
      if (data.status === "reverted") {
        console.error("Transaction reverted");
        toast(TOAST_ERROR);
        return;
      }
      toast(TOAST_SUCCESS);
      readAllowance.refetch();
    },
    onError(error) {
      console.error(error);
      toast(TOAST_ERROR);
    },
  });

  return {
    isApproved: readAllowance.data ? readAllowance.data >= amount : false,
    isLoading: writeApprove.isLoading || txApprove.isLoading,
    data: writeApprove.data,
    write: writeApprove.write,
  };
};
