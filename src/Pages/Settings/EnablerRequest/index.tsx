import { z } from "zod";
import styles from "../Settings.module.css";
import toast from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../../../utils/supabase";
import Select, { Options, SingleValue } from "react-select";
import { useState } from "react";
import { OptionType } from "../settings.d";

type Props = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	institutionOptions: Options<OptionType>;
};

const schema = z.object({
	name: z.string().optional(),
	code: z.string().optional(),
	institution_id: z.string().min(1, { message: "Institution is required" }),
});

type FormFields = z.infer<typeof schema>;

const EnablerRequest = (props: Props) => {
	const [selectedLabel, setSelectedLabel] = useState("");
	const {
		register,
		handleSubmit,
		setError,
		control,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		defaultValues: {},
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			await requestEnablerAccess(data).then(() => {
				toast.success("Enabler request sent successfully");
			});
		} catch (error) {
			setError("root", {
				message: String(error),
			});
		}
	};

	const requestEnablerAccess = async (formData: FormFields) => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			if (selectedLabel === "Other") {
				const { data, error } = await supabase
					.from("institution")
					.insert([{ name: formData.name, code: formData.code }])
					.select();
				if (error) {
					toast.error(error.message);
				} else if (data) {
					const { data: profileUpdate, error } = await supabase
						.from("users")
						.update({
							working_institute_id: data[0].id,
						})
						.eq("id", user.id)
						.select();
					if (error) {
						toast.error(error.message);
					} else if (profileUpdate) {
						return data;
					}
				}
			} else {
				const { data, error } = await supabase
					.from("users")
					.update({ working_institute_id: formData.institution_id })
					.eq("id", user.id)
					.select();
				if (error) {
					toast.error(error.message);
				} else if (data) {
					return data;
				}
			}
			const { data: role, error: roleError } = await supabase
				.from("user_role_link")
				.insert([
					{
						user_id: user.id,
						role_id: "71650c91-b579-4d1d-a90e-40d12a1c8ab3",
					},
				])
				.select();
			if (roleError) {
				toast.error(roleError.message);
			} else if (role) {
				return role;
			}
		} else {
			throw "User not found, please login again";
		}
	};

	return (
		<div>
			<form action="" onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.popup}>
					<span
						className={styles.close}
						onClick={() => props.setIsOpen(false)}
					>
						X
					</span>
					<h2>Enabler</h2>
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
									options={props.institutionOptions}
									isClearable
									placeholder="eg: Christ College of Engineering"
									onChange={(
										option: SingleValue<OptionType>
									) => {
										field.onChange(option?.value);
										setSelectedLabel(
											option ? option.label : ""
										);
									}}
									value={
										props.institutionOptions.find(
											(option: { value: string }) =>
												option.value === field.value
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
					{selectedLabel === "Other" && (
						<>
							<div>
								<label htmlFor="name">
									Educational Institution:
								</label>
								<input
									type="text"
									{...register("name")}
									placeholder="eg:Christ College of Engineering"
								/>
								{errors.name && (
									<div className={styles.error}>
										{errors.name.message}
									</div>
								)}
							</div>
							<div>
								<label htmlFor="code">
									Educational Institution Code:
								</label>
								<input
									type="text"
									{...register("code")}
									placeholder="eg:CCE"
								/>
								{errors.code && (
									<div className={styles.error}>
										{errors.code.message}
									</div>
								)}
							</div>
						</>
					)}
					<button disabled={isSubmitting} type="submit">
						{isSubmitting ? "Loading..." : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default EnablerRequest;
