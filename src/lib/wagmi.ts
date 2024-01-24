import { createConfig, configureChains } from "wagmi";
import { mantle, mantleTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultConfig } from "connectkit";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mantle, mantleTestnet],
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
