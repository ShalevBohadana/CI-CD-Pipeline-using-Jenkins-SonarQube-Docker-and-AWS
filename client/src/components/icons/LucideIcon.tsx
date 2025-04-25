import React from 'react';
import type { LucideIcon as LucideIconType } from 'lucide-react';

type LucideWrapperProps = {
  icon: LucideIconType;
  className?: string;
};

export const LucideIcon = ({ icon: Icon, className }: LucideWrapperProps) => {
  const IconComponent = Icon as React.ComponentType<{ className?: string }>;
  return <IconComponent className={className} />;
};
