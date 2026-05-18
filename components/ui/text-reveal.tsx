"use client";
import { motion, Variants } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};
const child: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 14, stiffness: 100 } },
};

export function TextReveal({ text, className, as: Tag = "h1" }: { text: string; className?: string; as?: any }) {
  const words = text.split(" ");
  return (
    <Tag className={cn(className)}>
      <motion.span variants={container} initial="hidden" animate="visible" className="inline-block">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom mr-2">
            <motion.span variants={child} className="inline-block">
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
