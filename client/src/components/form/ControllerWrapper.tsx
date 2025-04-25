import React from 'react';
import {
  Controller as RHFController,
  type ControllerProps,
  type FieldValues,
} from 'react-hook-form';

type ControllerWrapperProps<T extends FieldValues> = Omit<ControllerProps<T>, 'render'> & {
  render: (props: Parameters<ControllerProps<T>['render']>[0]) => JSX.Element;
};

export const Controller = <T extends FieldValues>(props: ControllerWrapperProps<T>) => {
  const Component = RHFController as unknown as React.ComponentType<typeof props>;
  return <Component {...props} />;
};
