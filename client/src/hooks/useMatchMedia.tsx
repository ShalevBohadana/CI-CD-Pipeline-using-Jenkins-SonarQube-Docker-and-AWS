import { useEffect, useState } from 'react';

export const LARGE_SCREEN = '(min-width: 64rem)';
export const DESKTOP_SCREEN = '(min-width: 80rem)';
/**
 * @param {string} mediaQueryStr - The `mediaQueryStr` parameter is a string that represents a CSS
 * media query "(min-width: 75rem)". It specifies the conditions under which the function should return `true` or `false`.
 * @returns The function `useMatchMedia` returns a boolean value indicating whether the current window
 * matches the specified media query string.
 */
export const useMatchMedia = (mediaQueryStr: string) => {
  const [isCorrect, setIsCorrect] = useState<boolean>(window.matchMedia(mediaQueryStr).matches);

  useEffect(() => {
    const result = () => setIsCorrect(window.matchMedia(mediaQueryStr).matches);
    window.addEventListener('resize', result);
    return () => window.removeEventListener('resize', result);
  }, [mediaQueryStr]);

  return isCorrect;
};
