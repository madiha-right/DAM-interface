import React from "react";
import { getCurrentRound } from "@/actions/rounds";
import { getProtocolsAuto } from "@/actions/protocols";
import { formatTimestamp } from "@/utils/times";
import HeaderStatusList from "./HeaderStatusList";

interface IProps {}

const HeaderStatus: React.FC<IProps> = async () => {
  const round = await getCurrentRound();
  const protocols = await getProtocolsAuto(); // TODO: there could be some projects that are only listed in the community stream
  const autoStreamRatio = (round?.autoStreamRatio as number) / 100;

  return (
    <header className={"mb-[19px] overflow-hidden rounded-xl border border-border"}>
      <h1 className="bg-gradient-to-b from-[#6AB6B1] via-[#6AB6B1]/90 via-35% to-[#c5e6e3]/90 py-[4px] pl-[18px] text-lg font-semibold text-background">
        {round
          ? `DAM Round #${round.id} - [ ${formatTimestamp(round.startTime as bigint)} ~ ${formatTimestamp(round.endTime as bigint)} ]`
          : "DAM Round Not Started"}
      </h1>
      <HeaderStatusList
        isRoundOngoing={!!round}
        autoStreamRatio={autoStreamRatio}
        projectsNum={protocols.length}
      />
    </header>
  );
};

export default HeaderStatus;
