import React from 'react';
import Home from './Pages/Home';
import ArtWork from "@/Pages/ArtWork";
import SlideShow from "@/Pages/SlideShow";
import AppLayout from './Layout/AppLayout';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        },
        {
          path: '/artwork/:id',
          element: <ArtWork />
        },
        {
          path: '/slideshow',
          element: <SlideShow />
        }
      ]
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  )
}

export default App