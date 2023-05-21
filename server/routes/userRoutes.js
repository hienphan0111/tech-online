import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import {protectRoute, admin } from '../middleware/authenticateMiddleware.js';
import Order from '../models/Order.js';

const userRoutes = express.Router();

const getToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: '30d'});
}

const loginUser = asyncHandler(async(req, res) => {
  const { email, password} = req.body;
  const user = await User.findOne({email});

  if( user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: getToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(401)
    throw new Error('Invalid User or Password');
  }
});

const registerUser = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('We have already an account with that email address');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAmin,
      token: getToken(user._id),
    });
  } else {
    res.json(400);
    throw new Error('Invalid user data');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: getToken(updateUser._id),
      createAt: updateUser.createAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserOrders = asyncHandler(async(req, res) => {
  const orders = await Order.find({user: req.params.id});
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('No order found');
  }
})

const getUsers = asyncHandler(async(req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async(req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404);
    throw new Error('This user could not be found');
  }
});

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/profile/:id').put(protectRoute, updateUserProfile);
userRoutes.route('/:id').get(protectRoute, getUserOrders);
userRoutes.route('/').get(protectRoute, admin, getUsers);
userRoutes.route('/:id').delete(protectRoute, admin, deleteUser);

export default userRoutes;