import { supabase } from "../../utils/supabase";

export const loginUser = async (data1: any) => {
	try {
		let { data, error } = await supabase.auth.signInWithPassword({
			email: data1.usernameOrEmail,
			password: data1.password,
		});
		if (error) {
			throw error.message;
		} else {
			localStorage.setItem(
				"accessToken",
				data.session?.access_token as string
			);
			localStorage.setItem("userId", data.user?.id as string);
			let { data: user_has_role, error } = await supabase.rpc("user_has_role", {
				check_role_name: "dukes",
				check_user_id: data.user?.id,
			});
			if(user_has_role) {
				window.location.href = "/admindashboard";
			}
			if (error) console.error(error);
			else console.log(data);
			return data;
		}
	} catch (error) {
		console.error("Registration API error:", error);
		throw error;
	}
};
