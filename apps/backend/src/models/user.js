import uniqueValidator from 'mongoose-unique-validator';
import mongoose from 'mongoose';
import { passowrdvaliteregex } from '../utils/password-validate';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: false,
        validate: {
            validator: (password) => {
                return passowrdvaliteregex.test(password);
            },
            message: 'Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 special character.',
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator', 'guest'],
        default: 'user',
        required: false,
    },
    googleId: { type: String, required: false },
    resetPasswordToken: { type: String, required: false },
    resetPasswordTokenExpiration: { type: Date, required: false },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    orders: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Order' }],
    reviews: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Review' }],
});
userSchema.plugin(uniqueValidator);
export default mongoose.model('User', userSchema);
