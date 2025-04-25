import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './App';

import './index.css';

// Loading Component
const LoadingSpinner = () => (
  <div className='flex min-h-screen items-center justify-center'>
    <div className='animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full' />
  </div>
);

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className='flex min-h-screen items-center justify-center bg-gray-50'>
          <div className='text-center p-8 bg-white rounded-lg shadow-lg max-w-md'>
            <h1 className='text-2xl font-bold text-red-600 mb-4'>
              {this.state.error?.message || 'Something went wrong'}
            </h1>
            <p className='text-gray-600 mb-6'>
              The application encountered an unexpected error. Please try again.
            </p>
            <div className='flex justify-center gap-4'>
              <button
                onClick={() => window.location.reload()}
                className='rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'
              >
                Reload Application
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className='rounded border border-blue-500 px-4 py-2 text-blue-500 transition hover:bg-blue-50'
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize app
const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element. Please check your HTML file.');
}

const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <Suspense fallback={<LoadingSpinner />}>
        <App />
      </Suspense>
    </Provider>
  </ErrorBoundary>
);

// Global error handlers
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', {
    error: event.reason?.message || event.reason,
    stack: event.reason?.stack,
    timestamp: new Date().toISOString(),
  });
});

window.addEventListener('error', (event) => {
  console.error('Global error:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    timestamp: new Date().toISOString(),
  });
});

// Log when app starts

// Enable HMR
if (import.meta.hot) {
  import.meta.hot.accept();
}
