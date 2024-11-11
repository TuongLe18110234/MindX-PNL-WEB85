import mongoose from 'mongoose';
import Collections from '../database/collection.js';

// Định nghĩa schema và model cho Customer
const customerSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    age: Number,
})

const CustomerModel = mongoose.model(Collections.CUSTOMERS, customerSchema);
export default CustomerModel;