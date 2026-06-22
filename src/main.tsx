import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initializeGoogleAnalyticsConsent } from './utils/googleAnalytics';
import './styles/tokens.css';
import './styles/global.css';
import './styles/chat.css';
import './styles/theme.css';

initializeGoogleAnalyticsConsent();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
