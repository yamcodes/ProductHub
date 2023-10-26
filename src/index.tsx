import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/index.tsx';
import '@unocss/reset/tailwind-compat.css';
import 'virtual:uno.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
