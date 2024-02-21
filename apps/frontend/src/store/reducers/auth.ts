import * as actions from '../actions/auth';

const initialState: State = {
	isAuthenticated: false,
};

export type State = {
	isAuthenticated: boolean;
};

export const reducer = (state: State = initialState, action: actions.AuthActionTypes): State => {
	switch (action.type) {
		case actions.LOGIN_SUCCESS: {
			return {
				...state,
				isAuthenticated: true,
			};
		}

		case actions.LOGOUT: {
			return {
				...state,
				isAuthenticated: false,
			};
		}

		default: {
			return state;
		}
	}
};
