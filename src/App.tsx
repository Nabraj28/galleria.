import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from './Layout/AppLayout'
import Home from './Pages/Home'

const App: React.FunctionComponent = () => {

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
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App