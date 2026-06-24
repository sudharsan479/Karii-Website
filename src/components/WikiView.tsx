import React from "react";
import { 
  BookOpen, 
  Search, 
  ArrowLeft, 
  HelpCircle, 
  ThumbsUp, 
  ThumbsDown, 
  User, 
  Calendar, 
  Sparkles,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import Markdown from "react-markdown";
import { WikiItem } from "../dbHelper";

interface WikiViewProps {
  wikiItems: WikiItem[];
  onOpenBookModal: (serviceName?: string | null) => void;
}

type WikiSubRoute = "index" | "category" | "entry" | "faq";

export default function WikiView({ wikiItems, onOpenBookModal }: WikiViewProps) {
  const [subRoute, setSubRoute] = React.useState<WikiSubRoute>("index");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedEntrySlug, setSelectedEntrySlug] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Helpful feedback states
  const [votedEntries, setVotedEntries] = React.useState<Record<string, "yes" | "no">>({});

  const categories = [
    "Makeup",
    "Skincare",
    "Skincare Routines",
    "Bridal & Occasion Prep",
    "Tools & Accessories",
  ];

  // Wiki FAQ general knowledge questions
  const wikiFAQs = [
    {
      q: "Is wearing makeup bad for your skin long-term?",
      a: "No, as long as you practice proper hygiene. Modern premium formulations are non-comedogenic (meaning they won't clog pores) and often contain skincare active ingredients. The key is to double cleanse thoroughly every single night to remove all traces of pigments."
    },
    {
      q: "What is the correct order of applying skincare products before makeup?",
      a: "The golden rule is thinnest to thickest: 1. Cleanse, 2. Hydrating toner or facial mist, 3. Hyaluronic acid serum, 4. Moisturizer, 5. Sunscreen (for daytime), and lastly 6. Primer. Give each layer 1-2 minutes to settle before applying the next."
    },
    {
      q: "How can I prevent my concealer from creasing under my eyes?",
      a: "Ensure the under-eye area is highly hydrated before applying product. Use a very small amount of lightweight concealer, blend completely using a damp sponge, and then lock it immediately with a micro-fine translucent powder (the baking technique) before it can settle into lines."
    },
    {
      q: "What is double cleansing and is it necessary?",
      a: "Yes, double cleansing is necessary if you wear sunscreen or makeup. The first step uses an oil-based cleanser (like a balm or micellar water) which breaks down oil-soluble pigments and sebum. The second step uses a water-based foaming face wash to clean residual sweat and dirt from pores."
    }
  ];

  // Filters based on search and category
  const filteredItems = wikiItems.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory 
      ? item.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  const featuredEntry = wikiItems[1] || wikiItems[0];
  const latestEntries = wikiItems.slice(0, 4);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setSubRoute("category");
    setSearchQuery("");
  };

  const handleEntryClick = (slug: string) => {
    setSelectedEntrySlug(slug);
    setSubRoute("entry");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleVote = (id: string, vote: "yes" | "no") => {
    if (votedEntries[id]) return; // Single vote only
    setVotedEntries((prev) => ({ ...prev, [id]: vote }));
  };

  const activeEntry = wikiItems.find((item) => item.slug === selectedEntrySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-left">
      {/* 1. Wiki Navigation breadcrumb style */}
      <div className="flex items-center space-x-2 text-xs text-navy-400 mb-8 border-b border-gold-500/10 pb-4">
        <button 
          onClick={() => {
            setSubRoute("index");
            setSelectedCategory(null);
            setSelectedEntrySlug(null);
          }} 
          className="hover:text-gold-400 cursor-pointer font-medium"
        >
          Wiki Hub
        </button>
        {selectedCategory && (
          <>
            <ChevronRight className="w-3 h-3 text-navy-600" />
            <button 
              onClick={() => {
                setSubRoute("category");
                setSelectedEntrySlug(null);
              }}
              className="hover:text-gold-400 cursor-pointer font-medium"
            >
              {selectedCategory}
            </button>
          </>
        )}
        {activeEntry && subRoute === "entry" && (
          <>
            <ChevronRight className="w-3 h-3 text-navy-600" />
            <span className="text-gold-300 truncate font-semibold max-w-[200px]">
              {activeEntry.title}
            </span>
          </>
        )}
      </div>

      {/* RENDER VIEW: 1. INDEX VIEW */}
      {subRoute === "index" && (
        <div className="space-y-16">
          {/* Header & Search */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono tracking-widest text-gold-400 uppercase font-semibold">
                Educational Hub
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-gold-100 mt-2">
                Vivid Spark Wiki
              </h1>
              <p className="text-navy-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-lg">
                Skincare science, bridal preparation checklists, and technical makeup advice—explained simply to support your daily beauty routines.
              </p>
            </div>
            {/* Search bar */}
            <div className="lg:col-span-5 w-full">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gold-400/50" />
                <input
                  type="text"
                  placeholder="Search articles & guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-navy-900 border border-gold-500/15 focus:border-gold-400 rounded-full py-3.5 pl-12 pr-6 text-sm text-navy-50 placeholder-navy-400 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Categories Horizontal Row */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gold-400/80 font-bold">
              Browse by Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="p-4 bg-navy-900/60 hover:bg-navy-900 border border-gold-500/10 hover:border-gold-500/30 rounded-2xl text-left transition-all duration-300 group cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 text-gold-500 mb-2.5 group-hover:scale-115 transition-transform" />
                  <span className="font-serif text-sm font-semibold text-gold-200 group-hover:text-gold-300 block">
                    {cat}
                  </span>
                </button>
              ))}
              {/* FAQ Page Card */}
              <button
                onClick={() => setSubRoute("faq")}
                className="p-4 bg-navy-900/60 hover:bg-navy-900 border border-gold-500/15 hover:border-gold-500/35 rounded-2xl text-left transition-all duration-300 group cursor-pointer"
              >
                <HelpCircle className="w-5 h-5 text-gold-400 mb-2.5 group-hover:scale-115 transition-transform" />
                <span className="font-serif text-sm font-semibold text-gold-100 group-hover:text-gold-200 block">
                  Wiki FAQs
                </span>
              </button>
            </div>
          </div>

          {/* Featured Entry (Quick snippet preview) */}
          {featuredEntry && !searchQuery && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-navy-900/40">
              <div className="lg:col-span-4 aspect-square rounded-2xl overflow-hidden bg-navy-950 border border-gold-500/10 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80"
                  alt="Featured Article banner"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-8 text-left space-y-4">
                <span className="px-2.5 py-0.5 bg-gold-500/15 border border-gold-500/25 text-[10px] font-mono tracking-wider text-gold-400 rounded uppercase font-semibold">
                  Featured Guide • {featuredEntry.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-100 leading-tight">
                  {featuredEntry.title}
                </h2>
                <p className="text-navy-200 text-xs sm:text-sm leading-relaxed">
                  {featuredEntry.summary}
                </p>
                <div className="flex items-center space-x-6 text-[10px] text-navy-400 font-mono uppercase tracking-wider">
                  <span className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-gold-500" />
                    <span>{featuredEntry.author}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold-500" />
                    <span>Updated {featuredEntry.lastUpdated}</span>
                  </span>
                </div>
                <button
                  onClick={() => handleEntryClick(featuredEntry.slug)}
                  className="px-6 py-2.5 bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 hover:text-gold-200 font-bold text-[11px] tracking-widest uppercase border border-gold-500/20 rounded-full transition-colors cursor-pointer"
                >
                  Read Full Guide
                </button>
              </div>
            </div>
          )}

          {/* Search Result or Index List */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gold-400/80 font-bold border-b border-navy-800 pb-2">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Latest Resources & Guides"}
            </h3>
            {filteredItems.length === 0 ? (
              <p className="text-navy-400 text-xs text-center py-10 bg-navy-900/10 rounded-xl border border-dashed border-navy-800">No guides match your search criteria. Try using simpler terms.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleEntryClick(item.slug)}
                    className="p-5 bg-navy-900/50 hover:bg-navy-900/80 border border-gold-500/10 hover:border-gold-500/25 rounded-2xl cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase font-semibold">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-md font-bold text-gold-100 group-hover:text-gold-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-navy-300 text-xs line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-navy-800 flex justify-between items-center text-[9px] text-navy-400 font-mono">
                      <span>By {item.author}</span>
                      <span>{item.lastUpdated}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* RENDER VIEW: 2. CATEGORY VIEW */}
      {subRoute === "category" && selectedCategory && (
        <div className="space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-navy-800 pb-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-gold-400 uppercase font-semibold">
                Category Archive
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-gold-100 mt-1">
                {selectedCategory} Guides
              </h1>
            </div>
            <button
              onClick={() => setSubRoute("index")}
              className="inline-flex items-center space-x-1.5 text-navy-300 hover:text-gold-400 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Hub</span>
            </button>
          </div>

          {/* List filtered items */}
          {filteredItems.length === 0 ? (
            <p className="text-navy-400 text-xs py-10 bg-navy-900/20 rounded-xl border border-dashed border-navy-800">No articles listed under this category yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleEntryClick(item.slug)}
                  className="p-5 bg-navy-900/50 hover:bg-navy-900/80 border border-gold-500/10 hover:border-gold-500/25 rounded-2xl cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <h4 className="font-serif text-md font-bold text-gold-100 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-navy-300 text-xs line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-navy-800 flex justify-between items-center text-[9px] text-navy-400 font-mono">
                    <span>By {item.author}</span>
                    <span>{item.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* RENDER VIEW: 3. DETAILED ARTICLE VIEW */}
      {subRoute === "entry" && activeEntry && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content column */}
          <div className="lg:col-span-8 space-y-8">
            <button
              onClick={() => {
                if (selectedCategory) {
                  setSubRoute("category");
                } else {
                  setSubRoute("index");
                }
              }}
              className="inline-flex items-center space-x-1.5 text-navy-300 hover:text-gold-400 text-xs font-bold uppercase tracking-wider cursor-pointer border border-gold-500/10 rounded-full px-4 py-2 bg-navy-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Collection</span>
            </button>

            {/* Title & Metadata */}
            <div className="space-y-4">
              <span className="px-2.5 py-0.5 bg-gold-500/10 border border-gold-500/20 text-[9px] font-mono tracking-wider text-gold-400 rounded uppercase font-semibold">
                {activeEntry.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gold-50 leading-tight">
                {activeEntry.title}
              </h1>

              <div className="flex flex-wrap gap-y-2 gap-x-6 text-[10px] text-navy-400 font-mono uppercase tracking-wider pt-2 border-b border-navy-800 pb-4">
                <span className="flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-gold-500" />
                  <span>By {activeEntry.author}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-500" />
                  <span>Published: {activeEntry.createdAt}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-500" />
                  <span>Last Updated: {activeEntry.lastUpdated}</span>
                </span>
              </div>
            </div>

            {/* Quick Answer Block */}
            <div className="p-5.5 bg-gold-500/5 border-l-4 border-gold-400 rounded-r-2xl text-left space-y-2 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-5">
                <BookOpen className="w-20 h-20" />
              </div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-gold-400 font-bold">
                Quick Answer Summary (AEO/GEO Lift)
              </h4>
              <p className="text-navy-100 text-xs sm:text-sm font-semibold leading-relaxed">
                {activeEntry.summary}
              </p>
            </div>

            {/* Main Article Body (Markdown) */}
            <div className="markdown-body prose prose-invert prose-gold max-w-none text-navy-200 text-xs sm:text-sm leading-relaxed space-y-4">
              <Markdown>{activeEntry.content}</Markdown>
            </div>

            {/* Helpful feedback widget */}
            <div className="border-t border-navy-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-navy-300 font-medium">
                Was this educational article helpful for your skincare or makeup routine?
              </span>
              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={() => handleVote(activeEntry.id, "yes")}
                  disabled={!!votedEntries[activeEntry.id]}
                  className={`flex items-center space-x-1.5 px-4 py-2 border rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    votedEntries[activeEntry.id] === "yes"
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                      : "bg-navy-900 border-gold-500/10 hover:border-gold-500/30 text-navy-200 hover:text-gold-300"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Yes ({activeEntry.helpfulYes + (votedEntries[activeEntry.id] === "yes" ? 1 : 0)})</span>
                </button>
                <button
                  onClick={() => handleVote(activeEntry.id, "no")}
                  disabled={!!votedEntries[activeEntry.id]}
                  className={`flex items-center space-x-1.5 px-4 py-2 border rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    votedEntries[activeEntry.id] === "no"
                      ? "bg-rose-500/20 border-rose-500 text-rose-300"
                      : "bg-navy-900 border-gold-500/10 hover:border-gold-500/30 text-navy-200 hover:text-gold-300"
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>No ({activeEntry.helpfulNo + (votedEntries[activeEntry.id] === "no" ? 1 : 0)})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar CTA Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Booking CTA */}
            <div className="glass-panel p-6 rounded-3xl border border-gold-500/15 text-left space-y-5 bg-gradient-to-br from-navy-900 to-navy-950">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                <Sparkles className="w-5.5 h-5.5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-lg font-bold text-gold-100">
                  Want professional makeup done for your big day?
                </h4>
                <p className="text-navy-300 text-xs leading-relaxed">
                  Avoid makeup malfunctions. Book LAPT certified artist Karshini for highly individualized HD / Airbrush makeup.
                </p>
              </div>
              <button
                onClick={() => onOpenBookModal(`Wiki consultation: ${activeEntry.title}`)}
                className="w-full py-3.5 bg-gradient-to-r from-gold-600 to-gold-400 text-navy-950 font-bold text-xs tracking-widest uppercase rounded-xl hover:shadow-lg hover:shadow-gold-500/10 transition-all cursor-pointer"
              >
                Book Vivid Spark
              </button>
            </div>

            {/* Related articles list */}
            <div className="glass-panel p-6 rounded-3xl border border-gold-500/10 text-left space-y-4">
              <h4 className="font-serif text-sm font-semibold text-gold-200 uppercase tracking-wider">
                Related Articles
              </h4>
              <div className="space-y-3.5">
                {wikiItems
                  .filter((item) => item.id !== activeEntry.id)
                  .slice(0, 3)
                  .map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => handleEntryClick(rel.slug)}
                      className="group cursor-pointer block text-left"
                    >
                      <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase font-semibold">
                        {rel.category}
                      </span>
                      <h5 className="font-serif text-xs font-bold text-navy-100 group-hover:text-gold-300 transition-colors leading-snug mt-0.5">
                        {rel.title}
                      </h5>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER VIEW: 4. WIKI GENERAL FAQ LIST */}
      {subRoute === "faq" && (
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-navy-800 pb-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-gold-400 uppercase font-semibold">
                General Knowledge FAQs
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-gold-100 mt-1">
                Beauty & Skincare FAQ
              </h1>
            </div>
            <button
              onClick={() => setSubRoute("index")}
              className="inline-flex items-center space-x-1.5 text-navy-300 hover:text-gold-400 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Hub</span>
            </button>
          </div>

          <div className="space-y-6">
            {wikiFAQs.map((item, idx) => (
              <div 
                key={idx} 
                className="p-6 bg-navy-900/50 border border-gold-500/10 rounded-2xl text-left space-y-2.5 shadow-md"
              >
                <h4 className="font-serif text-md font-bold text-gold-200">
                  {item.q}
                </h4>
                <p className="text-navy-200 text-xs leading-relaxed">
                  {item.a}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onOpenBookModal(`FAQ Inquiry: ${item.q}`)}
                    className="inline-flex items-center space-x-1.5 text-gold-400 hover:text-gold-300 text-[10px] font-mono uppercase tracking-wider cursor-pointer font-bold"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ask Karshini regarding this</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
