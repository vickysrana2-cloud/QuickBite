import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router"
import RestauranteContainer from './RestauranteContainer.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import RestaurantMenu from './components/RestaurantMenu.jsx'



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <RestauranteContainer />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "restaurant/:resId",
        element: <RestaurantMenu />
      }
    ]

  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
)
