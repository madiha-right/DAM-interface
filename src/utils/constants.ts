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
    dam: "0x93e407C6A2e3B8fd5BF3103c784bA819C731aAB7",
    embankment: "0x53F088b44022bd85E952D8D08bc7A06e46A93928",
  },
  mockYbToken: "0xe08500d66Fc3fF7e755d316eF52CBf67Fca0269F",
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

export const DEFAULT_DATE_FORMAT = "MMM DD";
