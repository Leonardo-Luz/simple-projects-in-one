import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Error, Home } from './routes'
import { Dama } from './routes/Dama.route.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/dama',
        element: <Dama />
      }
    ]
  }
])

const root = createRoot(document.getElementById('root')!)
root.render(
    <RouterProvider router={router} />
)
