import express from 'express';
import mongoose from 'mongoose';
import AccountModel from './model/Account.js';
import CustomerModel from './model/Customer.js';
import EmployeeModel from './model/Employee.js';
import ManagerModel from './model/Manager.js';

// Kết nối MongoDB
mongoose.connect('mongodb+srv://web81_admin:web81_admin_password@cluster0.f51ge.mongodb.net/WEB85');

const app = express();
app.use(express.json());

// Câu 3: Đăng ký tài khoản
app.post("/register", async function (req, res) {
    // Validate email tồn tài hay chưa
    // Validate password > 6 && < 64 && chứa chữ hoa thường số, ký tự đặc biệt
    const newUser = {
        email: `test-${Date.now()}@gmail.com`,
        password: "123456"
    }

    await AccountModel.save(newUser)

    return res.json({
        message: "success",
        newUser
    })
})

// Câu 4: Đăng nhập

app.post("/login", async function (req, res) {
    // Validate email tồn tài hay chưa
    // Validate password > 6 && < 64 && chứa chữ hoa thường số, ký tự đặc biệt
    const user = AccountModel.findOne({ email: req.body.email })

    // Nếu user tồn tại => Kiểm tra password thông qua bcrypt

    // Nếu password chính xác => Kiểm tra trạng thái isActive
    if (user.isActive) {
        return res.json({
            message: "success",
            data: {
                id: user.id,
                email: user.email, 
                isActive: user.isActive,
                role: user.role
            }
        })
    } else {
        return res.json({
            message: "Tài khoản chưa kích hoạt, vui lòng liên hệ admin",
        })
    }
})


// Câu 5: Lấy thông tin dựa trên vai trò đang đăng nhập
app.post("/info", async function (req, res) {
    // Lấy ra role người dùng đang đăng nhập
    const infoModel = {
        "CUSTOMER": CustomerModel,
        "EMPLOYEE": EmployeeModel,
        "MANAGER": ManagerModel
    }[req.body.role]

    const currentUser = await infoModel.findOneById(req.body.id)

    return res.json({
        message: "success",
        data: currentUser
    })
})

// Câu 6: Thêm dữ liệu cho user tùy thuộc vào vai trò
app.post("/add-info", async function (req, res) {
    // Lấy ra role người dùng đang đăng nhập
    const infoModel = {
        "CUSTOMER": CustomerModel,
        "EMPLOYEE": EmployeeModel,
        "MANAGER": ManagerModel
    }[req.body.role]

    if(req.body.role == "CUSTOMER") {
        // Validate address gửi lên nếu có
        const newCustomer = {

        }

        await infoModel.create(newCustomer)
    } else {
        // Validate department gửi lên nếu có
        const newOtherRole = {

        }

        await infoModel.create(newOtherRole)
    }
   
})

// Khởi động server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
