import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import styles from "./Profile.module.css";
import {
	Behance,
	Figma,
	Github,
	Instagram,
	LinkedIn,
	Location,
	Mail,
	Phone,
	StckOverFlow,
	Svg,
	Twitter,
} from "./svg";
import { FaStar } from "react-icons/fa";

export const Profile = () => {
	const [profile, setProfile] = useState<ProfileData>();
	const fetchUserData = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			let { data: users, error } = await supabase
				.from("users")
				.select("*")
				.eq("id", user.id)
				.single();
			if (error) {
				throw error.message;
			} else {
				setProfile(users);
				return users;
			}
		} else {
			throw "User not found, please login again";
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	const data = [
		{
			name: "Operating System (OS)",
			para: "Comets are a big source of meteoroids because of the nature of those long tails. A large amount of dust.",
			stars: 5,
			status: "Completed",
		},
		{
			name: "Bristol",
			para: "Comets are a big source of meteoroids because of the nature of those long tails. A large amount of dust.",
			stars: 4,
			status: "Not Completed",
		},
		{
			name: "Operating System (OS)",
			para: "Comets are a big source of meteoroids because of the nature of those long tails. A large amount of dust.",
			stars: 2,
			status: "Not Completed",
		},
		{
			name: "Bristol",
			para: "Comets are a big source of meteoroids because of the nature of those long tails. A large amount of dust.",
			stars: 5,
			status: "Completed",
		},
	];
	const renderStars = (count: number) => {
		const totalStars = 5; // Assuming a total of 5 stars for rating
		const stars = [];
		for (let i = 0; i < totalStars; i++) {
			stars.push(
				i < count ? (
					<FaStar key={i} style={{ color: "#E5BD51" }} />
				) : (
					<FaStar key={i} style={{ color: "#ddd" }} />
				)
			);
		}
		return <div>{stars}</div>;
	};
	return (
		<div className={styles.Wrapper}>
			<div className={styles.Header}>
				<h1>
					Hi, I’m {profile?.first_name} &nbsp; {profile?.last_name}👋
				</h1>
				<div>
					<a href="" target="_blank">
						<Github />
					</a>
					<a href="" target="_blank">
						<StckOverFlow />
					</a>
					<a href="" target="_blank">
						<LinkedIn />
					</a>
					<a href="" target="_blank">
						<Behance />
					</a>
					<a href="" target="_blank">
						<Svg />
					</a>
					<a href="" target="_blank">
						<Figma />
					</a>
					<a href="" target="_blank">
						<Instagram />
					</a>
					<a href="" target="_blank">
						<Twitter />
					</a>
				</div>
			</div>
			<p>
				I'm a full stack developer (React.js & Node.js) with a focus on
				creating (and occasionally designing) exceptional digital
				experiences that are fast, accessible, visually appealing, and
				responsive. Even though I have been creating web applications
				for over 7 years, I still love it as if it was something new.
			</p>
			<p>Degree {profile?.degree}</p>
			<p>Department {profile?.department}</p>
			<p>Institution {profile?.institution}</p>
			{profile?.is_student && <p>I’ll graduate in {profile?.yog} </p>}
			<div className={styles.Detailer}>
				<div>
					<Location />
					{profile?.district}
				</div>
				<div>
					<Phone />
					{profile?.phone}
				</div>
				<div>
					<Mail />
					{profile?.email}
				</div>
			</div>
			<div className={styles.CoursesWrapper}>
				<h1>My Courses</h1>
				<div>
					{data.map((item, index) => (
						<div key={index} className={styles.CourseItem}>
							<div className={styles.Top}>
								Course {item.status}
							</div>
							<div className={styles.Starswrapper}>
								{renderStars(item.stars)}
							</div>
							<div className={styles.Detail}>
								<h2>{item.name}</h2>
								<p>{item.para}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
