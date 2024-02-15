"use client";

import React from "react";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { Provider as JotaiProvider } from "jotai";
import { QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import { queryClient } from "@/lib/react-query";

interface IProps {
  children: React.ReactNode;
}

const Providers: React.FC<IProps> = ({ children }) => {
  return (
    <JotaiProvider>
      <WagmiConfig config={config}>
        <ConnectKitProvider theme="auto" mode="light">
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </JotaiProvider>
  );
};

export default Providers;
