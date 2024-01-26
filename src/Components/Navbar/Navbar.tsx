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

export const Navbar = () => {
  const [selectedNav, setSelectedNav] = useState(0);
  return (
    <div className={styles.NavbarWrapper}>
      <div className={styles.TopSection}>
        <div>
          <img src={logo} alt="" />
          <p>ElevatED</p>
        </div>
        <div>
          <Link
            to="/"
            className={
              selectedNav === 0 ? styles.activeNav : styles.inactiveNav
            }
            onClick={() => setSelectedNav(0)}
          >
            <div>
              <DashboardLogo
                colors={`${selectedNav === 0 ? "#4318FF" : "#A3AED0"}`}
              />
              Dashboard
            </div>
            <div
              className={styles.RectangleBox}
              style={{
                backgroundColor: `${selectedNav === 0 ? "#4318FF" : "#A3AED0"}`,
              }}
            ></div>
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
                colors={`${selectedNav === 1 ? "#4318FF" : "#A3AED0"}`}
              />
              Courses
            </div>
            <div
              className={styles.RectangleBox}
              style={{
                backgroundColor: `${selectedNav === 1 ? "#4318FF" : "#A3AED0"}`,
              }}
            ></div>
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
                colors={`${selectedNav === 2 ? "#4318FF" : "#A3AED0"}`}
              />{" "}
              Progress
            </div>
            <div
              className={styles.RectangleBox}
              style={{
                backgroundColor: `${selectedNav === 2 ? "#4318FF" : "#A3AED0"}`,
              }}
            ></div>
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
                colors={`${selectedNav === 3 ? "#4318FF" : "#A3AED0"}`}
              />
              Settings
            </div>
            <div
              className={styles.RectangleBox}
              style={{
                backgroundColor: `${selectedNav === 3 ? "#4318FF" : "#A3AED0"}`,
              }}
            >
              {" "}
            </div>
          </Link>
        </div>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("accessToken");
          window.location.reload();
        }}
      >
        Log Out
      </button>
    </div>
  );
};
