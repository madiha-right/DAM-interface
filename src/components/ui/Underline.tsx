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
        "block transition-all duration-300 h-[2px] bg-mantle-teal",
        className,
      )}
    />
  );
};

export default Underline;
