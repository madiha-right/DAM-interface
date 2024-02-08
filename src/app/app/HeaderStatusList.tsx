"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useReadRoundIncentive } from "@/hooks/useReadRoundIncentive";
import { ROUTES } from "@/utils/routes";
import { Skeleton } from "@/components/ui/Skeleton";

interface IProps {
  isRoundOngoing: boolean;
  autoStreamRatio: number;
  autoStreamCount: number;
  communityStreamCount: number;
}

const HeaderStatusList: React.FC<IProps> = (props) => {
  const { isRoundOngoing, autoStreamRatio, autoStreamCount, communityStreamCount } = props;
  const pathname = usePathname();
  const roundIncentive = useReadRoundIncentive();

  const list = [
    {
      title: "Accumulated incentive",
      value: isRoundOngoing ? `${roundIncentive.accmulatedIncentive}ETH` : "-",
    },
    {
      title: "Total No. of projects",
      value: pathname === ROUTES.app.automatic ? autoStreamCount : communityStreamCount,
    },
    {
      title: "Auto <> Comm Ratio",
      value: isRoundOngoing ? `${autoStreamRatio} : ${100 - autoStreamRatio}` : "-",
    },
    { title: "Link", value: "https://blahbalh" },
  ];

  return (
    <dl className="flex px-[20px] py-[15px]">
      {list.map((item, index) => (
        <div key={index} className="relative flex-1 pl-[10px]">
          <dt className="mb-[7px] text-xs font-medium after:absolute after:left-0 after:top-[2px] after:inline-block after:h-[11px] after:w-[1px] after:bg-mantle-teal">
            {item.title}
          </dt>
          <dd className="text-xl font-semibold">
            {index === 0 && roundIncentive.isLoading ? <Skeleton /> : item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default HeaderStatusList;
