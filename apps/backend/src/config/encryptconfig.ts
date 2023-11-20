import crypto from 'node:crypto';

export const encryptionConfig = {
	algorithm: 'aes-256-cbc',
	securityKey: crypto.randomBytes(32),
	initVector: crypto.randomBytes(16),
};
