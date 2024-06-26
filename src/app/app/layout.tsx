import React from "react";
import { cn } from "@/lib/shadcn";
import { poppins } from "@/utils/fonts";
import Providers from "@/app/app/Providers";
import AppNav from "@/app/app/AppNav";
import { Toaster } from "@/components/ui/Toaster";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <Providers>
      <AppNav />
      <div className="px-[30px] pb-[43px] pt-[21px]">
        <main className={cn(poppins.className, "container")}>{children}</main>
      </div>
      <Toaster />
    </Providers>
  );
};

export default Layout;
