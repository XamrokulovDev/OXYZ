import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routerlayout from "./layout/Routerlayout";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import Security from "./pages/Security";
import Terms from "./pages/Terms";

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
        { path: "/news", element: <News /> },
        { path: "/new/:id", element: <Articles /> },
        { path: "/terms", element: <Security /> },
        { path: "/security", element: <Terms /> }
      ]
    }
  ]);
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
