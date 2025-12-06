// main.tsx
import React from 'react'; // ⚠️ Must import React explicitly
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';
import ThemeContextProvider from './features/theme/context/ThemeContext.tsx';

// 🧠 why-did-you-render setup (only in development)
if (import.meta.env.MODE === 'development') {
  const whyDidYouRender = await import('@welldone-software/why-did-you-render');
  whyDidYouRender.default(React, {
    trackAllPureComponents: true,
    logOnDifferentValues: true,
    collapseGroups: true,
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </StrictMode>,
);

