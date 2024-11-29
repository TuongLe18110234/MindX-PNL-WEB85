import mongoose from "mongoose"

const depositOrderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'properties'
    },
    depositAmount: Number,
    date: Date,
    status: {
        type: String,
        enum: ["Đã thanh toán", "Chờ xủ lý", "Đã hủy"]
    }
});

const DepositOrderModel = mongoose.model('depositOrders', depositOrderSchema);

export default DepositOrderModel;