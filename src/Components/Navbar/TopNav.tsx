
import styles from "./Navbar.module.css";
import defaultProfile from "../../assets/defaultProfile.jpg";
import { useNavigate } from "react-router-dom";
import { Notificationsvg } from "../../assets/svg";

export const TopNav = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.TopNAvbarWrapper}>
   
      <div className={styles.ButtonWrapper}>
        <button onClick={() => navigate("/notification")}>
          <Notificationsvg />
        </button>
        <button
          className={styles.profileButton}
          onClick={() => {
            navigate("/profile");
          }}
        >
          <img src={defaultProfile} alt="" />
        </button>
      </div>
    </div>
  );
};
