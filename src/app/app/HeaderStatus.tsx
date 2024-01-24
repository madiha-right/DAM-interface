"use client";

import React from "react";
import { useIsMounted } from "connectkit";
import { useReadRound } from "@/hooks/useReadRound";
import { formatTimestamp } from "@/utils/times";
import { Skeleton } from "@/components/ui/Skeleton";

const mock_headerList = [
  { title: "Accumulated incentive", value: "420ETH" },
  { title: "Total No. of projects", value: "99" },
  { title: "Auto <> Comm Ratio", value: "40 : 60" },
  { title: "Link", value: "https://blahbalh" },
];

interface IProps {}

// TODO: mock to real data -> server side with api call
const HeaderStatus: React.FC<IProps> = () => {
  const round = useReadRound();
  const isMounted = useIsMounted();

  return (
    <header className={"mb-[19px] overflow-hidden rounded-xl border border-border"}>
      <h1 className="bg-gradient-to-b from-[#6AB6B1] via-[#6AB6B1]/90 via-35% to-[#c5e6e3]/90 py-[4px] pl-[18px] text-lg font-semibold text-background">
        {isMounted ? (
          `DAM Round #${round.id} - [ ${formatTimestamp(round.startTime as bigint)} ~ ${formatTimestamp(round.endTime as bigint)} ]`
        ) : (
          <Skeleton className="h-[27px] w-[300px]" />
        )}
      </h1>
      <dl className="flex px-[20px] py-[15px]">
        {mock_headerList.map((item, index) => (
          <div key={index} className="relative flex-1 pl-[10px]">
            <dt className="mb-[7px] text-xs font-medium after:absolute after:left-0 after:top-[2px] after:inline-block after:h-[11px] after:w-[1px] after:bg-mantle-teal">
              {item.title}
            </dt>
            <dd className="text-xl font-semibold">{item.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
};

export default HeaderStatus;
