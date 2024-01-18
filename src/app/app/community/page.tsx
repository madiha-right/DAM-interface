import { NextPage } from "next";
import type { Metadata } from "next";
import { DAM_BASE_URL } from "@/utils/site";
import type { ProtocolDataType } from "@/app/app/automatic/types";
import DataTable from "@/app/app/DataTable";
import { columns } from "./Columns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card" // prettier-ignore
import { Separator } from "@/components/ui/Seperator";
import { Button } from "@/components/ui/Button";
import ArrowUpRight from "@/components/icons/ArrowUpRight";

export const metadata: Metadata = {
  title: "DAM | Community",
  description: "Distribution based on community gauge-voting until the end of round.", // TODO:
};

// TODO: change api for voting
async function getProtocols(): Promise<ProtocolDataType[]> {
  const res = await fetch(DAM_BASE_URL + "/app/automatic/api");
  const { data } = await res.json();

  return data;
}

// TODO: Drawer for more info
const CommunityPage: NextPage = async () => {
  const protocols = await getProtocols();

  return (
    <div className="flex items-start gap-[16px]">
      <section className="w-full max-w-[662px]">
        <DataTable columns={columns} data={protocols} hasFixedHeight />
      </section>
      <section className="w-full max-w-[436px] pt-[45px]">
        <Card className="rounded-lg border border-border px-[20px] pb-[21px] pt-[23px]">
          <CardHeader>
            <CardTitle className="mb-[5px] text-xl font-semibold leading-[28px]">
              Project Name
            </CardTitle>
            <CardDescription className="mb-[14px] leading-[24px] text-foreground">
              One liner of the project
            </CardDescription>
            <ul className="flex gap-[6px]">
              <li>
                <Button
                  variant="outline"
                  asChild
                  className="h-[22px] gap-1 rounded-full border border-border px-[6px] py-[1px] text-xs"
                >
                  <a href="https://x.com" target="_blank">
                    Twitter
                    <ArrowUpRight />
                  </a>
                </Button>
              </li>
              <li>
                <Button
                  variant="outline"
                  asChild
                  className="h-[22px] gap-1 rounded-full border border-border px-[6px] py-[1px] text-xs"
                >
                  <a href="https://x.com" target="_blank">
                    Website
                    <ArrowUpRight />
                  </a>
                </Button>
              </li>
            </ul>
          </CardHeader>
          <Separator className="my-[15px]" />
          <CardContent className="mb-[21px]">
            <h4 className="mb-[14px] text-lg font-semibold">Description</h4>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi fugit libero dicta
              pariatur exercitationem unde ab laboriosam! Necessitatibus suscipit, a quidem dolores
              harum sit assumenda illo vitae ut minima impedit, corporis, placeat officiis officia?
              Quae ab dolor a nisi, maiores aut eius soluta corporis eveniet quod neque dolores
              recusandae expedita dolorem incidunt iste explicabo facere impedit perferendis
              possimus deleniti. Enim.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="h-[41px] w-full bg-mantle-teal transition-colors duration-200 hover:bg-mantle-pale">
              Add to Candidate List
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default CommunityPage;
