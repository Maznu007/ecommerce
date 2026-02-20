import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    default: []
  }],
  addresses: [{
    street: String,
    city: String,
    postalCode: String,
    country: String,
    isDefault: Boolean
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
    default: []
  }]
}, { timestamps: true });

const User = models?.User || model('User', UserSchema);

export default User;