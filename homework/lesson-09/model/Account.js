import mongoose from "mongoose"

const accountSchema = new mongoose.Schema({
    email: String,
    password: String,
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        // 2, 1, 3
        enum: ['MANAGER', 'CUSTOMER', 'EMPLOYEE'],
        default: 'CUSTOMER'
    }
});

const AccountModel = mongoose.model('accounts', accountSchema);

export default AccountModel;

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzM4MzBmZDZmOGQ0ZTMwZTEyZjhhN2IiLCJlbWFpbCI6ImFjY291bnQxQGdtYWlsLmNvbSIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTczMTczNjE4MiwiZXhwIjoxNzMxNzM5NzgyfQ.E4BjqdzHeW3e4HwPRdrnReihMRdOmgwWp_3EHwPFfb4
*/