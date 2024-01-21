import React from "react";

const mock_headerList = [
  { title: "Accumulated incentive", value: "420ETH" },
  { title: "Total No. of projects", value: "99" },
  { title: "Auto <> Comm Ratio", value: "40 : 60" },
  { title: "Link", value: "https://blahbalh" },
];

interface IProps {}

// TODO: mock to real data, heading to real time and round
const HeaderStatus: React.FC<IProps> = () => {
  return (
    <header className={"mb-[19px] overflow-hidden rounded-xl border border-border"}>
      <h1 className="bg-gradient-to-b from-[#6AB6B1] via-[#6AB6B1]/90 via-35% to-[#c5e6e3]/90 py-[4px] pl-[18px] text-lg font-semibold text-background">
        DAM Round #2 - [ 1/1 ~ 2/1 ]
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
