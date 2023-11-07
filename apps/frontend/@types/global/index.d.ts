/// <reference types="vite/client" />
declare global {
	declare module '*.module.css';
	declare module '*.module.scss';

	namespace NodeJS {
		interface ProcessEnv {
			readonly BASE_URL: string;
			readonly DEMO_URL: string;
			readonly VITE_BACkEND_URL: string;
			readonly VITE_CLIENT_URL: string;
		}
	}
}

export {};
