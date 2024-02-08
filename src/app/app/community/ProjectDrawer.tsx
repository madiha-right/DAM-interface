import React from "react";
import type { IProtocol } from "@/models/Protocol";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { Separator } from "@/components/ui/Seperator";
import { IconClose, IconExpand, IconExternalLink } from "@/components/icons";
import SiteList from "./SiteList";

interface IProps {
  protocol: IProtocol;
  isAlreadyInCandidateList: boolean;
  isOpenCandidateList: boolean;
  handleClickAddToCandidateList: () => void;
}

const ProjectDrawer: React.FC<IProps> = (props) => {
  const { protocol, isAlreadyInCandidateList, isOpenCandidateList, handleClickAddToCandidateList } =
    props;

  return (
    <Drawer>
      <DrawerTrigger asChild className="absolute right-[10px] top-[10px]">
        <Button variant="ghost" className="h-auto p-[6px]">
          <IconExpand />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerClose asChild>
          <Button
            variant="ghost"
            className="absolute right-[19px] top-[14px] h-[30px] w-[30px] p-[4px]"
          >
            <IconClose />
          </Button>
        </DrawerClose>
        <div className="mx-auto w-full max-w-[496px] py-[24px]">
          <DrawerHeader className="relative">
            <DrawerTitle className="mb-[8px] flex items-center justify-between text-2xl">
              {protocol.name}
              <Badge className="rounded-full bg-foreground px-[13px] py-0 font-medium text-background">
                {protocol.categories[0]}
              </Badge>
            </DrawerTitle>
            <DrawerDescription className="mb-[15px] text-sm text-foreground">
              {protocol.title}
            </DrawerDescription>
            <SiteList sites={protocol.sites} />
          </DrawerHeader>
          <Separator className="my-[15px]" />
          <div className="mb-[24px] max-h-[514px] overflow-y-scroll pb-[20px]">
            <section className="mb-[20px]">
              <h3 className="mb-[8px] text-xl font-semibold">Description</h3>
              <p className="text-xs font-medium">{protocol.description}</p>
            </section>
            <section className="mb-[20px]">
              <h3 className="mb-[8px] text-xl font-semibold">Contribution</h3>
              <dl className="rounded-lg border border-border px-[20px] py-[8px]">
                {protocol.contributions?.map((contribution, index) => (
                  <div
                    key={index}
                    className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0"
                  >
                    <dt>{contribution.title}</dt>
                    <dd className="flex items-center">
                      <span>{contribution.value}</span>
                      <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                        <a href={contribution.url} target="_blank">
                          <IconExternalLink />
                        </a>
                      </Button>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
            <section>
              <h3 className="mb-[8px] text-xl font-semibold">Metrics / Links</h3>
              <dl className="rounded-lg border border-border px-[20px] py-[8px]">
                {protocol.metrics?.map((metric, index) => (
                  <div
                    key={index}
                    className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0"
                  >
                    <dt>{metric.title}</dt>
                    <dd className="flex items-center">
                      <span>{metric.value}</span>
                      <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                        <a href={metric.url} target="_blank">
                          <IconExternalLink />
                        </a>
                      </Button>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
          <DrawerFooter className="relative w-full">
            <div className="absolute left-0 top-0 h-[36px] w-full -translate-y-full backdrop-blur-sm" />
            {!isOpenCandidateList && (
              <Button
                type="button"
                className="h-[41px] w-full bg-mantle-teal hover:bg-mantle-pale"
                disabled={isAlreadyInCandidateList}
                onClick={handleClickAddToCandidateList}
              >
                Add to Candidate List
              </Button>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectDrawer;
