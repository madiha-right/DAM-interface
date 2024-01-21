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
    dam: "0xbCC7007ca073b6d92af1d1cf51c479C54ce97c74",
    embankment: "0x69c3C288e8871859A6a10f50f5f0E64b04295Bd9",
  },
  mockYbToken: "0xE78FD8ee550cF13190AEd68C84b05E3EC2610e80",
};

type ToastType = {
  title: string;
  description: string;
  variant?: "default" | "destructive" | null;
};

export const TOAST_ERROR: ToastType = {
  variant: "destructive",
  title: "Uh oh! Something went wrong.",
  description: "There was a problem with your request.",
};

export const TOAST_SUCCESS: ToastType = {
  variant: "default",
  title: "Success!",
  description: "Your request was successful.",
};
