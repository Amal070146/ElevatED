import { useEffect, useState } from "react";
import styles from "./Organisation.module.css";
import toast from "react-hot-toast";
import { supabase } from "../../../../utils/supabase";

export const Organisation = () => {
	const [institutionOptions, setInstitutionOptions] = useState<
		InstitutionsType[]
	>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		let { data: institution, error } = await supabase.from("institution")
			.select(`
            *,
            created_by_user:users!public_institution_created_by_fkey (
            id,
            first_name,
            last_name,
            email,
            phone
        )
        `);
		if (error) {
			toast.error(error.message);
		} else if (institution) {
			setInstitutionOptions(institution);
		}
	};

	const handleApproveDecline = async (status: boolean, id: string) => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			const { data, error } = await supabase
				.from("institution")
				.update({ is_verified: status, approved_by: user.id })
				.eq("id", id)
				.select();
			if (error) {
				toast.error(error.message);
			} else if (data) {
				toast.success("Organisation request updated successfully");
			}
		}
	};

	const handleDelete = async (id: string) => {
		const { error } = await supabase
			.from("institution")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className={styles.Wrapper}>
			<div className={styles.Header}>
				<h1>Pending Organizations</h1>
				<div>
					<button>Approve All</button>
					<button>Decline All</button>
				</div>
			</div>

			<div className={styles.Organisations}>
				{institutionOptions
					.filter((institution) => !institution.is_verified)
					.map((institution) => (
						<div
							className={styles.Individuals}
							key={institution.id}
						>
							<div className={styles.Top}>
								<div>
									<h3>{institution.name}</h3>
									<p>{institution.code}</p>
								</div>
								<div className={styles.ButtonWrapper}>
									<button
										onClick={() =>
											handleApproveDecline(
												true,
												institution.id
											)
										}
									>
										Approve
									</button>
									<button
										onClick={() =>
											handleDelete(institution.id)
										}
									>
										Decline
									</button>
								</div>
							</div>

							<div>
								<div>
									<h4>Contact Information</h4>
									{institution.created_by_user && (
										<p>
											{
												institution.created_by_user
													.first_name
											}{" "}
											{
												institution.created_by_user
													.last_name
											}{" "}
											{institution.created_by_user.phone}
										</p>
									)}
								</div>
								<div>
									<h4>Requested Permissions</h4>
									<p>For Organisation</p>
								</div>
							</div>
						</div>
					))}
			</div>
			<div className={styles.Header}>
				<h1>Accepted Organizations</h1>

				<button>Decline All</button>
			</div>
			<div className={styles.Organisations}>
				{institutionOptions
					.filter((institution) => institution.is_verified)
					.map((institution) => (
						<div
							className={styles.Individuals}
							key={institution.id}
						>
							<div className={styles.Top}>
								<div>
									<h3>{institution.name}</h3>
									<p>{institution.code}</p>
								</div>
								<div className={styles.ButtonWrapper}>
									<button
										onClick={() =>
											handleApproveDecline(
												false,
												institution.id
											)
										}
									>
										Mark as Pending
									</button>
									<button
										onClick={() =>
											handleDelete(institution.id)
										}
									>
										Delete
									</button>
								</div>
							</div>

							<div>
								<div>
									<h4>Contact Information</h4>
									{institution.created_by_user && (
										<p>
											{
												institution.created_by_user
													.first_name
											}{" "}
											{
												institution.created_by_user
													.last_name
											}{" "}
											{institution.created_by_user.phone}
										</p>
									)}
								</div>
								<div>
									<h4>Requested Permissions</h4>
									<p>For Organisation</p>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};
