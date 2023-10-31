export const TOGGLE_MENU = '[Menu] Togge Menu';

export interface ToggleMenu {
	type: typeof TOGGLE_MENU;
	payload: { isMenuOpen: boolean };
}

export const toggleMenu = (isMenuOpen: boolean): ToggleMenu => {
	return {
		type: TOGGLE_MENU,
		payload: { isMenuOpen },
	};
};

export type UserTypes = ToggleMenu;
