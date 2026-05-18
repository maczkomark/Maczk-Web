"use client";
import { cn } from "@/lib/utils";

export function GridBg({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]",
        className
      )}
    />
  );
}

export function DotsBg({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]",
        className
      )}
    />
  );
}
