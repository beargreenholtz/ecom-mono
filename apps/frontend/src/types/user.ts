export type TValidateInputs = {
	username: string;
	email: string;
	password: string;
	name: string;
	confirmPassword: string;
};

export type TUser = {
	_id: string;
	name: string;
	email: string;
	role: string;
};
