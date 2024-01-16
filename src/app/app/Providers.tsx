"use client";

import React from "react";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { config } from "@/lib/wagmi";

interface IProps {
  children: React.ReactNode;
}

const Providers: React.FC<IProps> = ({ children }) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="auto" mode="light">
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default Providers;
