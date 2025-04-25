import React, { ReactNode } from 'react';
import { motion as framerMotion, AnimatePresence as FramerAnimatePresence } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface MotionDivProps extends HTMLMotionProps<'div'> {
  children?: ReactNode;
  className?: string;
  layout?: boolean;
}

export const motion = {
  div: ({ children, ...props }: MotionDivProps) => (
    <framerMotion.div {...props}>{children}</framerMotion.div>
  ),
};

export { FramerAnimatePresence as AnimatePresence };
