import styles from "./registration.module.css";
import Logo from "../../Logo.png";
import image from "./assets/image.png";
import { useNavigate } from "react-router-dom";

type Props = {};

export const Verify = (_props: Props) => {
	const navigate = useNavigate();
	return (
		<div className={styles.Wrapper}>
			<div className={styles.ContentWrap}>
				<div className={styles.TopSection}>
					<img className={styles.logo_design} src={Logo} alt="" />
					<div className={styles.welc}>
						<p>Verify your Email 👋🏻</p>
						<h1>check your email</h1>
					</div>
					<button onClick={() => navigate("/login")}>login</button>
				</div>
			</div>
			<img src={image} alt="" />
		</div>
	);
};
