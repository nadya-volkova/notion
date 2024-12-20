import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import NoteView from "./pages/NoteView";
import NotFound from "./pages/NotFound";
import Wrapper from "./pages/Wrapper/Wrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "notes",
        element: <Notes />,
      },
      {
        path: "notes/create",
        element: <CreateNote />,
      },
      {
        path: "notes/edit/:id",
        element: <EditNote />,
      },
      {
        path: "notes/:id",
        element: <NoteView />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
