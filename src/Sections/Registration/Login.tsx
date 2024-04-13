import { ArrowRightsvg } from "../../assets/svg";
import styles from "./registration.module.css";
import Logo from "../../Logo.png";
/* import google from "../../assets/google.png"; */
import image from "./assets/image.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "./LoginApis";
import { supabase } from "../../utils/supabase";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

type Props = {};

export const Login = (_props: Props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    usernameOrEmail: "",
    password: "",
    usernameOrEmailError: "",
    passwordError: "",
  });

  const validateForm = () => {
    let isValid = true;
    if (data.usernameOrEmail === "") {
      setData((prevData) => ({
        ...prevData,
        usernameOrEmailError: "Please enter a username or email",
      }));
      isValid = false;
    }
    if (data.password === "") {
      setData((prevData) => ({
        ...prevData,
        passwordError: "Please enter a password",
      }));
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = async (formData: any) => {
    loginUser(formData).then(() => {
      navigate("/home");
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      handleLogin(data);
    }
  };

  const location = useLocation();

  async function handleSignInWithGoogle(response: CredentialResponse) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: response.credential!,
    });
    if (error) {
      console.log(error);
    } else if (data) {
      navigate("/home");
      return data;
    }
  }

  // Access state passed from signup.tsx
  const fromPage = location.state?.from;
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ContentWrap}>
        <div className={styles.TopSection}>
          <img className={styles.logo_design} src={Logo} alt="" />
          <div className={styles.welc}>
            <p>WELCOME BACK 👋🏻</p>
            <h1>Continue to your Account.</h1>
          </div>
          <GoogleOAuthProvider clientId="575422164019-amrc92me48405usnq5e20dln3sbv96m2.apps.googleusercontent.com">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <GoogleLogin
                width={400}
                onSuccess={(credentialResponse) => {
                  handleSignInWithGoogle(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </GoogleOAuthProvider>
        </div>
        <p style={{ color: "green" }}>{fromPage}</p>
        <div className={styles.separator}>
          <div></div>
          <p>Or use Email</p>
          <div></div>
        </div>
        <div className={styles.BottomSection}>
          <div className={styles.inputBoxSection}>
            <div className={styles.inputBox}>
              <p>Email</p>
              <input
                type="text"
                placeholder="Email"
                value={data.usernameOrEmail}
                onChange={(e) =>
                  setData({
                    ...data,
                    usernameOrEmail: e.target.value,
                    usernameOrEmailError: "",
                  })
                }
              />
            </div>
            {data.usernameOrEmailError && <p>{data.usernameOrEmailError}</p>}
            <div className={styles.inputBox}>
              <p>Password</p>
              <input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                    passwordError: "",
                  })
                }
              />
            </div>
            {data.passwordError && <p>{data.passwordError}</p>}
            <button onClick={handleSubmit}>
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
