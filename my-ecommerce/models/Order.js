import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    quantity: Number,
    price: Number,
    picture: String
  }],
  totalAmount: Number,
  shippingAddress: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: { type: String, default: 'pending' },
  stripeSessionId: String
}, { timestamps: true });

const Order = models?.Order || model('Order', OrderSchema);
export default Order;