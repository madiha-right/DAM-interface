import type { UrlType } from "@/types";

type SiteConfig = {
  name: string;
  description: string;
  url: UrlType;
  ogImage: string;
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
  ogImage: "https://cdn.punkcube.xyz/open-graph/dam.webp",
  // links: {
  //   instagram: "https://www.instagram.com/punkcube_/",
  // },
};

const DAM_SUBGRAPH_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://subgraph-api.mantle.xyz";
export const DAM_SUBGRAPH_URL = `${DAM_SUBGRAPH_BASE_URL}/subgraphs/name/test`;

export const MANTLE_JOURNEY_BASE_URL = "https://mdi-quests-api-production.up.railway.app";
