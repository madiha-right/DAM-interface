export {};

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace NodeJS {
    // eslint-disable-next-line no-unused-vars
    interface ProcessEnv {
      ALCHEMY_ID: string; // or infuraId
      WALLETCONNECT_PROJECT_ID: string;
    }
  }
}
