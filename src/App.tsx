import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import PrivateRoute from "./Services/PrivateRoute";

import { createClient } from "@supabase/supabase-js";
import { Landing } from "./Sections/Registration/Landing/Landing";
import { Quiz } from "./Components/Quiz/Quiz";

export const supabase = createClient(
  "https://gkzzrkcdfbycavuzwbuw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrenpya2NkZmJ5Y2F2dXp3YnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2NTM1NzUsImV4cCI6MjAxODIyOTU3NX0.P1Mz4NcMivvuZLrZgLGIeAUDD9bR2gf2q-9YSmS33V0"
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HeroSection />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="progress" element={<Progress />} />
          <Route path="courses" element={<Courses />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="quiz" element={<Quiz />} />
        </Route>

        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
