// src/config/intercom.config.ts
export const intercomConfig = {
  appId: import.meta.env.VITE_INTERCOM_APP_ID || 'YOUR_APP_ID',
  apiKey: import.meta.env.VITE_INTERCOM_API_KEY,
  settings: {
    alignment: 'right',
    horizontalPadding: 20,
    verticalPadding: 20,
    hideDefaultLauncher: false,
    customLauncherSelector: '#my-custom-launcher',
    // Session tracking
    sessionDuration: 30, // minutes
    // Role based settings
    allowedRoles: ['ADMIN', 'CUSTOMER', 'SUPPORT'],
  },
};
