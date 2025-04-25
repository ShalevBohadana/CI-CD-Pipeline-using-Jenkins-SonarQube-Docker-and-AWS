import { useCallback } from 'react';
import { intercomConfig } from '../config/intercom.config';

export const useIntercom = () => {
  const boot = useCallback((userData: any) => {
    window.Intercom('boot', {
      app_id: intercomConfig.appId,
      ...userData,
    });
  }, []);

  const update = useCallback((data: any) => {
    window.Intercom('update', data);
  }, []);

  const shutdown = useCallback(() => {
    window.Intercom('shutdown');
  }, []);

  const showMessages = useCallback(() => {
    window.Intercom('show');
  }, []);

  const hideMessages = useCallback(() => {
    window.Intercom('hide');
  }, []);

  return { boot, update, shutdown, showMessages, hideMessages };
};
