import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../../../utils/supabase";
import styles from "./CollegeList.module.css";

export const CollegeList = () => {
	const [institutionOptions, setInstitutionOptions] = useState<
		InstitutionsType[]
		>([]);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		fetchData();
	}, [refresh]);

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
				setRefresh(!refresh);
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
		} else {
			setRefresh(!refresh);
			toast.success("Request deleted successfully");
		}
	};

	return (
		<div className={styles.Wrapper}>
			 <h2 style={{  marginTop: "5", color: "#0a8677" }} >COLLEGE NAME REQUESTS</h2>
			<table>
				<thead>
					<tr>
						<th>College Name</th>
						<th>User</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{institutionOptions
						.filter((item) => item.is_verified === false)
						.map((item, index) => (
							<tr key={index}>
								<td>{item.name}</td>
								<td>
									{item.created_by_user?.first_name}{" "}
									{item.created_by_user?.last_name} (
									{item?.created_by_user?.email})
								</td>
								<td>
									{item.is_verified ? "Accepted" : "Pending"}
								</td>
								<td>
									<div className={styles.aprrovalDiv}>
										<button
											onClick={() =>
												handleApproveDecline(
													true,
													item.id
												)
											}
										>
											Accept
										</button>
										<button
											onClick={() =>
												handleDelete(item.id)
											}
										>
											Reject
										</button>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<h1>College Name</h1>
			<table>
				<thead>
					<tr>
						<th>College Name</th>
						<th>User</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{institutionOptions
						.filter((item) => item.is_verified === true)
						.map((item, index) => (
							<tr key={index}>
								<td>{item.name}</td>
								<td>
									{item.created_by_user?.first_name}{" "}
									{item.created_by_user?.last_name} (
									{item?.created_by_user?.email})
								</td>
								<td>
									<div>
										<button
											onClick={() =>
												handleApproveDecline(
													false,
													item.id
												)
											}
										>
											Mark as Pending
										</button>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};
