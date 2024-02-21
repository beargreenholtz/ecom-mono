import type { Document, Model } from 'mongoose';
import mongoose from 'mongoose';

interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5,
	},
});

const OTP: Model<IOtp> = mongoose.model<IOtp>('OTP', otpSchema);

export default OTP;
