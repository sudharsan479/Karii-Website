import React from "react";
import { Palette, Check, X, Sparkles, Paintbrush, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface ThemeOption {
  id: string;
  name: string;
  colors: string[]; // [bg, accent, text]
  desc: string;
}

export const THEMES: ThemeOption[] = [
  { id: "theme-rose-gold", name: "Classic Rose Gold", colors: ["#1a1115", "#e5a9b4", "#fff5f7"], desc: "Romantic blush & deep warm plum" },
  { id: "theme-royal-emerald", name: "Royal Emerald", colors: ["#03140d", "#dfb76c", "#fffaf0"], desc: "Prestigious forest emerald & gold" },
  { id: "theme-sunset-amethyst", name: "Sunset Amethyst", colors: ["#0c0617", "#e28a5c", "#faf7fd"], desc: "Lilac twilight & warm copper" },
  { id: "theme-cosmic-ocean", name: "Cosmic Ocean", colors: ["#040a18", "#f3c444", "#f5f9fc"], desc: "Deep sea indigo & radiant gold" },
  { id: "theme-vibrant-coral", name: "Vibrant Coral", colors: ["#1c0d0a", "#ff9e79", "#fdfbf7"], desc: "Playful peach, marigold & terracotta" },
  { id: "theme-vintage-teal", name: "Vintage Teal", colors: ["#021417", "#e3b55a", "#f3fafb"], desc: "Luxury jade teal & bright brass" },
  { id: "theme-golden-amber", name: "Golden Amber", colors: ["#14110b", "#f0aa3e", "#faf9f6"], desc: "Earthy amber & sweet honey cream" },
  { id: "theme-midnight-plum", name: "Midnight Plum", colors: ["#100314", "#dfc0e2", "#fdfafc"], desc: "Mulberry, magenta & platinum" },
  { id: "theme-crimson-velvet", name: "Crimson Velvet", colors: ["#150207", "#e6c175", "#fefafd"], desc: "Passionate ruby & soft champagne" },
  { id: "theme-mint-sage", name: "Mint Sage", colors: ["#08130e", "#e2ba62", "#f4faf8"], desc: "Calming sage, organic forest & honey" },
];

interface ThemePickerProps {
  currentTheme: string;
  onChangeTheme: (themeId: string) => void;
}

export default function ThemePicker({ currentTheme, onChangeTheme }: ThemePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hasShownToast, setHasShownToast] = React.useState(false);

  // Auto-show a subtle, cute hint to choose a style variation on first load
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHasShownToast(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  return (
    <div className="fixed bottom-24 left-6 z-50 md:bottom-8 select-none">
      {/* Toast Notice to guide the user */}
      <AnimatePresence>
        {hasShownToast && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute bottom-16 left-0 w-72 p-4 glass-panel-heavy rounded-2xl shadow-2xl border border-gold-500/10 flex items-start space-x-3 text-left"
          >
            <div className="p-2 bg-gold-500/10 rounded-xl text-gold-400 mt-0.5">
              <Palette className="w-4 h-4 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[11px] font-bold tracking-wider text-white uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-none" /> Theme Variations
              </h4>
              <p className="text-[11px] text-navy-300 mt-1 leading-normal">
                Choose from 10 luxurious Tamil-bridal themed color palettes.
              </p>
            </div>
            <button 
              onClick={() => setHasShownToast(false)} 
              className="text-navy-400 hover:text-white p-0.5 cursor-pointer"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating controller */}
      <div className="relative">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasShownToast(false);
          }}
          className="flex items-center gap-2.5 bg-navy-900/90 hover:bg-navy-800 text-white pl-3.5 pr-4 py-3 rounded-full shadow-2xl border border-gold-500/20 hover:border-white/40 transition-all duration-300 active:scale-95 group cursor-pointer"
          aria-label="Change color theme"
        >
          <div className="relative flex items-center justify-center">
            {/* Visual preview dot using theme color */}
            <span 
              className="w-5 h-5 rounded-full border border-white/20 shadow-inner block transition-colors duration-300"
              style={{ backgroundColor: activeThemeObj.colors[1] }}
            />
            <Palette className="w-3.5 h-3.5 text-navy-950 absolute" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-[8px] uppercase tracking-widest text-navy-400 font-bold leading-none">PRESETS</span>
            <span className="block text-[11px] font-bold text-white tracking-wide leading-tight">{activeThemeObj.name}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-navy-400 group-hover:text-white" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-navy-400 group-hover:text-white" />
          )}
        </button>

        {/* Variations picker panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="absolute bottom-16 left-0 w-[310px] sm:w-[350px] glass-panel-heavy rounded-3xl shadow-3xl border border-white/10 p-5 overflow-hidden text-left"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Paintbrush className="w-4 h-4 text-gold-400" />
                  <h3 className="text-xs font-serif font-black tracking-wide text-white uppercase">
                    10 Style Presets
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-navy-400 hover:text-white p-1 rounded-full hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Theme items container */}
              <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
                {THEMES.map((theme) => {
                  const isSelected = theme.id === currentTheme;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onChangeTheme(theme.id);
                        // don't close picker right away so they can preview easily!
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                        isSelected 
                          ? "bg-white/10 border border-white/10" 
                          : "hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Swatch indicators */}
                        <div className="flex -space-x-1.5">
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: theme.colors[0] }} // BG color
                          />
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm z-10"
                            style={{ backgroundColor: theme.colors[1] }} // ACCENT color
                          />
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm z-20"
                            style={{ backgroundColor: theme.colors[2] }} // TEXT color
                          />
                        </div>

                        <div className="min-w-0">
                          <span className={`block text-[11px] font-semibold tracking-wide ${isSelected ? "text-white" : "text-navy-200"}`}>
                            {theme.name}
                          </span>
                          <span className="block text-[9px] text-navy-400 truncate leading-none mt-0.5">
                            {theme.desc}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white stroke-[3] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Minimalist footer hint */}
              <div className="border-t border-white/5 pt-2.5 mt-3 text-center">
                <p className="text-[9px] font-mono text-navy-400">
                  CMS / Admin panel remains strictly in bold monochrome.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
