import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";
import Reviews from "@/components/Reviews";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Heart, Star, Truck, Shield } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useWishlist } from "@/components/WishlistContext";
import { ProductsContext } from "@/components/ProductsContext";
import { useContext } from "react";

export default function ProductPage({ product }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [activeImage, setActiveImage] = useState(0);
  
  if (router.isFallback || !product) {
    return <div>Loading...</div>;
  }

  const inWishlist = isInWishlist(product._id);
  
  const addToCart = () => {
    setSelectedProducts(prev => [...prev, product._id]);
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  // Mock multiple images - in real app, product would have images array
  const images = [product.picture, product.picture, product.picture];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-6">
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-lg">
              <img 
                src={images[activeImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-indigo-600' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category & Rating */}
            <div className="flex items-center gap-4">
              <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="text-amber-400 fill-amber-400" size={18} />
                <span className="font-bold">{product.averageRating?.toFixed(1) || "0.0"}</span>
                <span className="text-slate-500">({product.reviewCount || 0} reviews)</span>
              </div>
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold text-slate-900">${product.price}</span>
                <span className="text-2xl text-slate-400 line-through">${Math.round(product.price * 1.2)}</span>
                <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-bold">
                  Save 20%
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-lg leading-relaxed">
              {product.description || "Premium quality product with modern design and excellent performance. Perfect for everyday use."}
            </p>

            {/* Features */}
            <div className="flex gap-6 py-6 border-y border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Truck className="text-emerald-600" size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Free Shipping</p>
                  <p className="text-sm text-slate-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Shield className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">2 Year Warranty</p>
                  <p className="text-sm text-slate-500">Full coverage</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={addToCart}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all"
              >
                <ShoppingBag size={24} />
                Add to Cart
              </button>
              <button
                onClick={toggleWishlist}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                  inWishlist 
                    ? "bg-rose-500 text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-500"
                }`}
              >
                <Heart size={24} fill={inWishlist ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Reviews Section */}
            <Reviews productId={product._id} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Fetch product data
export async function getServerSideProps({ params }) {
  await initMongoose();
  
  const product = await Product.findById(params.id).lean();
  
  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}