declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly NEXT_PUBLIC_BASE_URL: string;
			readonly NEXT_PUBLIC_DEMO_URL: string;
			readonly NEXT_PUBLIC_BACkEND_URL: string;
			readonly NEXT_PUBLIC_CLIENT_URL: string;
		}
	}
}

export {};
