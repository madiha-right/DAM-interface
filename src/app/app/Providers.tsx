"use client";

import React from "react";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { config } from "@/lib/wagmi";
import { Provider as JotaiProvider } from "jotai";

interface IProps {
  children: React.ReactNode;
}

const Providers: React.FC<IProps> = ({ children }) => {
  return (
    <JotaiProvider>
      <WagmiConfig config={config}>
        <ConnectKitProvider theme="auto" mode="light">
          {children}
        </ConnectKitProvider>
      </WagmiConfig>
    </JotaiProvider>
  );
};

export default Providers;
