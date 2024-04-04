interface InstitutionsType {
	id: string;
	created_at: string;
	is_verified: boolean;
	name: string;
	code: string;
	created_by: string;
	approved_by: string | null;
	created_by_user: UserInstitutionType;
}

interface UserInstitutionType {
	id: string;
	email: string;
	phone: string;
	last_name: string;
	first_name: string;
	institution: [
		{
			name: string;
			code: string;
		}
	];
}

interface AdminApprovalData {
	user_id: string;
	role_id: string;
	created_at: string;
	status: boolean;
	extended_user_view: {
		email: string;
		users: UserInstitutionType;
	};
}
