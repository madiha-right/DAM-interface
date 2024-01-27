import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useToast } from "@/hooks/useToast";
import { CONTRACT_ADDRESSES, TOAST_ERROR, TOAST_SUCCESS } from "@/utils/constants";
import DamAbi from "@/abis/Dam.json";

type ArgsType = {
  onSuccess?: () => void;
};

export const useOperateDam = (args: ArgsType) => {
  const { toast } = useToast();

  const writeOperateDam = useContractWrite({
    address: CONTRACT_ADDRESSES.protocol.dam,
    abi: DamAbi.abi,
    functionName: "operateDam",
    onError() {
      toast(TOAST_ERROR);
    },
  });

  const txOperateDam = useWaitForTransaction({
    hash: writeOperateDam.data?.hash,
    onSuccess(data) {
      if (data.status === "reverted") {
        toast(TOAST_ERROR);
        return;
      }
      toast(TOAST_SUCCESS);
      args.onSuccess?.();
    },
    onError() {
      toast(TOAST_ERROR);
    },
  });

  return {
    isLoading: writeOperateDam.isLoading || txOperateDam.isLoading,
    data: writeOperateDam.data,
    write: writeOperateDam.write,
  };
};

export const useOperateDamWithPermit = (args: ArgsType) => {
  const { toast } = useToast();

  const writeOperateDamWithPermit = useContractWrite({
    address: CONTRACT_ADDRESSES.protocol.dam,
    abi: DamAbi.abi,
    functionName: "operateDamWithPermit",
    onError() {
      toast(TOAST_ERROR);
    },
  });

  const txOperateDamWithPermit = useWaitForTransaction({
    hash: writeOperateDamWithPermit.data?.hash,
    onSuccess(data) {
      if (data.status === "reverted") {
        toast(TOAST_ERROR);
        return;
      }
      toast(TOAST_SUCCESS);
      args.onSuccess?.();
    },
    onError() {
      toast(TOAST_ERROR);
    },
  });

  return {
    isLoading: writeOperateDamWithPermit.isLoading || txOperateDamWithPermit.isLoading,
    data: writeOperateDamWithPermit.data,
    write: writeOperateDamWithPermit.write,
  };
};
