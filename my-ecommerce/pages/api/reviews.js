import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";

// ✅ FIXED: Use the REAL NextAuth config, not lib/auth
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  console.log("=== REVIEWS API CALLED ===");
  console.log("Method:", req.method);

  try {
    await initMongoose();
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    return res.status(500).json({ error: "Database connection failed" });
  }

  // GET - Fetch reviews
  if (req.method === "GET") {
    try {
      const { productId } = req.query;
      console.log("GET - Product ID:", productId);

      if (!productId) {
        return res.status(400).json({ error: "Product ID required" });
      }

      const product = await Product.findById(productId).select(
        "reviews averageRating reviewCount"
      );

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      console.log(
        "✅ Found product, reviews count:",
        product.reviews?.length || 0
      );

      return res.status(200).json({
        reviews: product.reviews || [],
        averageRating: product.averageRating || 0,
        reviewCount: product.reviewCount || 0,
      });
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({ error: "Failed to fetch reviews" });
    }
  }

  // POST - Add review
  if (req.method === "POST") {
    console.log("POST - Body:", req.body);

    try {
      // ⬅️ FIXED: Now pulls session.user.id correctly
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        console.log("❌ No session found");
        return res.status(401).json({ error: "Not authenticated" });
      }

      console.log("✅ Session user:", session.user.email);

      const { productId, rating, comment } = req.body;

      if (!productId || !rating) {
        console.log("❌ Missing fields:", { productId, rating, comment });
        return res
          .status(400)
          .json({ error: "Product ID and rating required" });
      }

      const product = await Product.findById(productId);

      if (!product) {
        console.log("❌ Product not found:", productId);
        return res.status(404).json({ error: "Product not found" });
      }

      console.log("✅ Found product:", product.name);

      // Initialize reviews array if doesn't exist
      if (!product.reviews) {
        product.reviews = [];
      }

      // Check if user already reviewed
      const existingIndex = product.reviews.findIndex(
        (r) => r.userId && r.userId.toString() === session.user.id
      );

      const newReview = {
        userId: session.user.id, // <-- NOW VALID
        userName: session.user.name || "Anonymous",
        rating: parseInt(rating),
        comment: comment || "",
        createdAt: new Date(),
      };

      if (existingIndex >= 0) {
        console.log("📝 Updating existing review");
        product.reviews[existingIndex] = newReview;
      } else {
        console.log("📝 Adding new review");
        product.reviews.push(newReview);
      }

      // Recalculate average
      const totalRating = product.reviews.reduce(
        (acc, r) => acc + (r.rating || 0),
        0
      );
      product.averageRating = totalRating / product.reviews.length;
      product.reviewCount = product.reviews.length;

      console.log("💾 Saving product...");
      await product.save();
      console.log("✅ Product saved successfully");

      return res.status(200).json({
        message: "Review added successfully",
        review: newReview,
        averageRating: product.averageRating,
        reviewCount: product.reviewCount,
      });
    } catch (error) {
      console.error("❌ POST error:", error);
      return res.status(500).json({
        error: "Failed to add review: " + error.message,
        details: error.stack,
      });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res
    .status(405)
    .json({ error: `Method ${req.method} not allowed` });
}