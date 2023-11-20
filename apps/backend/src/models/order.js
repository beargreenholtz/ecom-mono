import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    status: {
        type: String,
        enum: ['pending, aproved, shipped, arrived'],
        default: 'pending',
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
});
export default mongoose.model('Order', orderSchema);
