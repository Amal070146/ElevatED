import { ArrowRightsvg } from "../../assets/svg";
import styles from "./registration.module.css";
import Logo from "../../Logo.png";
import image from "./assets/image.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../App";
import toast from "react-hot-toast";

type Props = {};

export const Signup = (_props: Props) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    password2: "",
    password2Error: "",
  });

  const validateForm = () => {
    let isValid = true;
  

    if (data.email === "") {
      setData((prevData) => ({
        ...prevData,
        emailError: "Please enter an email",
      }));
      toast.error("Please enter an email");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      setData((prevData) => ({
        ...prevData,
        emailError: "Please enter a valid email",
      }));
      toast.error("Please enter a valid email");
      isValid = false;
    }

    if (data.password === "") {
      setData((prevData) => ({
        ...prevData,
        passwordError: "Please enter a password",
      }));
      toast.error("Please enter a password");
      isValid = false;
    }
    if (data.password !== data.password2) {
      setData((prevData) => ({
        ...prevData,
        password2Error: "Passwords do not match",
      }));
      toast.error("Passwords do not match");
      isValid = false;
    }
    return isValid;
  };

  const handleRegistration = async () => {
    let { data: res, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          email: data.email,
        },
      },
    });
    if (error) {
      throw error.message;
    } else {
      localStorage.setItem("user", JSON.stringify(res.session));
      return res;
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      toast.promise(handleRegistration(), {
        loading: "Signing up...",
        success: () => {
          navigate("/login",{state: {from:"Verify Your Email"}});
          toast.success("Account created successfully!");
          return <b>Signed up successfully</b>;
        },
        error: (error) => {
          return <b>{error}</b>;
        },
      });
    }
  };
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ContentWrap}>
        <div className={styles.TopSection}>
          <img className={styles.logo_design} src={Logo} alt="" />

          <div className={styles.welc}>
            <h1>WELCOME to ElevatED</h1>
          </div>
        </div>

        <div className={styles.BottomSection}>
          <div className={styles.inputBoxSection}>
            <div className={styles.inputBox}>
              <p>Email</p>
              <input
                type="email"
                placeholder="Enter Email"
                value={data.email}
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                    emailError: "",
                  })
                }
                required
              />
              {data.emailError && <p>{data.emailError}</p>}
            </div>
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
                required
              />
              {data.passwordError && <p>{data.passwordError}</p>}
            </div>{" "}
            <div className={styles.inputBox}>
              <p>Confirm Password</p>
              <input
                type="password"
                placeholder="Confirm Password"
                value={data.password2}
                onChange={(e) =>
                  setData({
                    ...data,
                    password2: e.target.value,
                    password2Error: "",
                  })
                }
                required
              />
              {data.password2Error && <p>{data.password2Error}</p>}
            </div>
            <button onClick={handleSubmit}>
              START YOUR JOURNEY <ArrowRightsvg color="#fff" />
            </button>
          </div>
          <p>
            By Signing up to ElevatED, means you agree to our Privacy Policy and
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
