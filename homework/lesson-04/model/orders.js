import mongoose from 'mongoose';
import Collections from '../database/collection.js';

// Định nghĩa schema và model cho Order
const orderSchema = new mongoose.Schema({
    customerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: Collections.CUSTOMERS,
        required: true
    },
    productId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: Collections.PRODUCTS,
        required: true
    },
    quantity: Number,
    totalPrice: Number,
})

const OrderModel = mongoose.model(Collections.ORDERS, orderSchema);
export default OrderModel;