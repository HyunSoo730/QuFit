import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from '@routers/Router.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@queries/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>,
);
