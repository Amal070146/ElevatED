import { Outlet } from "react-router-dom";

import styles from "./HeroSection.module.css";
import { Navbar } from "../../Components/Navbar/Navbar";
import { TopNav } from "../../Components/Navbar/TopNav";

export const HeroSectionAdmin = () => {
  return (
    <div className={styles.HeroSectionWrapper}>
      <div className={styles.SideNavbarWrapper}>
        <Navbar />
      </div>
      <div className={styles.RightSectionWrapper}>
        <TopNav />
        <Outlet />
      </div>
    </div>
  );
};
