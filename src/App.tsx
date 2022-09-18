import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import AllCharacters, { allCharactersLoader } from "./pages/AllCharacters";
import BookPage, { bookPageLoader } from "./pages/BookPage";
import CharacterPage, { characterPageLoader } from "./pages/CharacterPage";
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
      {
        path: "/book/:bookId",
        element: <BookPage />,
        loader: bookPageLoader,
      },
      {
        path: "/book/:bookId/all-characters",
        element: <AllCharacters />,
        loader: allCharactersLoader,
      },
      {
        path: "/character/:characterId",
        element: <CharacterPage />,
        loader: characterPageLoader,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
