import React from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenBookModal: () => void;
}

export default function Header({ currentPath, onNavigate, onOpenBookModal }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Wiki & Guides", path: "/wiki" },
    { label: "Affiliate Shop", path: "/shop" },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-gold-500/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div 
            onClick={() => handleNavClick("/")} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/30 group-hover:border-gold-500 group-hover:bg-gold-500/20 transition-all duration-300">
              {/* Elegant face silhouette line art placeholder / abstract sparkle icon */}
              <Sparkles className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-widest text-gold-100 group-hover:text-gold-400 transition-colors duration-300 block">
                VIVID SPARK
              </span>
              <span className="text-[9px] font-sans tracking-[0.25em] text-gold-400 block -mt-1 uppercase">
                Be Bold. Be You.
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-sm font-medium tracking-wider transition-all duration-300 cursor-pointer relative py-2 ${
                    isActive 
                      ? "text-gold-400 font-semibold" 
                      : "text-navy-200 hover:text-gold-200"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
            <button
              onClick={onOpenBookModal}
              className="ml-4 px-5 py-2.5 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-navy-950 font-bold text-xs tracking-widest uppercase rounded-full shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              Book a Slot
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={onOpenBookModal}
              className="px-3 py-1.5 bg-gradient-to-r from-gold-600 to-gold-400 text-navy-950 font-bold text-[10px] tracking-wider uppercase rounded-full shadow-lg"
            >
              Book
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-navy-200 hover:text-gold-400 hover:bg-navy-900 transition-colors duration-200 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-gold-500/10 bg-navy-900/95 backdrop-blur-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navItems.map((item) => {
                const isActive = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium tracking-wide transition-colors duration-200 ${
                      isActive 
                        ? "bg-gold-500/10 text-gold-400 border-l-2 border-gold-400 pl-2.5" 
                        : "text-navy-100 hover:bg-navy-800 hover:text-gold-300"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBookModal();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-navy-950 font-bold tracking-widest uppercase rounded-full text-center text-sm shadow-md"
                >
                  Book a Slot
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
