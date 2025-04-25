// src/components/Intercom/IntercomProvider.tsx
import { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { intercomConfig } from '../../config/intercom.config';
import { selectAuthData, selectAuthToken } from '../../redux/features/auth/authSlice';
import { Role } from '@/enums/role';

export const IntercomProvider = () => {
  const userData = useAppSelector(selectAuthData);
  const token = useAppSelector(selectAuthToken);

  useEffect(() => {
    if (userData && token) {
      // Intercom settings
      window.intercomSettings = {
        app_id: intercomConfig.appId,
        user_id: userData.userId,
        // שימוש ברולים מהטוקן
        role: userData.roles[0] as unknown as Role, // משתמשים ברול הראשון כדיפולט
        custom_role_data: userData.roles as unknown as Role[], // Type assertion

        // זמן פקיעת הטוקן
        custom_launcher_selector: '#my-custom-launcher',
      };

      // Intercom initialization script
      (function () {
        var w = window;
        var ic = w.Intercom;
        if (typeof ic === 'function') {
          ic('reattach_activator');
          ic('update', w.intercomSettings);
        } else {
          var d = document;
          var i: any = function () {
            i.c(arguments);
          };
          i.q = [];
          i.c = function (args: any) {
            i.q.push(args);
          };
          w.Intercom = i;
          var l = function () {
            var s = d.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widget.intercom.io/widget/' + intercomConfig.appId;
            var x = d.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
          };
          if (document.readyState === 'complete') {
            l();
          } else {
            w.addEventListener('load', l, false);
          }
        }
      })();

      // Track user session
      window.Intercom('trackEvent', 'user-session-start', {
        userId: userData.userId,
        roles: userData.roles,
        timestamp: new Date().toISOString(),
      });
    }

    return () => {
      if (window.Intercom) {
        window.Intercom('shutdown');
      }
    };
  }, [userData, token]);

  // Track chat state changes
  const chatState = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (window.Intercom && userData) {
      window.Intercom('update', {
        last_seen: new Date().toISOString(),
        user_role: userData.roles[0],
        chat_state: chatState,
      });
    }
  }, [chatState, userData]);

  return null;
};

export default IntercomProvider;
