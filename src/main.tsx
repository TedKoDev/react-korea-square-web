import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App'
import NotFound from './pages/notfound'
import Home from './pages/home'
import Boards from './pages/boards'
import Devpage from './pages/devpage'
import Mypage from './pages/mypage'
import NewProduct from './pages/newpost'
import ProductDetail from './pages/postdetail'
import Auth from './pages/auth'

// Create a client
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'auth', element: <Auth /> },
      { path: 'boards', element: <Boards /> },
      {
        path: '/boards/new',
        element: <NewProduct />,
      },
      {
        path: '/boards/:id',
        element: <ProductDetail />,
      },
      { path: 'devpage', element: <Devpage /> },
      { path: 'mypage', element: <Mypage /> },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
