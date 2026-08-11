"use client";

import { motion } from "framer-motion";

export default function AnimatedCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        shadow-lg
        hover:shadow-cyan-500/10
        transition-all
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}