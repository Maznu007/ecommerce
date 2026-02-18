import { useState, useEffect } from "react";
import Product from "../components/product";
import { initMongoose } from "@/lib/mongoose";
import ProductModel from "@/models/Product";
import Layout from "@/components/layout";
import { Search, Sparkles, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home({ products }) {
  const [phrase, setPhrase] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter products
  let filteredProducts = products;
  if (phrase) {
    filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(phrase.toLowerCase())
    );
  }
  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
  }

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <Layout>
      {/* Sticky Header with Search */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? "glass py-4 shadow-sm" : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-4 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-lg"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-active={selectedCategory === cat}
                className="category-pill whitespace-nowrap"
              >
                {cat === "All" && <Sparkles size={14} className="inline mr-1" />}
                {cat === "Mobiles" && <Zap size={14} className="inline mr-1" />}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      {!phrase && selectedCategory === "All" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 mt-6"
        >
          <div className="relative bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 md:p-12 text-white overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mb-4"
              >
                <TrendingUp size={16} />
                <span className="text-sm font-medium">New Collection 2024</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Discover Premium Tech
              </h1>
              <p className="text-indigo-100 text-lg mb-8 max-w-lg">
                Explore our curated collection of cutting-edge devices designed for the modern lifestyle.
              </p>
              <button 
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-xl"
              >
                Shop Now
              </button>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 right-20 w-64 h-64 bg-violet-500/30 rounded-full blur-2xl" />
          </div>
        </motion.section>
      )}

      {/* Products Section */}
      <div id="products" className="space-y-12 pb-12">
        {categories
          .filter((cat) => cat !== "All")
          .filter((cat) => selectedCategory === "All" || selectedCategory === cat)
          .map((categoryName, idx) => {
            const categoryProducts = filteredProducts.filter(
              (p) => p.category === categoryName
            );
            if (categoryProducts.length === 0) return null;

            return (
              <motion.section
                key={categoryName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 capitalize flex items-center gap-2">
                    {categoryName}
                    <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {categoryProducts.length}
                    </span>
                  </h2>
                  <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                    View All →
                  </button>
                </div>

                <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x">
                  {categoryProducts.map((productInfo, index) => (
                    <motion.div
                      key={productInfo._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="snap-start"
                    >
                      <Product {...productInfo} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            );
          })}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await ProductModel.find().exec();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}