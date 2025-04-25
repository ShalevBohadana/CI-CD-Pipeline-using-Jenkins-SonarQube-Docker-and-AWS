import {
  createContext,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

// Define the context type
type DashboardContextType = {
  isInDashboardPage: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
};

// Create the context
export const DashboardContext = createContext<DashboardContextType>({
  isInDashboardPage: false,
  isModalOpen: false,
  setIsModalOpen: () => {},
});

// Create a provider component
export const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [isInDashboardPage] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Memoize the context value object
  const dashboardContextValue = useMemo(
    () => ({
      isInDashboardPage,
      isModalOpen,
      setIsModalOpen,
    }),
    [isInDashboardPage, isModalOpen]
  );

  return (
    <DashboardContext.Provider value={dashboardContextValue}>{children}</DashboardContext.Provider>
  );
};

// Create a custom hook for consuming the context
export const useDashboardPageStatus = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardPageStatus must be used within a DashboardProvider');
  }
  return context;
};
