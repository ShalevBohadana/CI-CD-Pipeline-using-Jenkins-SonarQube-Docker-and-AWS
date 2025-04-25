import debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef } from 'react';

export const useDebounce = (callback: () => void, delay = 500) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const debouncedFunc = () => {
      callbackRef.current?.();
    };

    return debounce(debouncedFunc, delay);
  }, [delay]);

  return debouncedCallback;
};
