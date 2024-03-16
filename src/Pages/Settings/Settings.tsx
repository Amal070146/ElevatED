import { useState } from "react";
import styles from "./Settings.module.css";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabase";

export const Settings = () => {
	const [showFacultyPopup, setShowFacultyPopup] = useState(false);
	const [showAdminPopup, setShowAdminPopup] = useState(false);
	const [eduInstitution, setEduInstitution] = useState("");
	const [institutionDistrict, setInstitutionDistrict] = useState("");
	const [institutionId, setInstitutionId] = useState("");

	const [formState, setFormState] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		district: "",
		degreeType: "",
		fieldOfStudy: "",
		college: "",
		isStudent: false,
		yearOfGraduation: "",
		wantMail: false,
	});

	const handleFacultyButtonClick = () => {
		setShowFacultyPopup(true);
	};

	const handleAdminButtonClick = () => {
		setShowAdminPopup(true);
	};

	const handleFacultyPopupClose = () => {
		setShowFacultyPopup(false);
	};

	const handleAdminPopupClose = () => {
		setShowAdminPopup(false);
	};

	const handleFacultyPopupSubmit = () => {
		// Perform actions with the collected data
		setShowFacultyPopup(false);
	};

	const handleAdminPopupSubmit = () => {
		// Perform actions with the collected data
		setShowAdminPopup(false);
	};

	const handleInputChange = (e: {
		target: { id: any; value: any; type: any; checked: any };
	}) => {
		const { id, value, type, checked } = e.target;
		setFormState((prev) => ({
			...prev,
			[id]: type === "checkbox" ? checked : value,
		}));
	};

	const updateProfile = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			const { data, error } = await supabase
				.from("users")
				.upsert({
					id: user.id,
					first_name: formState.firstName,
					last_name: formState.lastName,
					email: formState.email,
					phone: formState.phoneNumber,
					district: formState.district,
					degree: formState.degreeType,
					department: formState.fieldOfStudy,
					institution: formState.college,
					is_student: formState.isStudent,
					yog: formState.yearOfGraduation,
					allow_mail: formState.wantMail,
				})
				.select();
			if (error) {
				throw error.message;
			} else {
				return data;
			}
		} else {
			throw "User not found, please login again";
		}
	};

	const handleSubmit = () => {
		const isEmpty = Object.values(formState).some((x) => x === "");
		if (isEmpty) {
			console.log(formState);
			toast.error("Please fill all the fields");
		} else {
			toast.promise(updateProfile(), {
				loading: "Saving...",
				success: () => {
					return <b>Profile updated successfully</b>;
				},
				error: (error) => {
					return <b>{error}</b>;
				},
			});
		}
	};

	return (
		<div className={styles.Wrapper}>
			<h2>Account</h2>
			<div className={styles.BottonConatiner}>
				<div className={styles.LeftContainer}>
					<div>
						<h2>Entry your details </h2>
						<p>Let’s setup an account for ypu !</p>
					</div>
					<div className={styles.InputWrapper}>
						<div>
							<label htmlFor="name">First Name : </label>
							<input
								type="text"
								id="firstName"
								placeholder="eg:Harry"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor="name">Last Name : </label>
							<input
								type="text"
								placeholder="eg:Willson"
								id="lastName"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor="email">Email : </label>
							<input
								type="email"
								placeholder="eg:Harry@gmail.com"
								id="email"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor="phone">Phone Number : </label>
							<input
								type="text"
								placeholder="eg:9856754236"
								id="phoneNumber"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor="district">District : </label>
							<input
								type="text"
								placeholder="eg:Thrissur"
								id="district"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor="degree">Degree Type : </label>
							<input
								type="text"
								placeholder="eg:B.Tech"
								id="degreeType"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor="fieldofstudy">
								Field of Study :{" "}
							</label>
							<input
								type="text"
								placeholder="eg:CSE"
								id="fieldOfStudy"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor="college">
								Educational Institution :{" "}
							</label>
							<input
								type="text"
								placeholder="eg:Christ College of Engineering"
								id="college"
								onChange={handleInputChange}
							/>
							<div className={styles.checkboxcontainer}>
								<input
									type="checkbox"
									id="isStudent"
									onChange={handleInputChange}
								/>
								<p>I’m currently studying here</p>
							</div>
						</div>

						<div>
							<label htmlFor="yearofgraduation">
								Year of Graduation :{" "}
							</label>
							<input
								type="number"
								placeholder="eg:2024"
								id="yearOfGraduation"
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className={styles.checkboxcontainer}>
						<input
							type="checkbox"
							id="wantMail"
							onChange={handleInputChange}
						/>
						<p>
							Want to receive mail about text and other
							directions.
						</p>
					</div>
					<button onClick={handleSubmit}>Submit</button>
				</div>
				<div className={styles.RightContainer}>
					<div className={styles.innerWrapper}>
						<h2>Request as</h2>
						<div>
							<button onClick={handleFacultyButtonClick}>
								Enabler
							</button>

							<button onClick={handleAdminButtonClick}>
								Administrator
							</button>
						</div>
						{showFacultyPopup && (
							<div className={styles.popup}>
								<span
									className={styles.close}
									onClick={handleFacultyPopupClose}
								>
									x
								</span>
								<h2>Enabler</h2>
								<label htmlFor="eduInstitution">
									Educational Institution:
								</label>
								<input
									type="text"
									id="eduInstitution"
									value={eduInstitution}
									onChange={(e) =>
										setEduInstitution(e.target.value)
									}
								/>
								<label htmlFor="institutionDistrict">
									Institution District:
								</label>
								<input
									type="text"
									id="institutionDistrict"
									value={institutionDistrict}
									onChange={(e) =>
										setInstitutionDistrict(e.target.value)
									}
								/>
								<button onClick={handleFacultyPopupSubmit}>
									Submit
								</button>
							</div>
						)}
						{showAdminPopup && (
							<div className={styles.popup}>
								<span
									className={styles.close}
									onClick={handleAdminPopupClose}
								>
									&times;
								</span>
								<h2>Administrator</h2>
								<label htmlFor="eduInstitution">
									Educational Institution:
								</label>
								<input
									type="text"
									id="eduInstitution"
									value={eduInstitution}
									onChange={(e) =>
										setEduInstitution(e.target.value)
									}
								/>
								<label htmlFor="institutionDistrict">
									Institution District:
								</label>
								<input
									type="text"
									id="institutionDistrict"
									value={institutionDistrict}
									onChange={(e) =>
										setInstitutionDistrict(e.target.value)
									}
								/>
								<label htmlFor="institutionId">
									Institution ID:
								</label>
								<input
									type="text"
									id="institutionId"
									value={institutionId}
									onChange={(e) =>
										setInstitutionId(e.target.value)
									}
								/>
								<button onClick={handleAdminPopupSubmit}>
									Submit
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
