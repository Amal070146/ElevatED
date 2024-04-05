import { useEffect, useState } from "react";
import styles from "./Organisation.module.css";
import toast from "react-hot-toast";
import { supabase } from "../../../../utils/supabase";

export const Organisation = () => {
	const [data, setData] = useState<AdminApprovalData[]>([]);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		fetchData();
	}, [refresh]);

	const fetchData = async () => {
		let { data: users, error } = await supabase
			.from("user_role_link")
			.select(
				"*, extended_user_view(email, users(first_name, last_name, phone, institution!public_institution_created_by_fkey(name, code)))"
			)
			.eq("role_id", "8a43634f-f5a2-4823-84f4-a8a9600de4ae");
		if (error) {
			toast.error(error.message);
		} else if (users) {
			setData(users);
		}
	};

	const handleApproveDecline = async (status: boolean, id: string) => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			const { data, error } = await supabase
				.from("user_role_link")
				.update({ status: status })
				.eq("user_id", id)
				.select();
			if (error) {
				toast.error(error.message);
			} else if (data) {
				setRefresh(!refresh);
				toast.success("Admin request updated successfully");
			}
		}
	};

	const handleDelete = async (id: string) => {
		const { error } = await supabase
			.from("user_role_link")
			.delete()
			.eq("user_id", id);

		if (error) {
			toast.error(error.message);
		} else {
			setRefresh(!refresh);
			toast.success("Admin request deleted successfully");
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
				{data
					.filter((item) => !item.status)
					.map((item) => (
						<div className={styles.Individuals} key={item.user_id}>
							<div className={styles.Top}>
								<div>
									<h3>
										{
											item?.extended_user_view?.users
												?.institution[0]?.name
										}
									</h3>
									<p>
										{
											item?.extended_user_view?.users
												?.institution[0]?.code
										}
									</p>
								</div>
								<div className={styles.ButtonWrapper}>
									<button
										onClick={() =>
											handleApproveDecline(
												true,
												item.user_id
											)
										}
									>
										Approve
									</button>
									<button
										onClick={() =>
											handleDelete(item.user_id)
										}
									>
										Decline
									</button>
								</div>
							</div>

							<div>
								<div>
									<h4>Contact Information</h4>
									{item?.extended_user_view?.users && (
										<p>
											{
												item.extended_user_view.users
													.first_name
											}{" "}
											{
												item.extended_user_view.users
													.last_name
											}
											{" /"}
											{item.extended_user_view.email}
											{" /"}
											{
												item.extended_user_view.users
													.phone
											}
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
				{data
					.filter((item) => item.status)
					.map((item) => (
						<div className={styles.Individuals} key={item.user_id}>
							<div className={styles.Top}>
								<div>
									<h3>
										{
											item?.extended_user_view?.users
												?.institution[0]?.name
										}
									</h3>
									<p>
										{
											item?.extended_user_view?.users
												?.institution[0]?.code
										}
									</p>
								</div>
								<div className={styles.ButtonWrapper}>
									<button
										onClick={() =>
											handleApproveDecline(
												false,
												item.user_id
											)
										}
									>
										Mark as Pending
									</button>
									<button
										onClick={() =>
											handleDelete(item.user_id)
										}
									>
										Delete
									</button>
								</div>
							</div>

							<div>
								<div>
									<h4>Contact Information</h4>
									{item?.extended_user_view?.users && (
										<p>
											{
												item?.extended_user_view?.users
													?.first_name
											}{" "}
											{
												item?.extended_user_view?.users
													?.last_name
											}{" "}
											{
												item?.extended_user_view?.users
													?.phone
											}
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
