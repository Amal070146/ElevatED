import { ArrowRightsvg } from "../../assets/svg";
import styles from "./registration.module.css";
import Logo from '../../Logo.png'
import google from '../../assets/google.png'
import image from './assets/image.png'

type Props = {};

export const Login = (_props: Props) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ContentWrap}>
        <div className={styles.TopSection}>
          <div>
            <img src={Logo} alt="" />
            <h2>ElevatED</h2>
          </div>
          <div className={styles.welc}>
            <p>WELCOME BACK 👋🏻</p>
            <h1>Continue to your Account.</h1>
          </div>
          <button className={styles.googlesign}>
            <img src={google} alt="" />
            <p>Log In with Google</p>
          </button>
        </div>
        <div className={styles.separator}>
          <div></div>
          <p>Or use Email</p>
          <div></div>
        </div>
        <div className={styles.BottomSection}>
          <div>
            <div className={styles.inputBox}>
              <p>Email</p>
              <input type="text" placeholder="anu" />
            </div>
            <div className={styles.inputBox}>
              <p>Password</p>
              <input type="text" placeholder="password" />
            </div>
            <button>
              Continue <ArrowRightsvg color="#fff" />
            </button>
          </div>
          <a href="/signup">
            Are you a Newbie?<b> GET STARTED - IT'S FREE</b>
          </a>
        </div>
      </div>
      <img src={image} alt="" />
    </div>
  );
};
