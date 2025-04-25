import React from 'react';
import { Helmet as HelmetBase } from 'react-helmet';
import type { HelmetProps } from 'react-helmet';

type HelmetWrapperProps = Omit<HelmetProps, 'children'> & {
  children: React.ReactNode[];
};

const HelmetComponent = HelmetBase as unknown as React.ComponentType<HelmetWrapperProps>;

export { HelmetComponent as Helmet };
