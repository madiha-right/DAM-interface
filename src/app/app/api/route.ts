import Dam from "@/abis/Dam.json";
import { privateKeyToAccount } from "viem/accounts";
import { oracleWalletClient, publicClient } from "@/lib/viem";
import { fetchEndRoundData } from "@/actions/rounds";
import { CONTRACT_ADDRESSES } from "@/utils/constants";

export async function GET() {
  let tx;

  if (process.env.NODE_ENV === "development") {
    tx = await endRound();
  }

  return Response.json({ data: tx });
}

const endRound = async () => {
  try {
    const oracle = privateKeyToAccount(process.env.ORACLE_PRIVATE_KEY);
    const res = await fetchEndRoundData();

    if (!res) {
      throw new Error("failed to fetch end round data");
    }

    const { data, signature } = res;

    const { request } = await publicClient.simulateContract({
      account: oracle,
      address: CONTRACT_ADDRESSES.protocol.dam,
      abi: Dam.abi,
      functionName: "endRound",
      args: [data, signature.v, signature.r, signature.s],
    });

    const hash = await oracleWalletClient.writeContract(request);
    const tx = await publicClient.waitForTransactionReceipt({ hash });

    if (tx.status === "reverted") {
      throw new Error("Transaction reverted");
    }

    return {
      hash: tx.transactionHash,
      blockHash: tx.blockHash,
      blockNumber: tx.blockNumber.toString(),
    };
  } catch (error) {
    console.error(error);
  }
};
