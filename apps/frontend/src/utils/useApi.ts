import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { Dispatch, AnyAction } from '@reduxjs/toolkit';

import { logout } from '@/store/actions/auth';

type TOtp = {
	readonly encryptedOtpPayload: string;
};
type TResponse = {
	readonly otp?: TOtp;
};

const useApi = async <T extends TResponse>(
	axiosParams: AxiosRequestConfig,
	dispatch: Dispatch<AnyAction>,
	toggleModal?: () => void,
) => {
	try {
		const result = await axios.request<T>(axiosParams);

		if (toggleModal) {
			toggleModal();
		}

		return result;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.status === 401) {
				dispatch({ type: logout });

				return error;
			}

			if (error.status === 500) {
				console.error('Something went wrong');

				return error;
			}

			console.error('Error ', error.response?.data?.message);

			return error;
		} else {
			console.log('An unknown error occurred');

			return error;
		}
	}
};

export default useApi;
