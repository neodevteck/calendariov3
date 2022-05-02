import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ContextWrapper from './context/ContextWrapper';

import client from './react-query/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <QueryClientProvider client={client}> */}
      <ContextWrapper>
        <App />
      </ContextWrapper>
      {/* <ReactQueryDevtools />
    </QueryClientProvider> */}
  </React.StrictMode>
);
