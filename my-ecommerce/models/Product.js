import { model, models, Schema } from "mongoose";

const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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

// ⭐ FIXED — Removed `next()` completely (modern Mongoose middleware)
ProductSchema.pre("save", function () {
  if (this.reviews && this.reviews.length > 0) {
    const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
    this.averageRating = total / this.reviews.length;
    this.reviewCount = this.reviews.length;
  } else {
    this.averageRating = 0;
    this.reviewCount = 0;
  }
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;
