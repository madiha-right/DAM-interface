"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/shadcn";
import { ROUTES } from "@/utils/routes";
import { DamLogo } from "@/components/icons";
import Underline from "@/components/ui/Underline";
import ConnectButton from "@/components/ConnectButton";

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
                  <Link href={route.href} className="inline-block w-full">
                    {route.name}
                  </Link>
                  <Underline
                    className={cn(
                      pathname === route.href ? "max-w-[89px]" : "max-w-0",
                      "absolute -bottom-[19px] left-[10px] w-full",
                    )}
                    hasShown={pathname === route.href}
                  />
                </li>
              );
            })}
          </ul>
          {/* <ConnectKitButton showAvatar={false} /> */}
          <div className="flex min-w-[150px] justify-end">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNav;
