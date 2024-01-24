import type { UrlType } from "@/types";

type SiteConfig = {
  name: string;
  description: string;
  url: UrlType;
  // ogImage: string;
  // links: {
  //   instagram: string;
  // };
};

export const DAM_BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://"; // TODO: get domain

export const siteConfig: SiteConfig = {
  name: "DAM",
  description:
    "A grant program that channels Mantle's substantial treasury funds into various ecosystem initiatives and distributes the resulting yield stream as grants, starting with mantle LSD",
  url: DAM_BASE_URL,
  // TODO: set open graph image locally
  // ogImage: "/open-graph/pill.webp",
  // links: {
  //   instagram: "https://www.instagram.com/punkcube_/",
  // },
};
