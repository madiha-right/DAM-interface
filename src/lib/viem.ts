import {
  createPublicClient,
  createTestClient,
  createWalletClient,
  http,
  publicActions,
  walletActions,
} from "viem";
import { foundry, mainnet, mantle } from "viem/chains";
import { MANTLE_RPC_URL } from "@/utils/site";

export const chain = process.env.NODE_ENV === "development" ? foundry : mantle;

export const ethereumPublicClient = createPublicClient({
  chain: mainnet, // use mainnet to get block number of mainnet. this block number is used for mantle api voting
  transport: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`),
});

const localClient = createTestClient({
  chain: foundry,
  mode: "anvil",
  transport: http(),
})
  .extend(publicActions)
  .extend(walletActions);

export const publicClient =
  process.env.NODE_ENV === "development"
    ? localClient
    : createPublicClient({
        chain: mantle,
        transport: http(MANTLE_RPC_URL),
      });

export const oracleWalletClient =
  process.env.NODE_ENV === "development"
    ? localClient
    : createWalletClient({
        chain: mantle,
        transport: http(MANTLE_RPC_URL),
      });
