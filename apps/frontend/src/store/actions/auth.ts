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

export const loginSuccess = (): LoginSuccessAction => {
	return {
		type: LOGIN_SUCCESS,
		payload: { isAuthenticated: true },
	};
};

export const logout = (): LogoutAction => {
	return {
		type: LOGOUT,
		payload: { isAuthenticated: false },
	};
};

export type AuthActionTypes = LoginSuccessAction | LogoutAction;
