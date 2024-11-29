import mongoose from "mongoose"

// Bảng nhà ở 
const propertiesSchema = new mongoose.Schema({
    address: String,
    price: Number,
    area: Number,
    status: {
        type: String,
        enum: ["Đang bán", "Đã bán", "Dừng bán"],
        default: "Đang bán"
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees'
    }
});

const PropertiesModel = mongoose.model('properties', propertiesSchema);

export default PropertiesModel;