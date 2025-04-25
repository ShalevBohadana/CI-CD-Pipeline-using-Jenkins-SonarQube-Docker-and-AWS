import { forwardRef } from 'react';

// Define our own SVG icon component type
export interface SVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  color?: string;
}

// Define the icon component type that we'll use
export type IconComponent = React.ForwardRefExoticComponent<
  SVGProps & React.RefAttributes<SVGSVGElement>
>;

// Icon props for our wrapper
export interface IconProps extends Omit<SVGProps, 'ref'> {
  icon: IconComponent;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, ...props }, ref) => {
    return <IconComponent ref={ref} {...props} />;
  }
);

Icon.displayName = 'Icon';
