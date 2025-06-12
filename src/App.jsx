import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routerlayout from "./layout/Routerlayout";
import Home from "./pages/Home";
import About from "./pages/About";
import News from './pages/News'
import New from './pages/Articles'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Routerlayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/news", element: <News /> },
        { path: "/news/:id", element: <New /> },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
