"use client";

import React from "react";
import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/Button";

const ConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <Button
            onClick={show}
            variant="outline"
            className="h-[28px] rounded-full border-foreground/50 font-normal text-foreground"
          >
            {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectButton;
