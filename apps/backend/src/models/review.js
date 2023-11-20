import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
});
export default mongoose.model('Review', reviewSchema);
