import React from "react";
import { MessageCircle, Phone, Instagram, Mail, Shield, CheckCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import BookSlotModal from "./components/BookSlotModal";
import HomeView from "./components/HomeView";
import PortfolioView from "./components/PortfolioView";
import WikiView from "./components/WikiView";
import ShopView from "./components/ShopView";
import AdminView from "./components/AdminView";
import ThemePicker, { THEMES } from "./components/ThemePicker";

import { 
  GlobalSettings, 
  PortfolioItem, 
  ServiceItem, 
  TestimonialItem, 
  FAQItem, 
  WikiItem, 
  ShopItem,
  fallbackSettings,
  fallbackServices,
  fallbackPortfolio,
  fallbackTestimonials,
  fallbackFAQs,
  fallbackWiki,
  fallbackShop,
  getSettings,
  getServices,
  getPortfolio,
  getTestimonials,
  getFAQs,
  getWiki,
  getShop
} from "./dbHelper";

export default function App() {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);
  
  // Theme state for the main website
  const [selectedTheme, setSelectedTheme] = React.useState(() => {
    return localStorage.getItem("vivid-spark-theme") || "theme-rose-gold";
  });

  // Apply theme class to body/html
  React.useEffect(() => {
    const isAdmin = currentPath.startsWith("/admin");
    const activeTheme = isAdmin ? "theme-monochrome" : selectedTheme;

    // Remove old themes and classes
    document.documentElement.classList.remove("theme-monochrome", "admin-cms");
    document.body.classList.remove("theme-monochrome", "admin-cms");
    THEMES.forEach((t) => {
      document.documentElement.classList.remove(t.id);
      document.body.classList.remove(t.id);
    });

    // Add active theme classes
    document.documentElement.classList.add(activeTheme);
    document.body.classList.add(activeTheme);

    if (isAdmin) {
      document.documentElement.classList.add("admin-cms");
      document.body.classList.add("admin-cms");
    }
  }, [currentPath, selectedTheme]);

  // Modal controllers
  const [isBookModalOpen, setIsBookModalOpen] = React.useState(false);
  const [bookModalService, setBookModalService] = React.useState<string | null>(null);
  
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false);
  const [isAffiliateOpen, setIsAffiliateOpen] = React.useState(false);

  // Firestore DB State
  const [settings, setSettings] = React.useState<GlobalSettings>(fallbackSettings);
  const [services, setServices] = React.useState<ServiceItem[]>(fallbackServices);
  const [portfolio, setPortfolio] = React.useState<PortfolioItem[]>(fallbackPortfolio);
  const [testimonials, setTestimonials] = React.useState<TestimonialItem[]>(fallbackTestimonials);
  const [faqs, setFaqs] = React.useState<FAQItem[]>(fallbackFAQs);
  const [wiki, setWiki] = React.useState<WikiItem[]>(fallbackWiki);
  const [shop, setShop] = React.useState<ShopItem[]>(fallbackShop);
  const [loading, setLoading] = React.useState(true);

  // Sync route path changes with window.history
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch data function
  const loadAllData = async () => {
    try {
      const dbSettings = await getSettings();
      const dbServices = await getServices();
      const dbPortfolio = await getPortfolio();
      const dbTestimonials = await getTestimonials();
      const dbFaqs = await getFAQs();
      const dbWiki = await getWiki();
      const dbShop = await getShop();

      setSettings(dbSettings);
      setServices(dbServices);
      setPortfolio(dbPortfolio);
      setTestimonials(dbTestimonials);
      setFaqs(dbFaqs);
      setWiki(dbWiki);
      setShop(dbShop);
    } catch (e) {
      console.warn("Could not load data fully from Firestore; using static assets.", e);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all data on mount
  React.useEffect(() => {
    loadAllData();
  }, []);

  const handleOpenBookModal = (serviceName?: string | null) => {
    setBookModalService(serviceName || null);
    setIsBookModalOpen(true);
  };

  const cleanPhone = settings.phoneNumber.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, "");

  const isAdminView = currentPath.startsWith("/admin");

  return (
    <div className={`flex flex-col min-h-screen bg-navy-950 text-navy-50 font-sans selection:bg-gold-500 selection:text-navy-950 transition-colors duration-300 ${isAdminView ? "admin-cms theme-monochrome" : selectedTheme}`}>
      {/* Dynamic Header */}
      <Header 
        currentPath={currentPath} 
        onNavigate={handleNavigate} 
        onOpenBookModal={() => handleOpenBookModal()} 
      />

      {/* Main Content Pane with Page transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* Simple Path Resolver */}
            {currentPath === "/" && (
              <HomeView 
                settings={settings}
                services={services}
                portfolio={portfolio}
                testimonials={testimonials}
                faqs={faqs}
                onNavigate={handleNavigate}
                onOpenBookModal={handleOpenBookModal}
              />
            )}
            
            {currentPath.startsWith("/portfolio") && (
              <PortfolioView portfolio={portfolio} />
            )}
            
            {currentPath.startsWith("/wiki") && (
              <WikiView 
                wikiItems={wiki} 
                onOpenBookModal={handleOpenBookModal} 
              />
            )}
            
            {currentPath.startsWith("/shop") && (
              <ShopView shopItems={shop} />
            )}
            
            {currentPath.startsWith("/admin") && (
              <AdminView 
                settings={settings}
                portfolio={portfolio}
                services={services}
                testimonials={testimonials}
                faqs={faqs}
                wikiItems={wiki}
                shopItems={shop}
                onRefreshData={loadAllData}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Footer */}
      <Footer 
        settings={settings} 
        onNavigate={handleNavigate} 
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenAffiliate={() => setIsAffiliateOpen(true)}
      />

      {/* --- FLOATING & STICKY ACTION ITEMS --- */}
      
      {/* 1. Floating WhatsApp Button (Hidden on Admin screen) */}
      {!currentPath.startsWith("/admin") && (
        <a
          href={`https://wa.me/${cleanWhatsapp}`}
          target="_blank"
          referrerPolicy="no-referrer"
          className="fixed bottom-24 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-navy-950 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 md:bottom-8 border border-emerald-400/40 cursor-pointer flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6.5 h-6.5 text-navy-950 fill-none" />
        </a>
      )}

      {/* 2. Floating Style / Color Theme Picker (Hidden on Admin screen) */}
      {!currentPath.startsWith("/admin") && (
        <ThemePicker currentTheme={selectedTheme} onChangeTheme={setSelectedTheme} />
      )}

      {/* 2. Mobile Sticky Bottom CTA Bar (Visible only on mobile screen widths <md) */}
      {!currentPath.startsWith("/admin") && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-navy-900/90 backdrop-blur-md border-t border-gold-500/10 py-3.5 px-4 md:hidden flex justify-around items-center">
          <a
            href={`https://wa.me/${cleanWhatsapp}`}
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex flex-col items-center justify-center text-emerald-400"
          >
            <MessageCircle className="w-5.5 h-5.5" />
            <span className="text-[10px] mt-1 font-semibold tracking-wide">WhatsApp</span>
          </a>
          
          <a
            href={`tel:${cleanPhone}`}
            className="flex flex-col items-center justify-center text-gold-400"
          >
            <Phone className="w-5.5 h-5.5" />
            <span className="text-[10px] mt-1 font-semibold tracking-wide">Call Us</span>
          </a>
          
          <a
            href={`https://instagram.com/${settings.instagramHandle}`}
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex flex-col items-center justify-center text-pink-400"
          >
            <Instagram className="w-5.5 h-5.5" />
            <span className="text-[10px] mt-1 font-semibold tracking-wide">Instagram</span>
          </a>

          <a
            href={`mailto:${settings.emailAddress}`}
            className="flex flex-col items-center justify-center text-sky-400"
          >
            <Mail className="w-5.5 h-5.5" />
            <span className="text-[10px] mt-1 font-semibold tracking-wide">Email</span>
          </a>
        </div>
      )}

      {/* --- DIALOG MODALS --- */}

      {/* 1. Book a Slot Channel Modal */}
      <BookSlotModal 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
        settings={settings}
        serviceName={bookModalService}
      />

      {/* 2. Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsPrivacyOpen(false)} 
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="relative w-full max-w-lg glass-panel-heavy p-6 sm:p-8 rounded-3xl z-10 text-left border border-gold-500/10 shadow-2xl"
            >
              <button onClick={() => setIsPrivacyOpen(false)} className="absolute top-4 right-4 text-navy-400 hover:text-gold-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gold-400 mb-2">
                  <Shield className="w-5.5 h-5.5" />
                  <h3 className="font-serif text-lg font-bold">Privacy Policy</h3>
                </div>
                <p className="text-xs text-navy-200 leading-relaxed">
                  Vivid Spark by Karshini respects your privacy. We strictly utilize client contact information (such as WhatsApp details or phone numbers) provided during bookings to manage scheduling and confirm location coordinates. 
                </p>
                <p className="text-xs text-navy-200 leading-relaxed">
                  We use third-party analytics (Google Analytics) to measure visitor frequencies on our Wiki and Shop pages. None of your personal identity information is sold or distributed.
                </p>
                <p className="text-[10px] text-navy-400 font-mono">
                  Last Updated: June 2026
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Affiliate Disclosure Modal */}
      <AnimatePresence>
        {isAffiliateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsAffiliateOpen(false)} 
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="relative w-full max-w-lg glass-panel-heavy p-6 sm:p-8 rounded-3xl z-10 text-left border border-gold-500/10 shadow-2xl"
            >
              <button onClick={() => setIsAffiliateOpen(false)} className="absolute top-4 right-4 text-navy-400 hover:text-gold-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gold-400 mb-2">
                  <Info className="w-5.5 h-5.5" />
                  <h3 className="font-serif text-lg font-bold">Affiliate Disclosure</h3>
                </div>
                <p className="text-xs text-navy-200 leading-relaxed">
                  The shop recommendations list skincare serums, powder foundations, loose powders, and makeup tools that Karshini recommends and operates. 
                </p>
                <p className="text-xs text-navy-200 leading-relaxed">
                  Some product options feature direct Amazon affiliate links. Under the Amazon Services LLC Associates Program, Vivid Spark may earn a small referral commission for qualifying clicks and sales at absolutely zero additional expense to the buyer.
                </p>
                <p className="text-xs text-navy-200 leading-relaxed font-semibold text-gold-300">
                  Every product is personally vetted and tested inside local Tamil Nadu humid weather limits.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
