import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { PortfolioItem } from "../dbHelper";
import { Camera, Sparkles } from "lucide-react";

interface PortfolioViewProps {
  portfolio: PortfolioItem[];
}

export default function PortfolioView({ portfolio }: PortfolioViewProps) {
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [visibleCount, setVisibleCount] = React.useState(8);

  const filters = [
    "All",
    "Bridal HD",
    "Semi HD",
    "Airbrush",
    "Glam",
    "Mehendi",
    "Drape & Jewels",
  ];

  // Filter items
  const filteredItems = portfolio.filter((item) => {
    if (selectedFilter === "All") return true;
    return item.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  const displayedItems = filteredItems.slice(0, visibleCount);

  // Divide items into 2 or 3 columns to build a perfect Pinterest-style Masonry layout
  const getMasonryColumns = (items: PortfolioItem[], colCount: number) => {
    const cols: PortfolioItem[][] = Array.from({ length: colCount }, () => []);
    items.forEach((item, index) => {
      cols[index % colCount].push(item);
    });
    return cols;
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setVisibleCount(8); // Reset count on filter change
  };

  // 3 Columns for large screen, 2 for tablet, 1 for mobile
  const columns3 = getMasonryColumns(displayedItems, 3);
  const columns2 = getMasonryColumns(displayedItems, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative">
      {/* Background flare */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-mono tracking-widest text-gold-400 uppercase font-semibold">
          Lookbook
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-gold-100 mt-2">
          Makeup Portfolio
        </h1>
        <p className="text-navy-300 text-xs sm:text-sm mt-3 leading-relaxed">
          Explore our Pinterest-style masonry grid showcasing high-definition, airbrush, and intricate mehendi work curated by Karshini.
        </p>
      </div>

      {/* Elegant scrollable Filter Bar */}
      <div className="flex justify-start md:justify-center overflow-x-auto pb-6 mb-10 -mx-4 px-4 md:px-0 scrollbar-none gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-4.5 py-2.5 rounded-full text-xs font-medium tracking-wider whitespace-nowrap uppercase border cursor-pointer transition-all duration-300 ${
              selectedFilter === filter
                ? "bg-gradient-to-r from-gold-600 to-gold-400 text-navy-950 border-gold-400 font-bold shadow-lg shadow-gold-500/10"
                : "bg-navy-900 text-navy-200 border-gold-500/10 hover:border-gold-500/30 hover:text-gold-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Masonry Layout Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-navy-900/30 rounded-3xl border border-gold-500/5 max-w-md mx-auto">
          <Camera className="w-10 h-10 text-gold-500/50 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-semibold text-gold-200">No photos yet</h3>
          <p className="text-xs text-navy-400 mt-1">There are no photos under the {selectedFilter} category right now. Check back soon!</p>
        </div>
      ) : (
        <>
          {/* Desktop Masonry (3 columns) - Hidden on md/sm */}
          <div className="hidden lg:flex masonry-grid">
            {columns3.map((col, colIdx) => (
              <div key={colIdx} className="masonry-col flex-1">
                {col.map((item) => (
                  <div key={item.id} className="mb-6">
                    <PortfolioCard item={item} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Tablet Masonry (2 columns) - Hidden on lg and sm */}
          <div className="hidden sm:flex lg:hidden masonry-grid">
            {columns2.map((col, colIdx) => (
              <div key={colIdx} className="masonry-col flex-1">
                {col.map((item) => (
                  <div key={item.id} className="mb-6">
                    <PortfolioCard item={item} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile Single Column Grid */}
          <div className="sm:hidden space-y-6">
            {displayedItems.map((item) => (
              <div key={item.id}>
                <PortfolioCard item={item} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {filteredItems.length > visibleCount && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-8 py-3.5 bg-navy-900 border border-gold-500/25 hover:border-gold-500 text-gold-300 hover:text-gold-200 font-bold text-xs tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300"
              >
                Load More Creations
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface PortfolioCardProps {
  item: PortfolioItem;
}

function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-2xl overflow-hidden border border-gold-500/10 group shadow-lg bg-navy-900 relative"
    >
      <div className="overflow-hidden relative bg-navy-950">
        <img
          src={item.imageUrl}
          alt={item.caption} // Captions double as alt-text
          referrerPolicy="no-referrer"
          className="w-full h-auto object-cover group-hover:scale-[1.025] transition-transform duration-500"
        />
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
      </div>

      <div className="p-4.5 text-left space-y-2">
        <span className="px-2 py-0.5 bg-gold-500/10 border border-gold-500/20 text-[9px] font-mono tracking-wider text-gold-400 rounded uppercase">
          {item.category}
        </span>
        <p className="text-navy-100 text-xs sm:text-[13px] leading-relaxed font-sans">
          {item.caption}
        </p>
      </div>
    </motion.div>
  );
}
