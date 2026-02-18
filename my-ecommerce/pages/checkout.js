import Layout from "../components/layout";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../components/ProductsContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Minus, 
  Plus, 
  Trash2, 
  MapPin, 
  User, 
  Mail, 
  CreditCard,
  Truck,
  Package
} from "lucide-react";

export default function CheckoutPage() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedProducts.length > 0) {
      const uniqIds = [...new Set(selectedProducts)];
      fetch("/api/products?ids=" + uniqIds.join(","))
        .then((response) => response.json())
        .then((json) => {
          setProductsInfos(json);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [selectedProducts]);

  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  }

  function removeProduct(id) {
    setSelectedProducts((prev) => prev.filter((pid) => pid !== id));
  }

  const deliveryPrice = selectedProducts.length > 0 ? 5 : 0;
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfos.find((p) => p._id === id)?.price || 0;
      subtotal += price;
    }
  }
  const total = subtotal + deliveryPrice;

  // Group products for display
  const groupedProducts = productsInfos.map((product) => ({
    ...product,
    quantity: selectedProducts.filter((id) => id === product._id).length,
  })).filter((p) => p.quantity > 0);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <Package className="text-indigo-600" size={32} />
          Shopping Cart
        </h1>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 h-32 animate-pulse" />
            ))}
          </div>
        ) : groupedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h3>
            <p className="text-slate-500 mb-6">Looks like you haven't added anything yet</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Start Shopping
            </a>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {groupedProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex gap-4"
                  >
                    <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={product.picture}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-slate-900 truncate">{product.name}</h3>
                          <p className="text-sm text-slate-500 line-clamp-1 mt-1">
                            {product.description}
                          </p>
                        </div>
                        <button
                          onClick={() => removeProduct(product._id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold text-slate-900">
                          ${product.price}
                        </span>
                        
                        <div className="flex items-center gap-3 bg-slate-100 rounded-xl p-1">
                          <button
                            onClick={() => lessOfThisProduct(product._id)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-slate-600 hover:text-indigo-600 shadow-sm transition-all"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {product.quantity}
                          </span>
                          <button
                            onClick={() => moreOfThisProduct(product._id)}
                            className="w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 shadow-sm transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <CreditCard size={20} className="text-indigo-600" />
                  Order Summary
                </h2>

                <form action="/api/checkout" method="POST" className="space-y-4">
                  <div className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-modern pl-10"
                        type="text"
                        placeholder="Full name"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-modern pl-10"
                        type="email"
                        placeholder="Email address"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="input-modern pl-10"
                        type="text"
                        placeholder="Street address"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <Truck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="input-modern pl-10"
                        type="text"
                        placeholder="City & Postal code"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4 mt-6 space-y-3">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery</span>
                      <span className="font-medium">${deliveryPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-slate-900 pt-3 border-t border-slate-200">
                      <span>Total</span>
                      <span className="text-indigo-600">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <input type="hidden" name="products" value={selectedProducts.join(",")} />
                  
                  <button
                    type="submit"
                    disabled={!name || !email || !address || !city}
                    className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200 mt-6 flex items-center justify-center gap-2"
                  >
                    <CreditCard size={20} />
                    Pay ${total.toFixed(2)}
                  </button>
                </form>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <div className="w-8 h-5 bg-slate-200 rounded" /> {/* Visa */}
                  <div className="w-8 h-5 bg-slate-200 rounded" /> {/* Mastercard */}
                  <span>Secure SSL Encryption</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}