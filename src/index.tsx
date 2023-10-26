import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/index.tsx';
import './index.css';
import 'virtual:uno.css';
import '@unocss/reset/tailwind-compat.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
