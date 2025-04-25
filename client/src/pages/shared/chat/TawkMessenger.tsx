import { forwardRef } from 'react';

import TawkMessengerReact, { TawkAPI } from '@tawk.to/tawk-messenger-react';

import './tawk.css';

export const TawkMessenger = forwardRef<TawkAPI | null, Partial<TawkAPI>>((props, ref) => {
  return (
    <TawkMessengerReact
      propertyId={import.meta.env.VITE_TAWK_PROPERTY_ID}
      widgetId={import.meta.env.VITE_TAWK_WIDGET_ID}
      ref={ref}
      {...props}
    />
  );
});
