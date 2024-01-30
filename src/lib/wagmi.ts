import { createConfig, configureChains, Chain } from "wagmi";
import { mantle } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultConfig } from "connectkit";

const anvil = {
  id: 5000,
  name: "Anvil",
  network: "Anvil",
  nativeCurrency: {
    decimals: 18,
    name: "Mantle",
    symbol: "MNT",
  },
  rpcUrls: {
    public: { http: ["http://localhost:8545"] },
    default: { http: ["http://localhost:8545"] },
  },
} as const satisfies Chain;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [process.env.NODE_ENV === "development" ? anvil : mantle],
  [publicProvider()],
);

// Use the configured provider and chains to create a wagmi config
export const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,

    chains,
    publicClient,
    webSocketPublicClient,

    // Required
    appName: "DAM",

    // Optional TODO: change below details
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

export const chainId = process.env.NODE_ENV === "development" ? anvil.id : mantle.id;
