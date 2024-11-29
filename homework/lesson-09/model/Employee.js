import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    department: String,
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accounts'
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'managers'
    }
});

const EmployeeModel = mongoose.model('employees', employeeSchema);

export default EmployeeModel;