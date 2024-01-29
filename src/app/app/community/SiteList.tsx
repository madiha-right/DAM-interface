import React from "react";
import { UrlType } from "@/types";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight } from "@/components/icons";

interface IProps {
  sites: { twitter: UrlType; website: UrlType };
}

const SiteList: React.FC<IProps> = ({ sites }) => {
  return (
    <ul className="flex gap-[6px]">
      <li>
        <Button
          variant="outline"
          asChild
          className="h-[22px] gap-1 rounded-full border border-border px-[10px] py-[1px] text-xs"
        >
          <a href={sites.twitter} target="_blank">
            Twitter
            <IconArrowUpRight />
          </a>
        </Button>
      </li>
      <li>
        <Button
          variant="outline"
          asChild
          className="h-[22px] gap-1 rounded-full border border-border px-[10px] py-[1px] text-xs"
        >
          <a href={sites.website} target="_blank">
            Website
            <IconArrowUpRight />
          </a>
        </Button>
      </li>
    </ul>
  );
};

export default SiteList;
