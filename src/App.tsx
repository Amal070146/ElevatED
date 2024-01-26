import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./Sections/Registration/Login";
import { Signup } from "./Sections/Registration/Signup";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { Settings } from "./Components/Settings/Settings";
import { HeroSection } from "./Components/HeroSection/HeroSection";

function App() {
  const router = createBrowserRouter([
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
