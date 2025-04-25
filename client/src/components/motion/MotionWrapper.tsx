import React from 'react';
import { motion as framerMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

type MotionProps = {
  [K in keyof typeof framerMotion]: React.ComponentType<
    HTMLMotionProps<any> & {
      children?: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
    }
  >;
};

export const motion = Object.entries(framerMotion).reduce((acc, [key, Component]) => {
  acc[key] = Component as React.ComponentType<any>;
  return acc;
}, {} as MotionProps);
