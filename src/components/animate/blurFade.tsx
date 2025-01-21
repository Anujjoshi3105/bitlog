"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import { useRef } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inViewMargin?: string;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-50px",
    once: true,
  });

  const defaultVariants: Variants = {
    hidden: {
      y: yOffset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      y: 0, // Changed from -yOffset to 0 for more natural animation
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={variant || defaultVariants}
        transition={{
          delay: Math.max(0.04 + delay, 0), // Ensure non-negative delay
          duration,
          ease: "easeOut",
        }}
        className={className}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
