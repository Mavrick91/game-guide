import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Unauthenticate from "./components/Unauthenticate";
import "./style/global.css";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";

const UnauthenticateRouter = createBrowserRouter([
  {
    path: "/",
    element: <Unauthenticate />,
    errorElement: <NotFound />,
    children: [{ path: "/", element: <Login /> }],
  },
]);

export default function App() {
  return <RouterProvider router={UnauthenticateRouter} />;
}
