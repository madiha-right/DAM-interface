"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/shadcn";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-900/20 dark:bg-slate-50/20">
      <SliderPrimitive.Range className="absolute h-full bg-mantle-teal dark:bg-slate-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border border-mantle-teal/50 border-slate-200 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mantle-teal disabled:pointer-events-none disabled:opacity-50 dark:border-slate-50/50 dark:border-slate-800 dark:bg-slate-950 dark:focus-visible:ring-slate-300" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
