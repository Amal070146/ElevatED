import { ArrowRightsvg } from "../../assets/svg";
import styles from "./registration.module.css";
import Logo from '../../Logo.png'
import google from '../../assets/google.png'

type Props = {};

export const Login = (_props: Props) => {
  return (
    <div className={styles.Wrapper}>
      <div>
        <div>
          <div>
            <img src={Logo} alt="" />
            <h2>ElevatED</h2>
          </div>
          <div>
            <p>WELCOME BACK 👋🏻</p>
            <h1>Continue to your Account.</h1>
          </div>
          <div>
            <img src={google} alt="" />
            <p>Log In with Google</p>
          </div>
        </div>
        <div>
          <div></div>
          <p>Or use Email</p>
          <div></div>
        </div>
        <div>
          <div>
            <div>
              <p>Email</p>
              <input type="text" placeholder="anu"/>
            </div>
            <div>
              <p>Password</p>
              <input type="text" placeholder="password"/>
            </div>
            <button>Continue <ArrowRightsvg color="#fff"/></button>
          </div>
          <p>
            Are you a Newbie?<b> GET STARTED - IT'S FREE</b>
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};
