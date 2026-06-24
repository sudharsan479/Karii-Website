import React from "react";
import { 
  Sparkles, 
  Award, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  ArrowRight, 
  MessageSquare, 
  Phone, 
  Instagram, 
  Mail,
  HelpCircle,
  Clock,
  Car
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GlobalSettings, 
  ServiceItem, 
  PortfolioItem, 
  TestimonialItem, 
  FAQItem 
} from "../dbHelper";

interface HomeViewProps {
  settings: GlobalSettings;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  onNavigate: (path: string) => void;
  onOpenBookModal: (serviceName?: string | null) => void;
}

export default function HomeView({
  settings,
  services,
  portfolio,
  testimonials,
  faqs,
  onNavigate,
  onOpenBookModal,
}: HomeViewProps) {
  const [isStoryExpanded, setIsStoryExpanded] = React.useState(false);
  const [activeFaq, setActiveFaq] = React.useState<string | null>(null);

  // Get 4 curated portfolio items for teaser
  const portfolioTeaser = portfolio.slice(0, 4);

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const cleanPhone = settings.phoneNumber.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background ambient gold elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-10 w-80 h-80 bg-gold-400/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-20 w-100 h-100 bg-navy-800/40 blur-[130px] rounded-full pointer-events-none" />

      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-500/10 border border-gold-500/25 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[11px] font-mono tracking-widest text-gold-300 uppercase font-semibold">
                LAPT Certified Professional Artist
              </span>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gold-50 leading-[1.08]">
              Be Bold.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-300 to-gold-400">
                Be You.
              </span>
            </h1>

            <p className="font-sans text-navy-200 text-base md:text-lg max-w-xl leading-relaxed">
              {settings.heroDescription} Professional makeup services tailored to make you feel unapologetically, beautifully yourself on your most memorable days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => onOpenBookModal()}
                className="px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-navy-950 font-bold text-sm tracking-widest uppercase rounded-full shadow-xl shadow-gold-500/10 hover:shadow-gold-500/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
              
              <button
                onClick={() => onNavigate("/portfolio")}
                className="px-8 py-4 bg-navy-900 hover:bg-navy-800 border border-gold-500/25 hover:border-gold-500 text-gold-300 hover:text-gold-200 font-bold text-sm tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center"
              >
                View Portfolio
              </button>
            </div>

            {/* Quick stats / highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-navy-800 max-w-md">
              <div>
                <span className="font-serif text-2xl font-bold text-gold-400">100%</span>
                <span className="block text-[10px] text-navy-400 uppercase tracking-widest mt-1">Satisfaction</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-gold-400">Certified</span>
                <span className="block text-[10px] text-navy-400 uppercase tracking-widest mt-1">LAPT London</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-gold-400">Mobile</span>
                <span className="block text-[10px] text-navy-400 uppercase tracking-widest mt-1">At Your Venue</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Outer decorative gold frame */}
              <div className="absolute -inset-2.5 rounded-3xl border border-gold-500/20 pointer-events-none" />
              
              {/* Image box */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-gold-500/10 bg-navy-900 group">
                <img 
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop&q=80" 
                  alt="Vivid Spark Signature Bridal Look" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
                
                {/* Overlay text */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-mono tracking-widest text-gold-400 uppercase font-semibold">
                    Featured Work
                  </p>
                  <h3 className="font-serif text-xl font-bold text-gold-100 mt-1">
                    Signature Coimbatore Bridal HD
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Why Vivid Spark (Trust Strip) */}
      <section className="border-y border-gold-500/10 bg-navy-900/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gold-500/10 border border-gold-500/20 rounded-2xl text-gold-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-sm tracking-wide text-gold-200">LAPT Certified</h4>
                <p className="text-navy-300 text-xs mt-0.5">London Academy Certified Excellence</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gold-500/10 border border-gold-500/20 rounded-2xl text-gold-400 shrink-0">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-sm tracking-wide text-gold-200">Mobile Services</h4>
                <p className="text-navy-300 text-xs mt-0.5">We travel directly to your venue</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gold-500/10 border border-gold-500/20 rounded-2xl text-gold-400 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-sm tracking-wide text-gold-200">HD & Airbrush Range</h4>
                <p className="text-navy-300 text-xs mt-0.5">Premium international formulations</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gold-500/10 border border-gold-500/20 rounded-2xl text-gold-400 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-sm tracking-wide text-gold-200">Coimbatore & Pollachi</h4>
                <p className="text-navy-300 text-xs mt-0.5">Coverage in surrounding regions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Portfolio Teaser */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest text-gold-400 uppercase font-semibold">
              Lookbook
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-gold-100 mt-1.5">
              Standout Creations
            </h2>
            <p className="text-navy-300 text-sm mt-2 max-w-md">
              A curated preview of Karshini's makeup art, detailing technical HD and Airbrush finishes.
            </p>
          </div>
          <button
            onClick={() => onNavigate("/portfolio")}
            className="mt-6 md:mt-0 px-6 py-3 bg-navy-900 border border-gold-500/25 hover:border-gold-500 text-gold-300 text-xs tracking-widest uppercase rounded-full transition-all cursor-pointer font-semibold"
          >
            View Full Portfolio
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioTeaser.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold-500/10 group bg-navy-900 shadow-lg"
            >
              <img
                src={item.imageUrl}
                alt={item.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2 py-0.5 bg-gold-500/20 border border-gold-500/30 text-[9px] font-mono tracking-wider text-gold-300 rounded uppercase">
                  {item.category}
                </span>
                <p className="text-navy-100 text-xs mt-2 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Karshini's Story */}
      <section className="py-20 border-t border-gold-500/10 bg-navy-900/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Photo column */}
            <div className="lg:col-span-5 relative">
              <div className="max-w-sm mx-auto relative">
                <div className="absolute -inset-3 rounded-2xl border border-gold-500/15" />
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-xl border border-gold-500/10 bg-navy-900">
                  <img
                    src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80"
                    alt="Karshini - LAPT Makeup Artist"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                </div>
              </div>
            </div>

            {/* Right narrative column */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div>
                <span className="text-xs font-mono tracking-widest text-gold-400 uppercase font-semibold">
                  Meet the Artist
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-gold-100 mt-1.5">
                  Karshini
                </h2>
                <p className="text-[11px] font-mono tracking-widest text-gold-400 mt-1 uppercase font-semibold">
                  LAPT Certified Makeup Professional
                </p>
              </div>

              <p className="text-navy-200 text-sm leading-relaxed">
                {settings.storyNarrative}
              </p>

              <AnimatePresence>
                {isStoryExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-navy-200 text-sm leading-relaxed border-t border-gold-500/10 pt-4 mt-2">
                      {settings.storyNarrativeExtended}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setIsStoryExpanded(!isStoryExpanded)}
                className="inline-flex items-center space-x-1 text-gold-400 hover:text-gold-300 font-bold text-xs tracking-widest uppercase cursor-pointer transition-colors pt-2"
              >
                <span>{isStoryExpanded ? "Read Less" : "Read Full Story"}</span>
                {isStoryExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-gold-400 uppercase font-semibold">
            Services & Packages
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-gold-100 mt-1.5">
            Exceptional Artistry Packages
          </h2>
          <p className="text-navy-300 text-xs mt-2">
            Pricing starting from baseline tiers. Every booking includes tailored consulting to match your custom skin tone and gown specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full border border-gold-500/10 hover:border-gold-500/30 shadow-lg"
            >
              {/* Service image */}
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-navy-900 border-b border-gold-500/10">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-navy-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold-500/20">
                  <span className="text-xs font-mono font-bold text-gold-400">
                    {item.startingPrice}
                  </span>
                </div>
              </div>

              {/* Service text details */}
              <div className="p-6 flex flex-col flex-grow text-left space-y-4">
                <div>
                  <span className="px-2.5 py-0.5 bg-gold-500/10 border border-gold-500/20 text-[9px] font-mono tracking-wider text-gold-400 rounded uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-gold-100 mt-2">
                    {item.name}
                  </h3>
                  <p className="text-navy-300 text-xs mt-1.5 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Features Checklist */}
                {item.features && (
                  <div className="border-t border-navy-800 pt-4 space-y-2.5">
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-gold-400/80 font-bold">
                      What's Included:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-navy-200">
                      {item.features.split(",").map((feat, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                          <span>{feat.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 mt-auto">
                  <button
                    onClick={() => onOpenBookModal(item.name)}
                    className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-navy-950 font-bold text-xs tracking-widest uppercase rounded-xl transition-all cursor-pointer text-center hover:shadow-lg hover:shadow-gold-500/10"
                  >
                    Book a Slot
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-20 border-t border-gold-500/10 bg-navy-900/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-gold-400 uppercase font-semibold">
              Words of Trust
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-gold-100 mt-1.5">
              Client Testimonials
            </h2>
            <p className="text-navy-300 text-xs mt-2">
              Read real-life styling experiences from our beautiful Coimbatore & Pollachi brides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between border border-gold-500/10 shadow-lg relative"
              >
                {/* Visual quote accent mark */}
                <div className="absolute top-4 right-6 font-serif text-6xl text-gold-500/10 pointer-events-none select-none">
                  “
                </div>

                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                    ))}
                  </div>

                  <p className="text-navy-200 text-xs italic leading-relaxed text-left">
                    "{test.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-800 text-left">
                  <h4 className="font-serif font-bold text-sm text-gold-100">
                    {test.name}
                  </h4>
                  <div className="flex justify-between items-center text-[10px] text-navy-400 mt-1 font-mono uppercase tracking-wider">
                    <span>{test.occasion}</span>
                    <span>{test.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Integrated Google Reviews citation block */}
          <div className="mt-12 text-center p-6 bg-navy-950/50 rounded-2xl border border-gold-500/5 max-w-xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
              <span className="text-xs font-semibold text-gold-300">
                5.0 Average rating with certified local reviews
              </span>
            </div>
            <p className="text-[11px] text-navy-400 mt-1">
              Reflecting verified evaluations on Google Business Listings across Coimbatore and Pollachi.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-left">
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-gold-400 uppercase font-semibold">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-gold-100 mt-1.5">
            Booking FAQ
          </h2>
          <p className="text-navy-300 text-xs mt-2">
            Answers regarding scheduling, venue travel, and makeup longevity.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div 
                key={faq.id} 
                className="glass-panel rounded-2xl border border-gold-500/10 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-navy-900/40 transition-colors"
                >
                  <span className="font-serif text-sm sm:text-base font-semibold text-gold-200">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs text-navy-200 leading-relaxed border-t border-gold-500/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Explore More section */}
      <section className="py-20 border-t border-gold-500/10 bg-navy-900/20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Wiki card */}
          <div className="glass-panel p-8 rounded-3xl border border-gold-500/10 flex flex-col justify-between hover:border-gold-500/20 transition-all text-left">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-4">
                <HelpCircle className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gold-100">
                Vivid Spark Beauty Wiki
              </h3>
              <p className="text-navy-300 text-xs mt-2 leading-relaxed">
                Browse our comprehensive archive of makeup longevity guides, bridal skincare routines, and mehendi aftercare secrets. Authored and verified by Karshini.
              </p>
            </div>
            <button
              onClick={() => onNavigate("/wiki")}
              className="mt-6 inline-flex items-center space-x-2 text-gold-400 hover:text-gold-300 font-bold text-xs tracking-widest uppercase cursor-pointer"
            >
              <span>Browse the Wiki</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Shop Card */}
          <div className="glass-panel p-8 rounded-3xl border border-gold-500/10 flex flex-col justify-between hover:border-gold-500/20 transition-all text-left">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-4">
                <Sparkles className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gold-100">
                Shop Karshini's Picks
              </h3>
              <p className="text-navy-300 text-xs mt-2 leading-relaxed">
                Discover the skin-safe, high-performance makeup palettes, primers, and skincare serums that Karshini actually recommends, uses on-set, and supports.
              </p>
            </div>
            <button
              onClick={() => onNavigate("/shop")}
              className="mt-6 inline-flex items-center space-x-2 text-gold-400 hover:text-gold-300 font-bold text-xs tracking-widest uppercase cursor-pointer"
            >
              <span>Visit the Shop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. Contact / Call-to-Action Section */}
      <section className="py-20 border-t border-gold-500/10 bg-gradient-to-b from-navy-900/10 to-navy-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-gold-500/15 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-500/10 blur-2xl rounded-full" />
          
          <div className="relative z-10 text-center space-y-6">
            <span className="text-xs font-mono tracking-widest text-gold-400 uppercase font-semibold">
              Get in Touch
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-gold-100 max-w-xl mx-auto">
              Ready to secure your booking? Let's chat
            </h2>
            <p className="text-navy-300 text-xs sm:text-sm max-w-lg mx-auto">
              To keep our process simple and personal, all bookings and date consultations are handled directly via your choice of WhatsApp, direct phone call, or Instagram DM.
            </p>

            {/* Direct Channel Buttons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4">
              <a
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex flex-col items-center p-4 bg-navy-950/60 rounded-2xl border border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all group"
              >
                <MessageSquare className="w-5.5 h-5.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-navy-100 font-semibold mt-2">WhatsApp</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="flex flex-col items-center p-4 bg-navy-950/60 rounded-2xl border border-gold-500/20 hover:bg-gold-500/10 hover:border-gold-500/40 transition-all group"
              >
                <Phone className="w-5.5 h-5.5 text-gold-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-navy-100 font-semibold mt-2">Call</span>
              </a>

              <a
                href={`https://instagram.com/${settings.instagramHandle}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex flex-col items-center p-4 bg-navy-950/60 rounded-2xl border border-pink-500/20 hover:bg-pink-500/10 hover:border-pink-500/40 transition-all group"
              >
                <Instagram className="w-5.5 h-5.5 text-pink-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-navy-100 font-semibold mt-2">Instagram</span>
              </a>

              <a
                href={`mailto:${settings.emailAddress}`}
                className="flex flex-col items-center p-4 bg-navy-950/60 rounded-2xl border border-sky-500/20 hover:bg-sky-500/10 hover:border-sky-500/40 transition-all group"
              >
                <Mail className="w-5.5 h-5.5 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-navy-100 font-semibold mt-2">Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
