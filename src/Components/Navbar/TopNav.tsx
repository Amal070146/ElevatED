
import styles from "./Navbar.module.css";
import defaultProfile from "../../assets/defaultProfile.jpg";
import { useNavigate } from "react-router-dom";
import { Notificationsvg } from "../../assets/svg";

export const TopNav = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.TopNAvbarWrapper}>
      <div>
        <p>Hi Amal,</p>
        <h1>Welcome to Careerio!</h1>
      </div>
      <div className={styles.ButtonWrapper}>
        <button onClick={() => navigate("/notification/1")}>
          <Notificationsvg />
        </button>
        <button
          className={styles.profileButton}
          onClick={() => {
            navigate("/profile/1");
          }}
        >
          <img src={defaultProfile} alt="" />
        </button>
      </div>
    </div>
  );
};
