import express from 'express';
import Product from '../models/product.js';

const productRoutes = express.Router();

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.log(err.message);
  }

};

productRoutes.route('/').get(getProducts);

export default productRoutes;
