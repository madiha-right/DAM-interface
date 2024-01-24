import type { Address } from "viem";

type ContractAddresses = {
  protocol: {
    dam: Address;
    embankment: Address;
  };
  mockYbToken: Address;
};

export const CONTRACT_ADDRESSES: ContractAddresses = {
  // TODO: handle production
  protocol: {
    dam: "0x0b6913ca639fEb218a03604211066fD856Aa4990",
    embankment: "0x20C382f519bBbF1D2BDab2b681Da76F8b6eBcB55",
  },
  mockYbToken: "0xD299a1bb1b0Cf47353373b4Cc35A512705101354",
};

type ToastType = {
  title: string;
  description: string;
  variant?: "default" | "destructive" | "constructive" | null;
};

export const TOAST_ERROR: ToastType = {
  variant: "destructive",
  title: "Uh oh! Something went wrong.",
  description: "There was a problem with your request.",
};

export const TOAST_SUCCESS: ToastType = {
  variant: "constructive",
  title: "Success!",
  description: "Your request was successful.",
};

export const DEADLINE = 1;
