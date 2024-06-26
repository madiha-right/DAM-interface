import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useToast } from "@/hooks/useToast";
import { CONTRACT_ADDRESSES, TOAST_ERROR, TOAST_SUCCESS } from "@/utils/constants";
import DamAbi from "@/abis/Dam.json";

type ArgsType = {
  onSuccess?: () => Promise<void>;
};

export const useOperateDam = (args: ArgsType) => {
  const { toast } = useToast();

  const writeOperateDam = useContractWrite({
    address: CONTRACT_ADDRESSES.protocol.dam,
    abi: DamAbi.abi,
    functionName: "operateDam",
    onError(error) {
      console.error(error);
      toast(TOAST_ERROR);
    },
  });

  const txOperateDam = useWaitForTransaction({
    hash: writeOperateDam.data?.hash,
    confirmations: 2,
    onSuccess: async (data) => {
      if (data.status === "reverted") {
        console.error("Transaction reverted");
        toast(TOAST_ERROR);
        return;
      }
      toast(TOAST_SUCCESS);
      args.onSuccess?.();
    },
    onError(error) {
      console.error(error);
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
    onError(error) {
      console.error(error);
      toast(TOAST_ERROR);
    },
  });

  const txOperateDamWithPermit = useWaitForTransaction({
    hash: writeOperateDamWithPermit.data?.hash,
    confirmations: 2, // set confirmations block to 2 to get some time to index event from subgraph
    onSuccess: async (data) => {
      if (data.status === "reverted") {
        console.error("Transaction reverted");
        toast(TOAST_ERROR);
        return;
      }
      await args.onSuccess?.();
      toast(TOAST_SUCCESS);
    },
    onError(error) {
      console.error(error);
      toast(TOAST_ERROR);
    },
  });

  return {
    isLoading: writeOperateDamWithPermit.isLoading || txOperateDamWithPermit.isLoading,
    data: writeOperateDamWithPermit.data,
    write: writeOperateDamWithPermit.write,
  };
};
