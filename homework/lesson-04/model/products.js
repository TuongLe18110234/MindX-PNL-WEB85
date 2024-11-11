import mongoose from 'mongoose';
import Collections from '../database/collection.js';

// Định nghĩa schema và model cho Product
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
});

const ProductModel = mongoose.model(Collections.PRODUCTS, productSchema);
export default ProductModel;