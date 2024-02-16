import styles from "./Landing.module.css";
import Logo from "../../../Logo.png";
import { useNavigate } from "react-router-dom";

type Props = {};

export const Landing = (_props: Props) => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    navigate("/signup");
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.TopNavbar}>
        <img src={Logo} alt="" />
        <button onClick={handleLogin}>Register</button>
      </div>
    </div>
  );
};
