import { useEffect, useState } from 'react';

export const useRememberThisDevice = () => {
  const REMEMBER_DEVICE = 'rememberDevice';
  const storedValue = localStorage.getItem(REMEMBER_DEVICE);
  const initialValue = storedValue ? !!JSON.parse(storedValue) : true;
  const [shouldRememberDevice, setShouldRememberDevice] = useState<boolean>(initialValue);

  useEffect(() => {
    localStorage.setItem(REMEMBER_DEVICE, JSON.stringify(shouldRememberDevice));
  }, [shouldRememberDevice]);

  return {
    shouldRememberDevice,
    setShouldRememberDevice,
  };
};
