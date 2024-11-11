import express from 'express';
import mongoose from 'mongoose';

import CustomerModel from './model/customers.js';
import ProductModel from './model/products.js';
import OrderModel from './model/orders.js';

// Kết nối MongoDB
mongoose.connect('mongodb+srv://web81_admin:web81_admin_password@cluster0.f51ge.mongodb.net/WEB85');

const app = express();
app.use(express.json());

// 1. API lấy toàn bộ danh sách khách hàng
app.get('/customers', async (req, res) => {
    try {
        const customers = await CustomerModel.find();
        res.status(200).send({
            message: 'Get customers successfully!',
            data: customers,
            success: true
        });
    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
            success: false
        });
    }
});

// 2. API lấy thông tin chi tiết của một khách hàng
app.get('/customers/:id', async (req, res) => {
    try {
        const customer = await CustomerModel.findById(req.params.id);
        if (!customer) throw new Error('Customer not found');
        res.status(200).send({
            message: 'Get customer successfully!',
            data: customer,
            success: true
        });
    } catch (error) {
        res.status(404).send({
            message: error.message,
            data: null,
            success: false
        });
    }
});

// 3. API lấy danh sách đơn hàng của một khách hàng cụ thể
app.get('/customers/:customerId/orders', async (req, res) => {
    try {
        const orders = await OrderModel.find({ customerId: req.params.customerId }).populate('customerId', 'name email');
        res.status(200).send({
            message: 'Get orders successfully!',
            data: orders,
            success: true
        });
    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
            success: false
        });
    }
});

// 4. API lấy các đơn hàng có tổng giá trị trên 10 triệu
app.get('/orders/highvalue', async (req, res) => {
    try {
        const highValueOrders = await OrderModel.find({ totalPrice: { $gt: 10000000 } });
        res.status(200).send({
            message: 'Get high-value orders successfully!',
            data: highValueOrders,
            success: true
        });
    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
            success: false
        });
    }
});

// 5. API lọc danh sách sản phẩm theo khoảng giá
app.get('/products', async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        const filter = {};
        if (minPrice) filter.price = { $gte: parseFloat(minPrice) };
        if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };

        console.log(filter);

        const products  = await ProductModel.find(filter);
        
        res.status(200).send({
            message: 'Get producs successfully!',
            data: products,
            success: true
        })
    } catch (error) {
        // Xử lý khi có lỗi xảy ra
        res.status(200).send({
            message: error.message,
            data: null,
            success: false
        })
    }
});

// 6. API thêm mới khách hàng
app.post('/customers', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const existingCustomer = await CustomerModel.findOne({ email });
        if (existingCustomer) throw new Error('Email already exists');
        const newCustomer = await CustomerModel.create({ name, email, age });
        res.status(201).send({
            message: 'Customer created successfully!',
            data: newCustomer,
            success: true
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            data: null,
            success: false
        });
    }
});

// 7. API tạo mới đơn hàng
app.post('/orders', async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body;

        const product = await ProductModel.findById(productId);
        if (!product || product.quantity < quantity) throw new Error('Invalid product quantity');

        const totalPrice = product.price * quantity;
        const newOrder = await OrderModel.create({ customerId, productId, quantity, totalPrice });

        product.quantity -= quantity;
        await product.save();

        res.status(201).send({
            message: 'Order created successfully!',
            data: newOrder,
            success: true
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            data: null,
            success: false
        });
    }
});

// 8. API cập nhật số lượng sản phẩm trong đơn hàng
app.put('/orders/:orderId', async (req, res) => {
    try {
        const { quantity } = req.body;

        const order = await OrderModel.findById(req.params.orderId);
        if (!order) throw new Error('Order not found');

        const product = await ProductModel.findOne({ _id: order.productId });
        if (!product || product.quantity + order.quantity < quantity) throw new Error('Insufficient product stock');

        product.quantity += order.quantity - quantity;
        order.quantity = quantity;
        order.totalPrice = product.price * quantity;

        await order.save();
        await product.save();

        res.status(200).send({
            message: 'Order updated successfully!',
            data: order,
            success: true
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            data: null,
            success: false
        });
    }
});

// 9. API xóa khách hàng
app.delete('/customers/:id', async (req, res) => {
    try {
        const deletedCustomer = await CustomerModel.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) throw new Error('Customer not found');
        res.status(200).send({
            message: 'Customer deleted successfully',
            data: deletedCustomer,
            success: true
        });
    } catch (error) {
        res.status(404).send({
            message: error.message,
            data: null,
            success: false
        });
    }
});

// Khởi động server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
