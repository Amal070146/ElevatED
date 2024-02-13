import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./Sections/Registration/Login";
import { Signup } from "./Sections/Registration/Signup";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Settings } from "./Pages/Settings/Settings";
import { HeroSection } from "./Pages/HeroSection/HeroSection";
import { Progress } from "./Pages/Progress/Progress";
import { Courses } from "./Pages/Courses/Courses";
import { Profile } from "./Pages/Profile/Profile";
import { Notifications } from "./Pages/Notifications/Notifications";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/404",
      element: <NotFound />,
    },
    {
      path: "/some",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },

    {
      path: "/",
      element: <HeroSection />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "settings", element: <Settings /> },
        { path: "progress", element: <Progress /> },
        { path: "courses", element: <Courses /> },
        { path: "notification", element: <Notifications /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
