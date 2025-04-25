import React from 'react';
import { ErrorBoundary as RawErrorBoundary } from 'react-error-boundary';

const Root = RawErrorBoundary as unknown as React.JSXElementConstructor<any>;

export const ErrorBoundary = { Root };
