import React from "react";
import { cn } from "@/lib/shadcn";

interface IProps {
  className?: string;
  hasShown: boolean;
}

const Underline: React.FC<IProps> = ({ className, hasShown }) => {
  return (
    <span
      className={cn(
        hasShown ? "max-w-full" : "max-w-0",
        "block h-[2px] bg-mantle-teal transition-all duration-300",
        className,
      )}
    />
  );
};

export default Underline;
