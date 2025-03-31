import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import Popup from './popup.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Popup />
  </StrictMode>,
);
