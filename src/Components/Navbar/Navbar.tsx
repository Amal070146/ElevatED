import styles from "./Navbar.module.css";
import logo from "../../Logo.png";
import miniLogo from "../../../Logo_small.png";
import {
	DashboardLogo,
	ProgressIcons,
	SettingsIcons,
	CoursesIcons,
} from "../../assets/DashboardIcons";

import navimage from "../../assets/navbarImage.png";
import { Logoutsvg } from "../../assets/svg";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import toast from "react-hot-toast";

export const Navbar = () => {
	const location = useLocation();

	const navContent = ["home", "courses", "progress", "settings"];
	const svgIcons = [
		DashboardLogo,
		CoursesIcons,
		ProgressIcons,
		SettingsIcons,
	];

	const getIconColor = (path: string) => {
		return location.pathname.includes(path) ? "#0A8677" : "#A3AED0";
	};
	const navigate = useNavigate();
	return (
		<div className={styles.NavbarWrapper}>
			<div className={styles.TopSection}>
				<img className={styles.MainLogo} src={logo} alt="" />
				<img className={styles.MiniLogo} src={miniLogo} alt="" />
				<div>
					{navContent.map((content, i) => (
						<a
							href={`/${content
								.toLowerCase()
								.replace(/\s+/g, "")}`}
							key={i.toString() + content}
						>
							{React.createElement(svgIcons[i], {
								colors: getIconColor(content.toLowerCase()),
								key: i,
							})}
							<p
								style={{
									fontSize: "17px",
									fontWeight: 600,
									color: window.location.href.includes(
										`/${content
											.toLowerCase()
											.replace(/\s+/g, "")}`
									)
										? "#0A8677"
										: "#A3AED0",
								}}
							>
								{content}
							</p>
						</a>
					))}
				</div>
			</div>
			<img src={navimage} alt="" />
			<button
				onClick={async () => {
					localStorage.removeItem("accessToken");
					let { error } = await supabase.auth.signOut();
					if (error) {
						toast.error(error.message);
					}
					navigate("/landing");
				}}
			>
				<Logoutsvg />
				<p> Log Out</p>
			</button>
		</div>
	);
};
