import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routerlayout from "./layout/Routerlayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import { useEffect } from "react";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Routerlayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/about", element: <About /> },
        {path: "/services", element:<Services />},
      ]
    }
  ]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <RouterProvider router={router}/>
  )
}

export default App;