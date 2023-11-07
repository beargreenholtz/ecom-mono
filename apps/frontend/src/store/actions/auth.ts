export const LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';

export const LOGOUT = '[Auth] LOGOUT';

export interface LoginSuccessAction {
	type: typeof LOGIN_SUCCESS;
	payload: {
		isAuthenticated: boolean;
	};
}

export interface LogoutAction {
	type: typeof LOGOUT;
	payload: {
		isAuthenticated: boolean;
	};
}

export const loginSuccess = (token: string): LoginSuccessAction => {
	localStorage.setItem('jwt_token', token);

	return {
		type: LOGIN_SUCCESS,
		payload: { isAuthenticated: true },
	};
};

export const logout = (): LogoutAction => {
	localStorage.removeItem('jwt_token');

	return {
		type: LOGOUT,
		payload: { isAuthenticated: false },
	};
};

export type AuthActionTypes = LoginSuccessAction | LogoutAction;
