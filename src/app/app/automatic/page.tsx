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
    tvlGrowth: 10,
  },
  {
    id: "1",
    name: "Uniswap",
    category: "Defi",
    tvl: 222200000,
    tvlGrowth: 0.01,
  },
  {
    id: "2",
    name: "BendDAO",
    category: "NFT",
    tvl: 34000000,
    tvlGrowth: -12,
  },
  {
    id: "3",
    name: "Friend Tech",
    category: "Other",
    tvl: 840000,
    tvlGrowth: -1.22,
  },
  {
    id: "4",
    name: "DAM",
    category: "Infrastructure",
    tvl: 67000,
    tvlGrowth: 1230,
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
