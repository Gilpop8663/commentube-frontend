import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import VideoPage from "../pages/VideoPage";
import HealthCheckPage from "../pages/HealthCheckPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/videos/:id",
    element: <VideoPage />,
  },
  {
    path: "/health-check",
    element: <HealthCheckPage />,
  },
]);
