import React from "react";
import { cn } from "@/lib/shadcn";

interface IProps {
  className?: string;
}

const Spinner: React.FC<IProps> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        "inline-block h-4 w-4 animate-spin rounded-full border-md border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" />
    </div>
  );
};

export default Spinner;
