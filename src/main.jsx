import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from './ErrorBoundary';  // Importez le composant ErrorBoundary

import App from './app';
import MacLoader from './components/loader/Mac';
import { AuthProvider } from './context/AuthContext';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<MacLoader />}>
          <ErrorBoundary>
              <AuthProvider>
                <App />
              </AuthProvider>    
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
