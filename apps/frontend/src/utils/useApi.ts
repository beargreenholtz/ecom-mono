import axios, { type AxiosRequestConfig } from 'axios';
import type { Dispatch, AnyAction } from '@reduxjs/toolkit';

import { logout } from '@/store/actions/auth';

const useApi = async (
	axiosParams: AxiosRequestConfig,
	dispatch: Dispatch<AnyAction>,
	toggleModal?: () => void,
) => {
	try {
		const result = await axios.request(axiosParams);

		if (toggleModal) {
			toggleModal();
		}

		return result;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.status === 401) {
				dispatch({ type: logout });
			}

			if (error.status === 500) {
				console.error('Something went wrong');
			}

			console.error('Error during registration:', error.response?.data?.message);

			return error;
		} else {
			console.log('An unknown error occurred');
		}
	}
};

export default useApi;
