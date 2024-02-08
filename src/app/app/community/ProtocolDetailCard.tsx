import React from "react";
import { cn } from "@/lib/shadcn";
import { IProtocol } from "@/models/Protocol";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card" // prettier-ignore
import { Separator } from "@/components/ui/Seperator";
import { Button } from "@/components/ui/Button";
import ProjectDrawer from "./ProjectDrawer";
import SiteList from "./SiteList";

interface IProps {
  protocol?: IProtocol;
  isAlreadyInCandidateList: boolean;
  isOpenCandidateList: boolean;
  handleClickAddToCandidateList: () => void;
}

const ProtocolDetailCard: React.FC<IProps> = (props) => {
  const { protocol, isAlreadyInCandidateList, isOpenCandidateList, handleClickAddToCandidateList } =
    props;

  if (!protocol) {
    return (
      <div className="relative flex h-[400px] items-center justify-center rounded-lg border border-border px-[20px] pb-[21px] pt-[23px]">
        <p>Click the project you want to view details on</p>
      </div>
    );
  }

  return (
    <Card className="relative rounded-lg border border-border px-[20px] pb-[21px] pt-[23px]">
      <ProjectDrawer
        protocol={protocol}
        isAlreadyInCandidateList={isAlreadyInCandidateList}
        isOpenCandidateList={isOpenCandidateList}
        handleClickAddToCandidateList={handleClickAddToCandidateList}
      />
      <CardHeader>
        <CardTitle className="mb-[5px] text-xl font-semibold leading-[28px]">
          {protocol.name}
        </CardTitle>
        <CardDescription className="mb-[14px] leading-[24px] text-foreground">
          {protocol.title}
        </CardDescription>
        <SiteList sites={protocol.sites} />
      </CardHeader>
      <Separator className="my-[15px]" />
      <CardContent className={cn(!isOpenCandidateList && "mb-[21px]")}>
        <h4 className="mb-[14px] text-lg font-semibold">Description</h4>
        <p className="text-sm">{protocol.description}</p>
      </CardContent>
      {!isOpenCandidateList && (
        <CardFooter>
          <Button
            className="h-[41px] w-full bg-mantle-teal transition-colors duration-200 hover:bg-mantle-pale"
            disabled={isAlreadyInCandidateList}
            onClick={handleClickAddToCandidateList}
          >
            Add to Candidate List
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProtocolDetailCard;
