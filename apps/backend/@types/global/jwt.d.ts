import type jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
	export interface JwtPayload {
		userId: string;
		email: string;
	}

	function verify(token: string, secretOrPublicKey: jwt.Secret, options?: jwt.VerifyOptions): JwtPayload;
}
