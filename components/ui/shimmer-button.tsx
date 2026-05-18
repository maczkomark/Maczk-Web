"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  background?: string;
  asChild?: boolean;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      background = "linear-gradient(110deg,#1e293b 45%,#3b82f6 55%,#1e293b 65%)",
      className,
      children,
      ...props
    },
    ref
  ) => (
    <Magnetic strength={20}>
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full px-8 text-sm font-medium text-white transition-transform active:scale-95",
          "before:absolute before:inset-0 before:rounded-full before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.4),transparent)] before:bg-[length:200%_100%] before:animate-shimmer",
          className
        )}
        style={{ background }}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    </Magnetic>
  )
);
ShimmerButton.displayName = "ShimmerButton";
