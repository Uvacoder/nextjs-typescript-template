import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Discover, { discoverLoader } from "./pages/Discover";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Discover />,
        loader: discoverLoader,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
