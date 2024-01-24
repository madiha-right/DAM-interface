import { Address, useContractRead, useSignTypedData } from "wagmi";
import { mantleTestnet } from "wagmi/chains";
import MockYbToken from "@/abis/MockYbToken.json";

type ArgsType = {
  owner: Address;
  spender: Address;
  token: Address;
  amount: bigint;
  deadline: bigint;
};

const types = {
  Permit: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ],
} as const;

export const usePermit = (args: ArgsType) => {
  const { owner, spender, token, amount, deadline } = args;

  const readNonce = useContractRead({
    address: token,
    abi: MockYbToken.abi,
    functionName: "nonces",
    args: [owner],
    enabled: !!owner,
  });

  const domain = {
    name: "Mock Yield-bearing token",
    version: "1",
    chainId: mantleTestnet.id,
    verifyingContract: token,
  };

  const message = {
    owner,
    spender,
    value: amount,
    nonce: readNonce.data as bigint,
    deadline,
  };

  const signTypedData = useSignTypedData({
    domain,
    message,
    types,
    primaryType: "Permit",
  });

  return {
    isLoading: signTypedData.isLoading,
    isSuccess: signTypedData.isSuccess,
    data: signTypedData.data,
    write: signTypedData.signTypedDataAsync,
  };
};
