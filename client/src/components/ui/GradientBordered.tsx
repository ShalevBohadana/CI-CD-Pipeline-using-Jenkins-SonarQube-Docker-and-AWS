import { ReactNode } from 'react';

import { twMergeClsx } from '../../utils/twMergeClsx';

type GradientBorderedProps = {
  children: ReactNode;
  className: string;
};

/**
 * The `GradientBordered` component is a React component that wraps its children with a div and applies
 * a gradient-bordered style to it.
 * @param {GradientBorderedProps}  - 1. `ReactNode`: This is a type from the React library that
 * represents any valid React node, such as JSX elements, strings, or numbers. It is used to define the
 * type of the `children` prop, which can accept any valid React node.
 * @returns The `GradientBordered` component is returning a `div` element with the provided `className`
 * and `children` as its content. The `className` is being passed to the `cn` function from the `utils`
 * module to generate a combined class name. The `cn` function is likely used to concatenate multiple
 * class names together.
 */

export const GradientBordered = ({ className, children }: GradientBorderedProps) => {
  return (
    <div
      className={twMergeClsx(
        `relative w-full h-full isolate overflow-hidden gradient-bordered before:pointer-events-none before:p-px ${className}`
      )}
    >
      {children}
    </div>
  );
};
