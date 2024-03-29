import express from 'express';
import Product from '../models/product.js';

import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { protectRoute } from '../middleware/authenticateMiddleware.js';

const productRoutes = express.Router();

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.log(err.message);
  }

};

const getProduct = async (req, res) => {
  const id = req.params.id.toString();
  const product = await Product.findById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
}

const createProductReview = asyncHandler(async(req, res) => {
  const {rating, comment, userId, title} = req.body;

  const product = await Product.findById(req.params.id);

  const user = await User.findById(userId);

  if (product) {
    const alreadyReviewed = product.reviews.find((rev) => rev.user.toString() === user._id.toString());

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed');
    }

    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      title,
      user: user._id,
    };

    product.reviews.push(review);

    product.numberOfReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0)/product.reviews.length;
    await product.save();
    res.status(201).json({ message: 'review has been saved '});
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
})

productRoutes.route('/').get(getProducts);
productRoutes.route('/:id').get(getProduct);
productRoutes.route('/reviews/:id').put(protectRoute, createProductReview);

export default productRoutes;
