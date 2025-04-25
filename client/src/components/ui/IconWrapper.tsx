import React, { forwardRef } from 'react';
import type { IconType } from 'react-icons';

interface IconWrapperProps {
  icon: IconType;
  className?: string;
}

export const IconWrapper = forwardRef<HTMLDivElement, IconWrapperProps>(
  ({ icon: Icon, className, ...props }, ref) => {
    return (
      <div ref={ref}>
        <Icon className={className} {...props} />
      </div>
    );
  }
);

IconWrapper.displayName = 'IconWrapper';
