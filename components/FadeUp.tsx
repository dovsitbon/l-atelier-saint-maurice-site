"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Entrée douce du texte du hero (Framer Motion), après l'ouverture. Rien si l'utilisateur réduit les animations. */
export function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
