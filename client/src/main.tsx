import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from '@/redux/store';
import './ui/global.css';
import App from '@/app';
import ErrorBoundary from '@/components/errorBoundary';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <StrictMode>
        <Provider store={store}>
          <App/>
          <Toaster position={'top-center'}/>
        </Provider>
      </StrictMode>
    </BrowserRouter>
  </ErrorBoundary>
)
