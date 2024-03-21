import styles from "../Settings.module.css";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { supabase } from "../../../utils/supabase";

type Props = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};

const schema = z.object({
	name: z.string().min(1, { message: "Institution name is required" }),
	code: z.string().min(1, { message: "Institution code is required" }),
});

type FormFields = z.infer<typeof schema>;

const AdminRequest = (props: Props) => {
	const {
		register,
		handleSubmit,
		setError,
		// reset,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		defaultValues: {},
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			await requestAdminAccess(data).then(() => {
				toast.success("Admin request sent successfully");
			});
		} catch (error) {
			setError("root", {
				message: String(error),
			});
		}
	};

	const requestAdminAccess = async (formData: FormFields) => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			const { data, error } = await supabase
				.from("institution")
				.insert([formData])
				.select();
			if (error) {
				toast.error(error.message);
			} else if (data) {
				const { data: role, error: roleError } = await supabase
					.from("user_role_link")
					.insert([
						{
							user_id: user.id,
							role_id: "8a43634f-f5a2-4823-84f4-a8a9600de4ae",
						},
					])
					.select();
				if (roleError) {
					toast.error(roleError.message);
				} else if (role) {
					return role
				}
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
						&times;
					</span>
					<h2>Administrator</h2>
					<label htmlFor="college">Educational Institution : </label>
					<input
						type="text"
						placeholder="eg:Christ College of Engineering"
						{...register("name")}
					/>
					{errors.name && (
						<div className={styles.error}>
							{errors.name.message}
						</div>
					)}
					<label htmlFor="institutionId">Institution ID:</label>
					<input type="text" {...register("code")} />
					{errors.code && (
						<div className={styles.error}>
							{errors.code.message}
						</div>
					)}
					<button disabled={isSubmitting} type="submit">
						{isSubmitting ? "Loading..." : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AdminRequest;
