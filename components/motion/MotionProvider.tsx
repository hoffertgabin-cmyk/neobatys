"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Charge uniquement les fonctionnalités d'animation utilisées (bundle allégé)
 * et respecte automatiquement « prefers-reduced-motion ».
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
