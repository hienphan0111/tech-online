import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import {protectRoute, admin} from '../middleware/authenticateMiddleware.js';

const orderRoutes = express.Router();

const createOrder = asyncHandler( async(req, res) => {
  const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice, paymentDetail, userInfo } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order Items');
  } else {
    const order = new Order({
      orderItems,
      user: userInfo._id,
      username: userInfo.name,
      email: userInfo.email,
      shippingAddress,
      paymentMethod,
      paymentDetail,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }

});

const getOrders = async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
};

const deleteOrder = asyncHandler(async(req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (order) {
    res.json(order)
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const setDelivered = asyncHandler(async(req, res) => {
  const order = await Order.findById(req.params.id);

  console.log(req.body);
  if (order) {
    order.isDelivered = true;
    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error('Order could not be updated')
  }
});


orderRoutes.route('/:id').delete(protectRoute, admin, deleteOrder);
orderRoutes.route('/').post(protectRoute, createOrder);
orderRoutes.route('/:id').put(protectRoute, admin, setDelivered);
orderRoutes.route('/').get(protectRoute, admin, getOrders);

export default orderRoutes;