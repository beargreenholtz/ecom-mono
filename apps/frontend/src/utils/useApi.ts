import axios, { type AxiosRequestConfig } from 'axios';
import type { Dispatch, AnyAction } from '@reduxjs/toolkit';

import * as authActions from '@/store/actions/auth';
import type { TUserInfo } from '@/types/api/cart';
import type { TItem } from '@/types/api/item';
import { logout } from '@/store/actions/auth';

type TOtp = {
	readonly encryptedOtpPayload: string;
};

type TResponse = {
	readonly otp?: TOtp;
	readonly allItems?: TItem[];
	readonly item?: TItem;
	readonly status: number;
	readonly userInfo: TUserInfo;
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
				dispatch(authActions.logout());

				return error;
			}

			if (error.status === 500) {
				console.error('Something went wrong');

				return error;
			}

			console.error('Error ', error.response?.data?.message);

			return error;
		}
	}
};

export default useApi;
