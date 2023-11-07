import axios from 'axios';

export const backendApi = axios.create({
	baseURL: import.meta.env.VITE_BACkEND_URL,
});
