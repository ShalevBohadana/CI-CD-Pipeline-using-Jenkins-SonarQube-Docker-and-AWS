import { ReactElement, ReactNode } from 'react';

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
  }
}
