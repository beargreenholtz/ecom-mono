import * as actions from '../actions/menu';

const initialState: State = {
	isMenuOpen: false,
};

export interface State {
	isMenuOpen: boolean;
}

export const reducer = (state: State = initialState, action: actions.UserTypes): State => {
	switch (action.type) {
		case actions.TOGGLE_MENU: {
			return {
				...state,
				isMenuOpen: action.payload.isMenuOpen,
			};
		}

		default: {
			return state;
		}
	}
};
