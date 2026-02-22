import { useWishlist } from "@/components/WishlistContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { wishlist, removeFromWishlist, loading: wishlistLoading } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/account");
      return;
    }
    
    if (status === "authenticated") {
      fetchWishlistProducts();
    }
  }, [session, status, wishlist]);

  const fetchWishlistProducts = async () => {
    try {
      const res = await fetch("/api/wishlist");
      const data = await res.json();
      // The API returns populated products, not just IDs
      setProducts(data.wishlist || []);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
    setLoading(false);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <ArrowLeft size={24} className="text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">My Wishlist</h1>
          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
            {products.length} items
          </span>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-rose-500" size={40} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
            <p className="text-slate-600 mb-6">Save items you love for later</p>
            <Link href="/" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    src={product.picture}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Quick Add to Cart */}
                  <Link
                    href={`/?add=${product._id}`}
                    className="absolute bottom-4 right-4 bg-white text-slate-900 px-4 py-2 rounded-xl font-bold text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:text-white"
                  >
                    Add to Cart
                  </Link>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-lg mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                    {product.description || "Premium quality product"}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-slate-900">
                        ${product.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through ml-2">
                        ${Math.round(product.price * 1.2)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}