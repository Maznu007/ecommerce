import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    await initMongoose();
  } catch (error) {
    return res.status(500).json({ error: "Database connection failed" });
  }

  // GET - Fetch wishlist with FULL product details
  if (req.method === "GET") {
    try {
      const user = await User.findById(session.user.id).populate({
        path: 'wishlist',
        model: 'Product', // Make sure this matches your Product model name
        select: 'name description price picture category' // Select fields you need
      });
      
      // Transform to ensure proper format
      const wishlist = user.wishlist.map(product => ({
        _id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        picture: product.picture,
        category: product.category
      }));
      
      return res.status(200).json({ wishlist });
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  }

  // POST - Add to wishlist
  if (req.method === "POST") {
    try {
      const { productId } = req.body;
      
      if (!productId) {
        return res.status(400).json({ error: "Product ID required" });
      }

      await User.findByIdAndUpdate(
        session.user.id,
        { $addToSet: { wishlist: productId } }
      );
      
      return res.status(200).json({ message: "Added to wishlist" });
    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({ error: "Failed to add to wishlist" });
    }
  }

  // DELETE - Remove from wishlist
  if (req.method === "DELETE") {
    try {
      const { productId } = req.body;
      
      if (!productId) {
        return res.status(400).json({ error: "Product ID required" });
      }

      await User.findByIdAndUpdate(
        session.user.id,
        { $pull: { wishlist: productId } }
      );
      
      return res.status(200).json({ message: "Removed from wishlist" });
    } catch (error) {
      console.error("DELETE error:", error);
      return res.status(500).json({ error: "Failed to remove from wishlist" });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}