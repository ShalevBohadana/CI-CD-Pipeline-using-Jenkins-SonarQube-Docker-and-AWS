import React from 'react';
import ReactQuillBase from 'react-quill';
import type { ReactQuillProps } from 'react-quill';

export const ReactQuill = (props: ReactQuillProps): JSX.Element => {
  const Component = ReactQuillBase as unknown as React.ComponentType<ReactQuillProps>;
  return <Component {...props} />;
};
