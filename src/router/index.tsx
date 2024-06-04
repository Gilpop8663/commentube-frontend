import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import VideoPage from "../pages/VideoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/videos/:id",
    element: <VideoPage />,
  },
]);
