import { useState } from 'react';

/**
 * The `useModalState` function is a custom hook in TypeScript React that manages the state of a modal
 * component, providing functions to open, close, and toggle the modal.
 * @param [initialStatus=false] - The initialStatus parameter is an optional parameter that determines
 * the initial state of the modal. It defaults to false if no value is provided.
 * @returns The `useModalState` function returns an object with four properties: `status`, `opener`,
 * `closer`, and `toggler`.
 */
export const useModalState = (initialStatus = false) => {
  const [status, setStatus] = useState(initialStatus);

  const opener = () => setStatus(true);
  const closer = () => setStatus(false);
  const toggler = () => setStatus((prev) => !prev);

  return {
    status,
    opener,
    closer,
    toggler,
  };
};
