import { loadable } from 'react-lazily/loadable';

import { LoadingCircle } from '../components/LoadingCircle';

/**
 * The `lazilyLoadable` function is a TypeScript React function that returns a loadable component with
 * a fallback loading circle.
 * @param importerFunc - A function that returns a Promise that resolves to an object of type T. This
 * function is responsible for importing the module or resource lazily.
 * @returns The `lazilyLoadable` function returns a loadable component.
 */
export const lazilyLoadable = <T extends object>(importerFunc: () => Promise<T>) => {
  return loadable(importerFunc, {
    fallback: <LoadingCircle />,
  });
};
