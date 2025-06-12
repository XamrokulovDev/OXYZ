import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routerlayout from "./layout/Routerlayout";
import Home from "./pages/Home";
import About from "./pages/About";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Routerlayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "*", element: <Routerlayout /> }
      ]
    }
  ]);
  return (
    <RouterProvider router={router}/>
  )
}

export default App;