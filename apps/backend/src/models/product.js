import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    category: { type: String, required: false },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: false },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    reviews: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Review' }],
});
export default mongoose.model('Product', productSchema);
