import { useEffect, useRef } from 'react';

// Extend the Window interface to include Trustpilot property
interface ExtendedWindow extends Window {
  Trustpilot?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadFromElement(element: Element, ...args: any[]): void;
    // Add other Trustpilot methods and properties if needed
  };
}

export const TrustPilotWidget = () => {
  const trustpilotScriptRef = useRef<HTMLDivElement | null>(null);
  const trustpilotContainerRef = useRef<HTMLDivElement | null>(null);
  const scriptSrc = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!existingScript) {
      // Create a script element
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = scriptSrc;
      script.async = true;

      // Set up a callback for when the script is loaded
      script.onload = () => {
        if ((window as ExtendedWindow)?.Trustpilot) {
          // If window.Trustpilot is available, load the TrustBox
          (window as ExtendedWindow).Trustpilot?.loadFromElement(
            trustpilotContainerRef.current ?? document.createElement('div'),
            true
          );
        }
      };

      // Append the script to the document
      trustpilotScriptRef.current?.appendChild(script);
    } else {
      // If the script is already loaded, directly load the TrustBox
      (window as ExtendedWindow).Trustpilot?.loadFromElement(
        trustpilotContainerRef.current ?? document.createElement('div'),
        true
      );
    }
  }, []);

  return (
    <div>
      <div
        ref={trustpilotContainerRef}
        className='trustpilot-widget'
        data-locale='en-US'
        data-template-id=''
        data-businessunit-id=''
      />

      {/* Container for the Trustpilot script */}
      <div ref={trustpilotScriptRef} />
    </div>
  );
};
