import { NextPage } from "next";
import type { Metadata } from "next";
import { columns, type ProjectType } from "./Columns";
import DataTable from "./DataTable";

export const metadata: Metadata = {
  title: "DAM | Automatic",
  description: "Distribution based on Auto-Metric until the end of the round.",
};

const mock_headerList = [
  { title: "Accumulated incentive", value: "420ETH" },
  { title: "Auto <> Comm Ratio", value: "40 : 60" },
  { title: "Total No. of projects", value: "99" },
  { title: "Total No. of projects", value: "99" },
];

const mock_data: ProjectType[] = [
  {
    id: "0",
    name: "Aave",
    category: "Defi",
    tvl: 700000000,
    txCount: 37393,
    mileToday: -0.17,
    mileAccumulated: 0.912345,
  },
  {
    id: "1",
    name: "Uniswap",
    category: "Defi",
    tvl: 222200000,
    txCount: 6666,
    mileToday: -0.8747,
    mileAccumulated: -0.55845,
  },
  {
    id: "2",
    name: "BendDAO",
    category: "NFT",
    tvl: 34000000,
    txCount: 12,
    mileToday: -0.007,
    mileAccumulated: -0.0599,
  },
  {
    id: "3",
    name: "Friend Tech",
    category: "Other",
    tvl: 840000,
    txCount: 0,
    mileToday: 0,
    mileAccumulated: 0.4554,
  },
  {
    id: "4",
    name: "DAM",
    category: "Infrastructure",
    tvl: 67000,
    txCount: 69,
    mileToday: 2.447,
    mileAccumulated: 1.4776,
  },
];

const AutomaticPage: NextPage = () => {
  return (
    <>
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
      <DataTable columns={columns} data={mock_data} />
    </>
  );
};

export default AutomaticPage;
