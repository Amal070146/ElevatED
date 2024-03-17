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
import { Landing } from "./Sections/Registration/Landing/Landing";
import { Quiz } from "./Components/Quiz/Quiz";
import { Toaster } from "react-hot-toast";
import { AdminDashboard } from "./Sections/Admin/Pages/Dashboard/Dashboard";
import { HeroSectionAdmin } from "./Sections/Admin/Pages/HeroSection/HeroSection";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="bottom-center" reverseOrder={false} />
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
          <Route path="settings" element={<Settings />} />
          <Route path="home" element={<Dashboard />} />
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

        {/* Super Admin */}
        <Route path="/admindashboard" element={<HeroSectionAdmin />}>
          <Route index element={<AdminDashboard />} />
          <Route path="organisation" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
