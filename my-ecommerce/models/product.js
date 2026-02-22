import { model, models, Schema } from "mongoose";

const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, default: "Anonymous" },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  picture: String,
  reviews: [ReviewSchema],
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
});

// Calculate average rating before saving
ProductSchema.pre('save', function(next) {
  if (this.reviews.length > 0) {
    this.averageRating = this.reviews.reduce((acc, review) => acc + review.rating, 0) / this.reviews.length;
    this.reviewCount = this.reviews.length;
  }
  next();
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;