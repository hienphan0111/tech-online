import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true},
  rating: { type: String, required: true},
  comment: { type: String, required: true},
  title: { type: String, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, {timestamps: true});

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
    default: 0
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    required: true,
  },
  productIsNew: {
    type: Boolean,
    default: false,
  },
  reviews: [reviewSchema],
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;
