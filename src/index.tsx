import React from 'react';
import { createRoot } from 'react-dom/client';
import WebFont from 'webfontloader';
import { WEBFONT_CONFIG } from './config/constants';
import App from './App';

WebFont.load(WEBFONT_CONFIG);

createRoot(document.getElementById('app-root')!).render(<App />);
