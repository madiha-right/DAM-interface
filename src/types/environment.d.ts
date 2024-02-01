import { Address } from "viem";

export {};

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace NodeJS {
    // eslint-disable-next-line no-unused-vars
    interface ProcessEnv {
      // Node Provider
      ALCHEMY_ID: string; // or infuraId
      // WalletConnect
      WALLETCONNECT_PROJECT_ID: string;
      // DB
      MONGODB_URI: string;
      // Oracle
      ORACLE_PRIVATE_KEY: Address;
    }
  }
}
