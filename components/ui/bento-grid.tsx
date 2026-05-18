import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div className={cn("grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
    {children}
  </div>
);

export const BentoGridItem = ({
  className, title, description, header, icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div
    className={cn(
      "row-span-1 rounded-2xl group/bento hover:shadow-2xl hover:shadow-blue-500/[0.08] transition-all duration-300 p-5 bg-neutral-900/60 border border-white/[0.08] hover:border-white/[0.18] backdrop-blur-sm flex flex-col space-y-4 overflow-hidden",
      className
    )}
  >
    {header}
    <div className="group-hover/bento:translate-x-1 transition duration-300">
      <div className="text-neutral-300 mb-2">{icon}</div>
      <div className="font-display text-lg font-bold text-white mb-1">{title}</div>
      <div className="font-sans text-sm text-neutral-400">{description}</div>
    </div>
  </div>
);
