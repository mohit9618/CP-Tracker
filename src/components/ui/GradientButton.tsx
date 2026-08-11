"use client";

import { motion } from "framer-motion";

export default function GradientButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={onClick}
      className="
        px-5
        py-2
        rounded-xl
        bg-gradient-to-r
        from-cyan-500
        to-blue-600
        font-medium
      "
    >
      {children}
    </motion.button>
  );
}