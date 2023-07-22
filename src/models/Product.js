import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    sku: {
        type: String,
        required: [true, 'Please enter a sku'],
        unique: true
    },
    category: {
        type: String,
        required: [true, 'Please enter a category'],
    },
    quantity: {
        type: Number,
        required: [true, 'Please enter a quantity'],
    },
    userId: {
        type: String,
        required: [true, 'Please enter a userId'],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
    },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;