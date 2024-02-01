import type { Address } from "viem";

export enum ModelNames {
  // eslint-disable-next-line no-unused-vars
  Round = "Round",
}

type ContractAddresses = {
  protocol: {
    dam: Address;
    embankment: Address;
  };
  ybToken: Address;
};

const MANTLE_ETH_ADDRESS = "0xcDA86A272531e8640cD7F1a92c01839911B90bb0";

export const CONTRACT_ADDRESSES: ContractAddresses = {
  // TODO: handle production
  protocol: {
    dam:
      process.env.NODE_ENV === "development"
        ? "0x4c5859f0F772848b2D91F1D83E2Fe57935348029"
        : "0x93e407C6A2e3B8fd5BF3103c784bA819C731aAB7",
    embankment:
      process.env.NODE_ENV === "development"
        ? "0x809d550fca64d94Bd9F66E60752A544199cfAC3D"
        : "0x53F088b44022bd85E952D8D08bc7A06e46A93928",
  },
  ybToken: MANTLE_ETH_ADDRESS,
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
