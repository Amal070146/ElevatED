import { ArrowRightsvg } from "../../assets/svg";
import styles from "./registration.module.css";
import Logo from "../../Logo.png";
import image from "./assets/image.png";
import { useNavigate } from "react-router-dom";

type Props = {};

export const Signup = (_props: Props) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ContentWrap}>
        <div className={styles.TopSection}>
          <div>
            <img src={Logo} alt="" />
            <h2>ElevatED</h2>
          </div>
          <div className={styles.welc}>
            <h1>WELCOME to ElevatED</h1>
          </div>
        </div>

        <div className={styles.BottomSection}>
          <div className={styles.inputBoxSection}>
            <div className={styles.inputBox}>
              <p>Email</p>
              <input type="text" placeholder="anu" />
            </div>
            <div className={styles.inputBox}>
              <p>Password</p>
              <input type="text" placeholder="password" />
            </div>
            <button onClick={handleNavigation}>
              START YOUR JOURNEY <ArrowRightsvg color="#fff" />
            </button>
          </div>
          <p>
            By Signing up toeLEVATed, means you agree to our Privacy Policy and
            Terms of Service
          </p>
          <a href="/login">
            Already a Member? <b> LOG IN</b>
          </a>
        </div>
      </div>
      <img src={image} alt="" />
    </div>
  );
};
