import { useCallback, useState } from 'react';

/**
 * useLocalStorage
 * A React hook that provides a stateful value synchronized with localStorage.
 * @param {string} key - The key to use with localStorage.
 * @param {T | null} defaultValue - Initial value if nothing exists in localStorage.
 * @return {[T | null, (value: T) => void]} - Current value and a setter function.
 */

export const useLocalStorage = <T,>(
	key: string,
	defaultValue: T | null = null,
): [T | null, (value: T) => void] => {
	// Get the initial value from localStorage or fall back to the provided default.
	const storedItem = localStorage.getItem(key);
	const initialData: T | null = storedItem ? JSON.parse(storedItem) : defaultValue;

	// Create a stateful value and a function to update it.
	const [storedData, setStoredData] = useState(initialData);

	/**
	 * persistData
	 * A callback that will update the local state and synchronize with localStorage.
	 * @param {T} value - The new value to set.
	 */

	const persistData = useCallback(
		(value: T) => {
			// Check if value is not null or undefined before setting it
			if (value !== null && value !== undefined) {
				localStorage.setItem(key, JSON.stringify(value));

				return;
			}

			// If value is explicitly null or undefined, remove it from localStorage
			localStorage.removeItem(key);

			// Update local state
			setStoredData(value);
		},
		[key],
	);

	// Return the stateful value and function to update it.
	return [storedData, persistData];
};
