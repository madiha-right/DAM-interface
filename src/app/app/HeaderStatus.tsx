import React from "react";
import { getCurrentRoundUpstream } from "@/actions/rounds";
import { IProtocolWithStat } from "@/actions/protocols";
import { getRound } from "@/actions/rounds";
import { formatTimestamp } from "@/utils/times";
import HeaderStatusList from "./HeaderStatusList";
import { StreamType } from "@/models/Protocol";

interface IProps {}

const HeaderStatus: React.FC<IProps> = async () => {
  const currentRoundUpstream = await getCurrentRoundUpstream();
  const round = await getRound(currentRoundUpstream?.id as number);
  const protocols = (round?.protocols as IProtocolWithStat[]) || [];
  const { autoStreamCount, communityStreamCount } = getProtocolsCount(protocols);
  const autoStreamRatio = (currentRoundUpstream?.autoStreamRatio as number) / 100;

  return (
    <header className={"mb-[19px] overflow-hidden rounded-xl border border-border"}>
      <h1 className="bg-gradient-to-b from-[#6AB6B1] via-[#6AB6B1]/90 via-35% to-[#c5e6e3]/90 py-[4px] pl-[18px] text-lg font-semibold text-background">
        {currentRoundUpstream
          ? `DAM Round #${currentRoundUpstream.id} - [ ${formatTimestamp(currentRoundUpstream?.startTime as bigint)} ~ ${formatTimestamp(currentRoundUpstream?.endTime as bigint)} ]`
          : "DAM Round Not Started"}
      </h1>
      <HeaderStatusList
        isRoundOngoing={!!round}
        autoStreamRatio={autoStreamRatio}
        autoStreamCount={autoStreamCount}
        communityStreamCount={communityStreamCount}
      />
    </header>
  );
};

export default HeaderStatus;

const getProtocolsCount = (protocols: IProtocolWithStat[]) => {
  let autoStreamCount = 0;
  let communityStreamCount = 0;

  for (const item of protocols) {
    switch (item.protocol.type) {
      case StreamType.Auto:
        autoStreamCount++;
        break;
      case StreamType.Community:
        communityStreamCount++;
        break;
      case StreamType.Both:
        autoStreamCount++;
        communityStreamCount++;
        break;
      default:
        console.error("Unknown StreamType: ", item.protocol.type);
    }
  }

  return { autoStreamCount, communityStreamCount };
};
