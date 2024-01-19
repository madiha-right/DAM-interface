import React from "react";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight } from "@/components/icons";

interface IProps {
  twitterLink: string;
  websiteLink: string;
}

const SiteList: React.FC<IProps> = (props) => {
  const { twitterLink, websiteLink } = props;

  return (
    <ul className="flex gap-[6px]">
      <li>
        <Button
          variant="outline"
          asChild
          className="h-[22px] gap-1 rounded-full border border-border px-[10px] py-[1px] text-xs"
        >
          <a href={twitterLink} target="_blank">
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
          <a href={websiteLink} target="_blank">
            Website
            <IconArrowUpRight />
          </a>
        </Button>
      </li>
    </ul>
  );
};

export default SiteList;
