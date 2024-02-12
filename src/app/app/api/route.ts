import Dam from "@/abis/Dam.json";
import { privateKeyToAccount } from "viem/accounts";
import { oracleWalletClient, publicClient } from "@/lib/viem";
import dbConnect from "@/lib/dbConnect";
import Protocol from "@/models/Protocol";
import { fetchEndRoundData, startRound } from "@/actions/rounds";
import { CONTRACT_ADDRESSES } from "@/utils/constants";
import ProtocolsList from "./protocols.json";

// End round
export async function GET() {
  let tx;

  if (process.env.NODE_ENV === "development") {
    tx = await endRound();
  }

  return Response.json({ data: tx });
}

// add projects to DB
export async function POST() {
  try {
    await dbConnect();

    const protocols = await Protocol.insertMany(ProtocolsList, { ordered: true });

    // NOTE: use below code to add protocols to the current round
    // const currentRoundUpstream = await getCurrentRoundUpstream();

    // if (!currentRoundUpstream) {
    //   throw new Error("failed to fetch current round upstream");
    // }

    // const protocolIds = protocols.map((protocol) => protocol._id);

    // console.log(currentRoundUpstream.id);

    // const round = await Round.findOneAndUpdate(
    //   { round: currentRoundUpstream.id },
    //   { $push: { protocols: protocolIds } },
    //   { new: true },
    // );

    // if (!round) {
    //   throw new Error("failed to update round");
    // }

    return Response.json({ data: protocols });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
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

    await startRound();

    return {
      hash: tx.transactionHash,
      blockHash: tx.blockHash,
      blockNumber: tx.blockNumber.toString(),
    };
  } catch (error) {
    console.error(error);
  }
};
