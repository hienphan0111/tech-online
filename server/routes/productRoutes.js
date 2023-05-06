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

productRoutes.route('/').get(getProducts);
productRoutes.route('/:id').get(getProduct);

export default productRoutes;
