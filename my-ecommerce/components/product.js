import { useContext, useState } from "react";
import { ProductsContext } from "@/components/ProductsContext";
import { useWishlist } from "@/components/WishlistContext";
import { Plus, Check, ShoppingBag, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Product({ _id, name, price, picture, description }) {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const inWishlist = isInWishlist(_id);
  
  function addProduct(e) {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProducts((prev) => [...prev, _id]);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  }

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(_id);
    }
  };

  return (
    <Link href={`/product/${_id}`} className="group w-72 flex-shrink-0 block">
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          )}
          <img
            src={picture}
            alt={name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              inWishlist 
                ? "bg-rose-500 text-white" 
                : "bg-white/90 text-slate-600 hover:bg-rose-50 hover:text-rose-500"
            }`}
          >
            <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
          </button>

          {/* Quick Add Button */}
          <button
            onClick={addProduct}
            className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform translate-y-16 group-hover:translate-y-0 ${
              selectedProducts.includes(_id)
                ? "bg-emerald-500 text-white" 
                : "bg-white text-slate-900 hover:bg-indigo-600 hover:text-white shadow-lg"
            } ${isAdded ? "scale-125" : "scale-100"}`}
          >
            {isAdded || selectedProducts.includes(_id) ? <Check size={20} /> : <Plus size={20} />}
          </button>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700">
              New
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {name}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                {description || "Premium quality product with modern design"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900">
                ${price}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ${Math.round(price * 1.2)}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-slate-400">
              <ShoppingBag size={16} />
              <span className="text-xs font-medium">
                {selectedProducts.filter(id => id === _id).length} in cart
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}