export type ErrorBoundaryResetHandler = (...args: any[]) => void;

export const handleErrorBoundaryReset: ErrorBoundaryResetHandler = () => {
  // Reset logic here
  console.log('Error boundary reset');
};
