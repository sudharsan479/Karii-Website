import React from "react";
import { 
  ShoppingBag, 
  Search, 
  ExternalLink, 
  Sparkles, 
  ArrowLeft,
  Share2,
  X,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ShopItem } from "../dbHelper";

interface ShopViewProps {
  shopItems: ShopItem[];
}

export default function ShopView({ shopItems }: ShopViewProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState<ShopItem | null>(null);

  const categories = ["All", "Makeup", "Skincare", "Tools & Accessories"];

  const filteredItems = shopItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && item.isActive;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative">
      {/* Background glow */}
      <div className="absolute top-40 left-0 w-80 h-80 bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-mono tracking-widest text-gold-400 uppercase font-semibold">
          Recommended Picks
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-gold-100 mt-2">
          Affiliate Shop
        </h1>
        <p className="text-navy-300 text-xs sm:text-sm mt-3 leading-relaxed">
          The exact, skin-safe, high-performance skincare and makeup products Karshini recommends, uses on-set, and supports. 
        </p>
      </div>

      {/* Search and Category Filter Row */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-10 pb-6 border-b border-gold-500/10">
        {/* Category Selector */}
        <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 -mx-4 px-4 md:px-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-full text-xs font-medium tracking-wider whitespace-nowrap uppercase border cursor-pointer transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-gold-600 to-gold-400 text-navy-950 border-gold-400 font-bold"
                  : "bg-navy-900 text-navy-200 border-gold-500/10 hover:border-gold-500/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-4 top-3 h-4 w-4 text-gold-400/50" />
          <input
            type="text"
            placeholder="Search recommended products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-900 border border-gold-500/15 focus:border-gold-400 rounded-full py-2.5 pl-10 pr-6 text-xs text-navy-50 placeholder-navy-400 outline-none transition-all"
          />
        </div>
      </div>

      {/* Product List Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-navy-900/30 rounded-3xl border border-gold-500/5 max-w-md mx-auto">
          <ShoppingBag className="w-10 h-10 text-gold-500/50 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-semibold text-gold-200">No products match</h3>
          <p className="text-xs text-navy-400 mt-1">There are no recommended products matching your criteria. Try adjusting your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              layoutId={`prod-${item.id}`}
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between border border-gold-500/10 hover:border-gold-500/30 shadow-md group cursor-pointer hover:-translate-y-0.5 transition-all"
            >
              <div className="aspect-square bg-navy-950 border-b border-gold-500/10 relative overflow-hidden shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm px-2.5 py-0.5 border border-gold-500/25 rounded-md text-[9px] font-mono tracking-widest text-gold-400 uppercase">
                  {item.category}
                </div>
              </div>

              <div className="p-4 text-left flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-serif font-bold text-sm tracking-wide text-gold-100 group-hover:text-gold-300 transition-colors line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-navy-300 text-xs mt-1.5 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-navy-800">
                  <span className="font-mono text-xs font-bold text-gold-400">{item.price}</span>
                  <span className="text-[10px] text-gold-300 hover:text-gold-100 font-bold tracking-widest uppercase flex items-center space-x-1">
                    <span>View Detail</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Affiliate Disclaimer banner */}
      <div className="mt-16 text-center max-w-xl mx-auto p-5.5 bg-navy-900/50 rounded-2xl border border-gold-500/10">
        <div className="flex items-start space-x-3 text-left">
          <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-navy-400 leading-relaxed">
            <span className="font-semibold text-navy-200">Affiliate Disclosure:</span> Some of the links on this page are affiliate links. If you click on them and make a purchase, Vivid Spark by Karshini may earn a micro commission at absolutely zero additional expense to you. We strictly list products we trust and utilize ourselves.
          </p>
        </div>
      </div>

      {/* PRODUCT DETAIL POPUP / DRAWER PANEL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-md"
            />

            {/* Product card container */}
            <motion.div
              layoutId={`prod-${selectedProduct.id}`}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-navy-900 p-6 sm:p-8 rounded-3xl border border-gold-500/25 shadow-2xl z-10 text-left overflow-y-auto max-h-[90vh]"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 text-navy-300 hover:text-gold-400 rounded-full hover:bg-navy-950 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                {/* Left image column */}
                <div className="md:col-span-5 aspect-square rounded-2xl overflow-hidden border border-gold-500/10 bg-navy-950">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right detail column */}
                <div className="md:col-span-7 space-y-5">
                  <div className="space-y-1.5">
                    <span className="px-2 py-0.5 bg-gold-500/10 border border-gold-500/20 text-[9px] font-mono tracking-wider text-gold-400 rounded uppercase">
                      {selectedProduct.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-100">
                      {selectedProduct.name}
                    </h3>
                    <p className="font-mono text-base font-bold text-gold-400">{selectedProduct.price}</p>
                  </div>

                  <p className="text-navy-200 text-xs sm:text-sm leading-relaxed border-t border-navy-800 pt-3">
                    {selectedProduct.description}
                  </p>

                  <div className="p-4 bg-gold-500/5 rounded-xl border border-gold-500/10 space-y-1">
                    <h5 className="text-[10px] font-mono uppercase tracking-wider text-gold-400 font-bold flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Artist Recommendation Notes</span>
                    </h5>
                    <p className="text-[11px] text-navy-300 leading-relaxed">
                      "I highly advocate this {selectedProduct.category.toLowerCase()} option because it maintains moisture bounds and operates flawlessly during warm, humid outdoor wedding environments."
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={selectedProduct.affiliateLink}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex-1 py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-navy-950 font-bold text-xs tracking-widest uppercase rounded-xl hover:shadow-lg text-center hover:shadow-gold-500/10 transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <span>Buy Recommendation</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="px-5 py-3 border border-gold-500/15 hover:border-gold-500/40 text-gold-300 hover:text-gold-200 text-xs tracking-widest uppercase rounded-xl transition-colors cursor-pointer text-center font-bold"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
