"use client";
import { motion } from "framer-motion";
import type { JSX, ReactNode } from "react";

type MotionOpacityProps = {
  children?: ReactNode;
  fadeDuration?: number;
  className?: string;
  onClick?: () => void;
};

export const MotionOpacity = ({
  children,
  fadeDuration = 0.3,
  className,
  onClick
}: MotionOpacityProps): JSX.Element => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: fadeDuration, ease: "easeInOut" }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
