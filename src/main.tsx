import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css';
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        token:{
          colorPrimary: '#F65F42',
          colorLink:'#F65F42'
        }
      }}
    >
    <RouterProvider router={router}/>
    </ConfigProvider>
  </QueryClientProvider>    

  </React.StrictMode>,
)
