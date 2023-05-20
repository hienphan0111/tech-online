import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import protectRoute from '../middleware/authenticateMiddleware.js';

const orderRoutes = express.Router();

const createOrder = asyncHandler( async(req, res) => {
  const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice, paymentDetails, userInfo } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order Items');
  } else {
    const order = new Order({
      orderItems,
      user: userInfo._id,
      userName: userInfo.name,
      email: userInfo.email,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }

});

orderRoutes.route('/order').post(protectRoute, createOrder);

export default orderRoutes;