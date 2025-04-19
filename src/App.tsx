import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AppLayout from './Layout/AppLayout';
import Home from './Pages/Home';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const App: React.FunctionComponent = () => {

  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    }
  ])

  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>

      </RouterProvider>
      </QueryClientProvider>
  )
}

export default App