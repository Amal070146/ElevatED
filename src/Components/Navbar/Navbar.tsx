import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../Logo.png";
import {
  DashboardLogo,
  ProgressIcons,
  SettingsIcons,
  CoursesIcons,
} from "../../assets/DashboardIcons";
import { useState } from "react";
import navimage from "../../assets/navbarImage.png";
import { Logoutsvg } from "../../assets/svg";

export const Navbar = () => {
  const [selectedNav, setSelectedNav] = useState(0);
  return (
    <div className={styles.NavbarWrapper}>
      <div className={styles.TopSection}>
        <img src={logo} alt="" />
        <div>
          <Link
            to="/home"
            className={
              selectedNav === 0 ? styles.activeNav : styles.inactiveNav
            }
            onClick={() => setSelectedNav(0)}
          >
            <div>
              <DashboardLogo
                colors={`${selectedNav === 0 ? "#0A8677" : "#A3AED0"}`}
              />
              Home
            </div>
          </Link>
          <Link
            to="/courses"
            className={
              selectedNav === 1 ? styles.activeNav : styles.inactiveNav
            }
            onClick={() => setSelectedNav(1)}
          >
            <div>
              <CoursesIcons
                colors={`${selectedNav === 1 ? "#0A8677" : "#A3AED0"}`}
              />
              Courses
            </div>
          </Link>
          <Link
            to="/progress"
            className={
              selectedNav === 2 ? styles.activeNav : styles.inactiveNav
            }
            onClick={() => setSelectedNav(2)}
          >
            <div>
              <ProgressIcons
                colors={`${selectedNav === 2 ? "#0A8677" : "#A3AED0"}`}
              />{" "}
              Progress
            </div>
          </Link>
          <Link
            to="/settings"
            className={
              selectedNav === 3 ? styles.activeNav : styles.inactiveNav
            }
            onClick={() => setSelectedNav(3)}
          >
            <div>
              <SettingsIcons
                colors={`${selectedNav === 3 ? "#0A8677" : "#A3AED0"}`}
              />
              Settings
            </div>
          </Link>
        </div>
      </div>
      <img src={navimage} alt="" />
      <button
        onClick={() => {
          localStorage.removeItem("accessToken");
          window.location.reload();
        }}
      >
        <Logoutsvg />
        Log Out
      </button>
    </div>
  );
};
