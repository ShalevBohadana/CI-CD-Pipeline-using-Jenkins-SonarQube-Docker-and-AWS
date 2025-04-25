import React from 'react';
import PopupComponent from 'reactjs-popup';
import type { PopupProps } from 'reactjs-popup/dist/types';

type PopupWrapperProps = Omit<PopupProps, 'children' | 'trigger'> & {
  children: React.ReactNode;
  trigger: (open: boolean) => React.ReactElement;
  className?: string;
};

export const Popup = (props: PopupWrapperProps): JSX.Element => {
  const Component = PopupComponent as unknown as React.ComponentType<PopupWrapperProps>;
  return <Component {...props} />;
};
