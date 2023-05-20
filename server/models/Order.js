import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  username: {
    type: String,
    required: true,
    ref:'User',
  },
  email: {
    type: String,
    required: true,
    ref: 'User',
  },
  orderItems: [
    {
      name: { type: String, required: true},
      qty: { type: Number, requried: true},
      image: { type: String, required: true},
      price: { type: Number, required: true},
      id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
    }
  ],
  shippingAddress: {
    address: { type: String, required: true},
    city: { type: String, required: true},
    postalCode: { type: String, required: true},
    country: { type: String, requried: true},
  },
  paymentMethod: {
    type: String,
    default: false,
  },
  paymentDetail: {
    orderId: { type: String, required: true},
    paymentId: { type: String },
  },
  shippingPrice: {
    type: Number,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    default: 0.0,
  },
  paidAt:{
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  }
}, { timeStamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;