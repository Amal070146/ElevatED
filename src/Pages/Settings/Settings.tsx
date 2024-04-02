import { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import { supabase } from "../../utils/supabase";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AdminRequest from "./AdminRequest";
import EnablerRequest from "./EnablerRequest";
import Select, { Options, SingleValue } from "react-select";
import { OptionType } from "./settings.d";

const schema = z.object({
	first_name: z.string().min(1, { message: "First name is required" }),
	last_name: z.string().min(1, { message: "Last name is required" }),
	email: z.string().email(),
	phone: z
		.string()
		.min(10, { message: "Phone number but be 10 digits" })
		.max(10, { message: "Phone number but be 10 digits" }),
	district: z.string().min(1, { message: "District is required" }),
	degree: z.string().min(1, { message: "Degree type is required" }),
	department: z.string().min(1, { message: "Field of study is required" }),
	institution_id: z.string().min(1, { message: "Institution is required" }),
	is_student: z.boolean(),
	yog: z.string().min(1, { message: "Year of Graduation is required" }),
	allow_mail: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

export const Settings = () => {
	const [adminIsOpen, setAdminIsOpen] = useState(false);
	const [isRoleChangeVisible, setIsRoleChangeVisible] = useState("2");
	const [enablerIsOpen, setEnablerIsOpen] = useState(false);
	const [institutionOptions, setInstitutionOptions] = useState<
		Options<OptionType>
	>([]);

	const {
		register,
		handleSubmit,
		setError,
		reset,
		control,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		defaultValues: {},
		resolver: zodResolver(schema),
	});

	const fetchUserData = async () => {
		let { data: institution, error } = await supabase
			.from("institution")
			.select("*")
			.eq("is_verified", true);
		if (error) {
			throw error.message;
		} else if (institution) {
			setInstitutionOptions(
				institution?.map((institution) => ({
					value: institution.id,
					label: institution.name,
				}))
			);
		}
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
				reset(users);
				let { data: user_role_link, error: user_role_link_error } =
					await supabase.from("user_role_link").select("*");
				if (user_role_link_error) {
					throw user_role_link_error.message;
				} else if (user_role_link && user_role_link.length > 0) {
					if (user_role_link[0].status === true) {
						setIsRoleChangeVisible("1");
					} else {
						setIsRoleChangeVisible("0");
					}
				}
				
			}
		} else {
			throw "User not found, please login again";
		}
	};

	useEffect(() => {
		fetchUserData();
	}, [reset]);

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			await updateProfile(data).then(() => {
				toast.success("Profile updated successfully");
			});
		} catch (error) {
			setError("root", {
				message: String(error),
			});
		}
	};

	const updateProfile = async (formData: FormFields) => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			const { data, error } = await supabase
				.from("users")
				.upsert({ ...formData, id: user.id }, { onConflict: "id" })
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

	return (
		<div className={styles.Wrapper}>
			<h3>ACCOUNT</h3>
			<div className={styles.BottonConatiner}>
				<div className={styles.LeftContainer}>
					<div>
						<h2>Entry your details </h2>
						<p>Let’s setup an account for you !</p>
					</div>
					<form
						className={styles.form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className={styles.InputWrapper}>
							<div>
								<label htmlFor="name">First Name : </label>
								<input
									type="text"
									placeholder="eg:Harry"
									{...register("first_name")}
								/>
								{errors.first_name && (
									<div className={styles.error}>
										{errors.first_name.message}
									</div>
								)}
							</div>
							<div>
								<label htmlFor="name">Last Name : </label>
								<input
									{...register("last_name")}
									type="text"
									placeholder="eg:Willson"
								/>
								{errors.last_name && (
									<div className={styles.error}>
										{errors.last_name.message}
									</div>
								)}
							</div>
							<div>
								<label htmlFor="email">Email : </label>
								<input
									{...register("email")}
									type="text"
									placeholder="Email"
								/>
								{errors.email && (
									<div className={styles.error}>
										{errors.email.message}
									</div>
								)}
							</div>
							<div>
								<label htmlFor="phone">Phone Number : </label>
								<input
									type="tel"
									placeholder="eg:9856754236"
									{...register("phone")}
								/>
								{errors.phone && (
									<div className={styles.error}>
										{errors.phone.message}
									</div>
								)}
							</div>
							<div>
								<label htmlFor="district">District : </label>
								<input
									type="text"
									placeholder="eg:Thrissur"
									{...register("district")}
								/>
								{errors.district && (
									<div className={styles.error}>
										{errors.district.message}
									</div>
								)}
							</div>
							<div>
								<label htmlFor="degree">Degree Type : </label>
								<input
									type="text"
									placeholder="eg:B.Tech"
									{...register("degree")}
								/>
								{errors.degree && (
									<div className={styles.error}>
										{errors.degree.message}
									</div>
								)}
							</div>
							<div>
								<label htmlFor="fieldofstudy">
									Field of Study :{" "}
								</label>
								<input
									type="text"
									placeholder="eg:CSE"
									{...register("department")}
								/>
								{errors.department && (
									<div className={styles.error}>
										{errors.department.message}
									</div>
								)}
							</div>
							<div>
								<div>
									<label htmlFor="institution">
										Educational Institution:
									</label>
									<Controller
										name="institution_id"
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												isClearable
												options={institutionOptions}
												placeholder="eg: Christ College of Engineering"
												onChange={(
													option: SingleValue<OptionType>
												) =>
													field.onChange(
														option?.value
													)
												}
												value={
													institutionOptions.find(
														(option: {
															value: string;
														}) =>
															option.value ===
															field.value
													) || null
												}
											/>
										)}
									/>
									{errors.institution_id && (
										<div className={styles.error}>
											{errors.institution_id.message}
										</div>
									)}
								</div>
								<div className={styles.checkboxcontainer}>
									<input
										type="checkbox"
										{...register("is_student")}
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
									{...register("yog")}
								/>
								{errors.yog && (
									<div className={styles.error}>
										{errors.yog.message}
									</div>
								)}
							</div>
						</div>
						<div className={styles.checkboxcontainer}>
							<input
								type="checkbox"
								{...register("allow_mail")}
							/>
							<p>
								Want to receive mail about text and other
								directions.
							</p>
						</div>
						<button disabled={isSubmitting} type="submit">
							{isSubmitting ? "Loading..." : "Submit"}
						</button>
						{errors.root && (
							<div className={styles.error}>
								{errors.root.message}
							</div>
						)}
					</form>
				</div>
				<div className={styles.RightContainer}>
					{isRoleChangeVisible === "2" ? (
						<div className={styles.innerWrapper}>
							<h2>Request as</h2>
							<div>
								<button onClick={() => setEnablerIsOpen(true)}>
									Enabler
								</button>

								<button onClick={() => setAdminIsOpen(true)}>
									Administrator
								</button>
							</div>
							{enablerIsOpen && (
								<EnablerRequest
									isOpen={enablerIsOpen}
									setIsOpen={setEnablerIsOpen}
									institutionOptions={institutionOptions}
								/>
							)}
							{adminIsOpen && (
								<AdminRequest
									isOpen={adminIsOpen}
									setIsOpen={setAdminIsOpen}
									institutionOptions={institutionOptions}
								/>
							)}
						</div>
					) : isRoleChangeVisible === "0" ? (
						<div>Role Update request pending</div>
					) : null}
				</div>
			</div>
		</div>
	);
};
