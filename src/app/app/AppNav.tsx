"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/shadcn";
import { ROUTES } from "@/utils/routes";
import { useCandidates, useToggleCandidateList } from "@/hooks/global/useCandidates";
import { DamLogo, IconArrowLeft } from "@/components/icons";
import Underline from "@/components/ui/Underline";
import ConnectButton from "@/components/ConnectButton";
import { Button } from "@/components/ui/Button";

const routeList = [
  {
    name: "Automatic",
    href: ROUTES.app.automatic,
  },
  {
    name: "Community",
    href: ROUTES.app.community,
  },
];

const AppNav: React.FC = () => {
  const pathname = usePathname();
  const [candidates] = useCandidates();
  const [isOpenCandidateList, toggleCandidateList] = useToggleCandidateList();

  return (
    <nav className="sticky top-0 z-10 h-[63px] border-b border-border bg-background">
      <div className="h-full px-[30px]">
        <div className="container flex h-full items-center justify-between">
          <Link href={ROUTES.app.automatic}>
            <DamLogo />
          </Link>
          <ul className="flex items-center">
            {routeList.map((route, index) => {
              return (
                <li
                  key={index}
                  className={cn(
                    pathname === route.href ? "text-mantle-teal" : "text-mantle-mint",
                    "relative mr-[2px] w-[107px] text-center transition-colors duration-200 last:mr-0",
                  )}
                >
                  <Link href={route.href} className="inline-block w-full py-[6px]">
                    {route.name}
                  </Link>
                  <Underline
                    className={cn(
                      pathname === route.href ? "max-w-[89px]" : "max-w-0",
                      "absolute -bottom-[13px] left-[10px] w-full",
                    )}
                    hasShown={pathname === route.href}
                  />
                </li>
              );
            })}
          </ul>
          <ul className="relative">
            {candidates.length > 0 && (
              <li className="absolute -left-[18px] top-0 h-[28px] -translate-x-full items-center bg-background">
                <Button
                  type="button"
                  variant="outline"
                  className="h-full items-center gap-[6px] rounded-full border-sm border-mantle-teal/50 px-[10px] py-0"
                  onClick={toggleCandidateList}
                >
                  {isOpenCandidateList ? (
                    <>
                      <IconArrowLeft />
                      <span className="text-sm leading-[14px] text-mantle-teal">Back to list</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm leading-[14px] text-mantle-teal">Candidate</span>
                      <span className="flex h-[16px] items-center justify-center rounded-full bg-mantle-teal px-[6px] text-center text-xs leading-[12px] text-background">
                        {candidates.length}
                      </span>
                    </>
                  )}
                </Button>
              </li>
            )}
            <li className="flex min-w-[150px] justify-end">
              <ConnectButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppNav;
