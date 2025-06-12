import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routerlayout from "./layout/Routerlayout";
import Home from "./pages/Home";
import About from "./pages/About";
import { useEffect } from "react";
import Services from "./components/Services";
import Contact from "./pages/Contact";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Routerlayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/services", element: <Services /> },
        { path: "/contact", element: <Contact /> },
        { path: "/news", element:  }
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