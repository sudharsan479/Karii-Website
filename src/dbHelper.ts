import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "./firebase";
import { 
  isSanityConfigured,
  getSanitySettings,
  getSanityServices,
  getSanityPortfolio,
  getSanityTestimonials,
  getSanityFAQs,
  getSanityWiki,
  getSanityShop
} from "./sanity";

export interface GlobalSettings {
  heroTitle: string;
  heroTagline: string;
  heroDescription: string;
  storyNarrative: string;
  storyNarrativeExtended: string;
  whatsappNumber: string;
  phoneNumber: string;
  instagramHandle: string;
  emailAddress: string;
  serviceArea: string;
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  caption: string;
  category: string;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  startingPrice: string;
  category: string;
  imageUrl: string;
  description: string;
  features: string; // Comma separated
}

export interface TestimonialItem {
  id: string;
  name: string;
  quote: string;
  rating: number;
  occasion: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface WikiItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string; // Markdown supported
  author: string;
  createdAt: string;
  lastUpdated: string;
  helpfulYes: number;
  helpfulNo: number;
}

export interface ShopItem {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  category: string;
  price: string;
  affiliateLink: string;
  isActive: boolean;
  createdAt: string;
}

// Highly polished initial seed data (Fallbacks when database is loading or empty)
export const fallbackSettings: GlobalSettings = {
  heroTitle: "Be Bold. Be You.",
  heroTagline: "Vivid Spark",
  heroDescription: "Elegant, HD and Airbrush bridal artistry by Karshini—crafted to reflect your unique confidence and natural glow.",
  storyNarrative: "Karshini's journey into makeup artistry began with a simple belief — that confidence is the most beautiful thing a person can wear. What started as a personal passion for transformation grew into a calling: to help women feel boldly, unapologetically themselves on their most important days.",
  storyNarrativeExtended: "As a LAPT certified makeup artist, she's built her craft on technique and precision, blending Semi HD, HD, Airbrush, and glam artistry with a personal touch that goes beyond the brush — because for Karshini, makeup isn't about hiding who you are, it's about revealing it. Today, Vivid Spark is more than a brand — it's a promise. A promise that every bride, every client, leaves feeling like the most vivid version of themselves. Be Bold. Be You.",
  whatsappNumber: "+919876543210",
  phoneNumber: "+919876543210",
  instagramHandle: "vividspark_artistry",
  emailAddress: "karshini@vividspark.com",
  serviceArea: "Coimbatore, Pollachi & surrounding regions",
};

export const fallbackServices: ServiceItem[] = [
  {
    id: "s1",
    name: "Bridal Makeup (HD / Airbrush)",
    startingPrice: "₹15,000",
    category: "Bridal HD",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    description: "Premium HD and Airbrush application tailored specifically to highlight your natural elegance on your big day. Designed to last 12+ hours and photograph flawlessly.",
    features: "Sweat-proof Formula, Premium HD/Airbrush Base, Custom Eye Artistry, Saree Draping & Hair Styling Included"
  },
  {
    id: "s2",
    name: "Glam Makeup (Party & Reception)",
    startingPrice: "₹5,000",
    category: "Glam",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    description: "Whether it is a family reception, party or bridesmaid styling, look your absolute best with custom glam that complements your attire perfectly.",
    features: "HD Foundation Base, Premium Lash Application, Tailored Eyeshadow, Standard Hair Styling Add-on"
  },
  {
    id: "s3",
    name: "Bridal Mehendi",
    startingPrice: "₹8,000",
    category: "Mehendi",
    imageUrl: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800&auto=format&fit=crop&q=80",
    description: "Intricate, custom-designed organic Mehendi layouts featuring contemporary patterns, traditional symbols, and rich, deep stain guarantees.",
    features: "Organic Stain Safe Ingredients, Bridal Portrait Motifs, Free Groom Hand design, Aftercare Spray Kit"
  },
  {
    id: "s4",
    name: "Saree Draping & Styling",
    startingPrice: "₹1,500",
    category: "Drape & Jewels",
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80",
    description: "Professional draping service for silk sarees, Kanjeevarams, and modern drapes, ensuring elegant folds, comfort, and longevity.",
    features: "Perfect Box Pleating, Pin-less Safety Techniques, Secure Hip Belt adjustments, Style Consultation"
  },
  {
    id: "s5",
    name: "Rental Jewellery Sets",
    startingPrice: "₹3,000",
    category: "Drape & Jewels",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
    description: "Access our exclusive collection of antique gold, matte temple, and kundan bridal jewellery sets to elevate your bridal attire.",
    features: "Full Neckset and Choker, Matching Jhumkas & Maang Tikka, Clean Sanitized Sets, Adjustable Extension Chains"
  },
  {
    id: "s6",
    name: "Bridal Combo Package",
    startingPrice: "₹22,000",
    category: "Bridal HD",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80",
    description: "The complete bridal luxury experience. Combines Airbrush makeup, professional saree draping, and select temple jewellery rentals.",
    features: "Premium Airbrush Face Artistry, Luxury Saree Draping, Complete Bridal Jewellery Rental, Complimentary Trial Session"
  }
];

export const fallbackPortfolio: PortfolioItem[] = [
  {
    id: "p1",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    caption: "Bridal HD Makeup with intricate gold temple jewelry styling.",
    category: "Bridal HD",
    createdAt: "2026-05-10"
  },
  {
    id: "p2",
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80",
    caption: "Luminous Dewy Glam Base with deep gold eyeshadow styling for sangeet.",
    category: "Glam",
    createdAt: "2026-05-15"
  },
  {
    id: "p3",
    imageUrl: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800&auto=format&fit=crop&q=80",
    caption: "Bridal Mehendi detailing with beautiful traditional motifs.",
    category: "Mehendi",
    createdAt: "2026-05-20"
  },
  {
    id: "p4",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
    caption: "Flawless Airbrush Base with high-contrast lip artistry.",
    category: "Airbrush",
    createdAt: "2026-05-22"
  },
  {
    id: "p5",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
    caption: "Kanjeevaram Saree Draping paired with heavy floral hair design.",
    category: "Drape & Jewels",
    createdAt: "2026-05-25"
  },
  {
    id: "p6",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
    caption: "High-contrast matte dramatic eyeshadow for reception makeup.",
    category: "Glam",
    createdAt: "2026-05-28"
  },
  {
    id: "p7",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80",
    caption: "Semi HD Glow Makeup for outdoor bridesmaid photoshoot.",
    category: "Semi HD",
    createdAt: "2026-06-01"
  },
  {
    id: "p8",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    caption: "Elegant traditional temple jewellery rental styling.",
    category: "Drape & Jewels",
    createdAt: "2026-06-05"
  }
];

export const fallbackTestimonials: TestimonialItem[] = [
  {
    id: "t1",
    name: "Preethi Raghunath",
    quote: "Karshini was an absolute dream on my wedding day! Her HD makeup stayed fresh and sweatproof throughout the hot Coimbatore afternoon. Everyone praised my look!",
    rating: 5,
    occasion: "Bridal HD - Wedding",
    date: "2026-04-12"
  },
  {
    id: "t2",
    name: "Ananya Krishnan",
    quote: "Highly recommend her Airbrush makeup combo. It felt light as air, didn't feel cakey, and lasted all night. The rental jewellery she provided was breathtaking too.",
    rating: 5,
    occasion: "Bridal Airbrush & Jewelry - Reception",
    date: "2026-05-02"
  },
  {
    id: "t3",
    name: "Meera Subramanian",
    quote: "Booked her for party makeup and mehendi in Pollachi. Incredible precision with the mehndi design, and the glam makeup was exactly what I asked for—bold but classic.",
    rating: 5,
    occasion: "Glam & Mehendi - Sangeet",
    date: "2026-05-20"
  }
];

export const fallbackFAQs: FAQItem[] = [
  {
    id: "f1",
    question: "How far in advance should I book my wedding makeup?",
    answer: "We highly recommend booking 3 to 6 months in advance. Wedding seasons in Coimbatore and Pollachi fill up rapidly, and booking early secures your date with Karshini.",
    order: 1
  },
  {
    id: "f2",
    question: "Do you travel to the venue / home?",
    answer: "Yes, absolutely! Vivid Spark is a mobile makeup service. We travel directly to your venue, home, or hotel suite anywhere in Coimbatore, Pollachi, and surrounding regions.",
    order: 2
  },
  {
    id: "f3",
    question: "Which areas do you cover without extra travel fees?",
    answer: "We cover the Coimbatore corporation limits and Pollachi town limits. For venues outside these limits, a nominal travel and logistical fee is calculated based on distance.",
    order: 3
  },
  {
    id: "f4",
    question: "Are you certified and what training do you have?",
    answer: "Yes, Karshini is a fully certified professional makeup artist from LAPT (London Academy of Professional Training), specializing in advanced Bridal HD & Airbrush techniques.",
    order: 4
  },
  {
    id: "f5",
    question: "How long does the bridal makeup last?",
    answer: "Our bridal HD and Airbrush makeups are designed with premium, long-wear products to last up to 12-16 hours. They are completely sweat-proof and tear-resistant.",
    order: 5
  },
  {
    id: "f6",
    question: "Do you offer a trial session before the wedding?",
    answer: "Yes, we offer trial sessions for booked brides at a nominal charge. This helps us try different styles and finalize the perfect base shade and eye design before the day.",
    order: 6
  },
  {
    id: "f7",
    question: "What makeup brands do you use?",
    answer: "We use strictly premium, professional, skin-safe international brands such as MAC, Estée Lauder, Huda Beauty, Anastasia Beverly Hills, Kryolan, and NARS.",
    order: 7
  },
  {
    id: "f8",
    question: "How do I book a slot?",
    answer: "You can book directly by clicking 'Book a Slot' on any service card, which displays options to contact us on WhatsApp, Phone Call, or Instagram. A booking is confirmed upon receiving an advance token.",
    order: 8
  }
];

export const fallbackWiki: WikiItem[] = [
  {
    id: "w1",
    title: "How to Build an Ideal Pre-Bridal Skincare Routine",
    slug: "pre-bridal-skincare-routine",
    category: "Skincare Routines",
    summary: "A step-by-step beauty preparation routine starting 3 months before your wedding for that perfect natural glow.",
    content: "### The 3-Month Countdown to Radiant Bridal Skin\n\nEvery beautiful bridal makeup starts with a healthy skin canvas. If you are a bride-to-be from Coimbatore or Pollachi, starting your skincare prep at least 3 months in advance is critical. Here is a proven routine compiled by LAPT certified makeup artist Karshini.\n\n#### 1. Double Cleansing (Evening)\nAlways wash your face twice if you've been outdoors. Use a gentle oil-based cleanser first to melt away sunscreen and pollution, followed by a foaming facial wash.\n\n#### 2. Hydration is King\nIncorporate a Hyaluronic Acid serum onto damp skin to lock in moisture. For South Indian weather, light gel-based moisturizers work beautifully without clogging pores.\n\n#### 3. Weekly Gentle Exfoliation\nAvoid harsh walnut scrubs. Use lactic or mandelic acid twice a week to slough off dead skin cells and reveal a brighter tone.",
    author: "Karshini, LAPT Certified",
    createdAt: "2026-06-01",
    lastUpdated: "2026-06-15",
    helpfulYes: 24,
    helpfulNo: 1
  },
  {
    id: "w2",
    title: "HD Makeup vs Airbrush Makeup: Which is Best for You?",
    slug: "hd-vs-airbrush-makeup",
    category: "Makeup",
    summary: "Confused between High Definition and Airbrush makeup? Here is an honest guide comparing coverage, finish, and longevity.",
    content: "### Decoding Bridal Base Formats\n\nAs a certified makeup artist, one of the most common questions brides ask me is: *\"Should I choose HD or Airbrush makeup for my wedding?\"* Let's break down the scientific differences so you can make an informed choice.\n\n#### What is HD Makeup?\nHD (High Definition) makeup uses specialized micro-milled silicon-based products that mimic real skin under intense photography lenses. It is applied manually using premium brushes and beauty sponges. It is highly blendable and perfect for covering deep pigmentations.\n\n#### What is Airbrush Makeup?\nAirbrush makeup uses a specialized compressor gun that atomizes liquid foundation into a micro-fine mist. It sits *above* the skin without sinking into pores. It is highly sweat-proof and holds up flawlessly during humid outdoor weddings in Pollachi.\n\n#### Summary Recommendation\nChoose **Airbrush** if you have oily skin and an outdoor venue. Choose **HD** if you prefer highly customizable coverage or have dry/textured skin.",
    author: "Karshini, LAPT Certified",
    createdAt: "2026-06-03",
    lastUpdated: "2026-06-18",
    helpfulYes: 31,
    helpfulNo: 2
  },
  {
    id: "w3",
    title: "How to Keep Your Bridal Mehendi Stain Rich & Dark",
    slug: "bridal-mehendi-stain-tips",
    category: "Bridal & Occasion Prep",
    summary: "Expert tips and aftercare instructions to get that beautiful deep mahogany color on your wedding day.",
    content: "### The Secret to Deep Mahogany Bridal Stain\n\nYour Mehendi is an integral part of your bridal elegance. To achieve a gorgeous, dark stain, you must practice proper care after application.\n\n#### 1. Let it Dry Naturally\nDo not use a blowdryer, as hot air can cause the wet henna paste to bubble and lift. Let it dry slowly for at least 6-8 hours.\n\n#### 2. Apply Lemon-Sugar Glaze\nOnce the mehendi is semi-dry, dab a mixture of lemon juice and sugar gently using a cotton ball. This keeps the paste moist and stuck to your skin longer.\n\n#### 3. Avoid Water For 24 Hours\nThis is the golden rule. When removing the dry paste, scrape it off gently with a butter knife or card. Do not use soap or water. Apply coconut oil or mustard oil instead.",
    author: "Karshini, LAPT Certified",
    createdAt: "2026-06-05",
    lastUpdated: "2026-06-12",
    helpfulYes: 18,
    helpfulNo: 0
  },
  {
    id: "w4",
    title: "Essential Skincare Routine for Humid South Indian Climate",
    slug: "humid-climate-skincare",
    category: "Skincare",
    summary: "How to combat humidity, excess oil, and breakouts with a simple daily routine designed for Coimbatore weather.",
    content: "### Combatting Humid Skin Woes\n\nCoimbatore and Pollachi feature beautiful, but often humid, tropical weather. This causes over-secretion of sebum, leading to acne and dullness. Here is your daily defense.\n\n#### Morning Routine:\n- Cleanser: Salicylic acid gel wash\n- Toner: Niacinamide spray (regulates sebum)\n- Moisturizer: Ultra-lightweight water gel\n- Sunscreen: Matte fluid SPF 50 (non-negotiable)\n\n#### Pro Tip:\nAlways carry blotting papers instead of applying compact powder repeatedly, which traps sweat and breeds bacteria.",
    author: "Karshini, LAPT Certified",
    createdAt: "2026-06-10",
    lastUpdated: "2026-06-20",
    helpfulYes: 15,
    helpfulNo: 1
  },
  {
    id: "w5",
    title: "How to Choose the Right Makeup Sponge and Clean It Properly",
    slug: "makeup-sponge-cleaning-guide",
    category: "Tools & Accessories",
    summary: "Your makeup tools hold bacteria that cause acne. Learn how to wash and sanitize your beauty blenders correctly.",
    content: "### The Beauty Sponge: Your Best Friend or Skin's Enemy?\n\nA damp makeup sponge delivers that beautiful, airbrushed finish. However, its moist core is a hotbed for mold and acne-causing bacteria.\n\n#### Weekly Deep Cleaning Ritual:\n1. Soak the sponge in warm water mixed with a few drops of anti-bacterial liquid soap.\n2. Microwaving trick: Place it inside a microwave-safe mug with soapy water and microwave for 30 seconds. This sterilizes it completely!\n3. Squeeze and rinse under running water until the water runs 100% clear.\n4. Always dry it in an open, airy spot—never inside a closed makeup bag.",
    author: "Karshini, LAPT Certified",
    createdAt: "2026-06-12",
    lastUpdated: "2026-06-14",
    helpfulYes: 22,
    helpfulNo: 0
  }
];

export const fallbackShop: ShopItem[] = [
  {
    id: "sh1",
    name: "Bioderma Sensibio H2O Micellar Water",
    imageUrl: "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=800&auto=format&fit=crop&q=80",
    description: "The absolute gold standard in makeup removal. Gentle on sensitive skin, non-sticky, and clears waterproof makeup easily.",
    category: "Skincare",
    price: "₹399",
    affiliateLink: "https://www.amazon.in/s?k=bioderma+sensibio+h2o+micellar+water",
    isActive: true,
    createdAt: "2026-06-01"
  },
  {
    id: "sh2",
    name: "Minimalist 10% Niacinamide Serum",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    description: "Incredibly effective for controlling excess sebum secretion and clearing dark spots before your bridal photoshoot.",
    category: "Skincare",
    price: "₹599",
    affiliateLink: "https://www.amazon.in/s?k=minimalist+niacinamide+10",
    isActive: true,
    createdAt: "2026-06-03"
  },
  {
    id: "sh3",
    name: "L'Oreal Infallible 24H Fresh Wear Powder Foundation",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    description: "Perfect for on-the-go touchups in humid conditions. Gives high coverage and controls sweat for up to 24 hours.",
    category: "Makeup",
    price: "₹1,250",
    affiliateLink: "https://www.amazon.in/s?k=loreal+infallible+powder+foundation",
    isActive: true,
    createdAt: "2026-06-05"
  },
  {
    id: "sh4",
    name: "Real Techniques Miracle Complexion Sponge",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80",
    description: "My personal favorite blending sponge. Features a unique flat-edge perfect for pressing in powder and foundation.",
    category: "Tools & Accessories",
    price: "₹799",
    affiliateLink: "https://www.amazon.in/s?k=real+techniques+miracle+complexion+sponge",
    isActive: true,
    createdAt: "2026-06-07"
  },
  {
    id: "sh5",
    name: "COSRX Advanced Snail 96 Mucin Essence",
    imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80",
    description: "Deeply hydrating snail secretion filtrate that leaves a glassy skin finish under any bridal foundation base.",
    category: "Skincare",
    price: "₹1,450",
    affiliateLink: "https://www.amazon.in/s?k=cosrx+snail+96",
    isActive: true,
    createdAt: "2026-06-10"
  },
  {
    id: "sh6",
    name: "Huda Beauty Easy Bake Loose Powder",
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80",
    description: "Crucial for wedding receptions. Locks under-eye concealer and prevents creasing under warm spotlight setups.",
    category: "Makeup",
    price: "₹3,100",
    affiliateLink: "https://www.amazon.in/s?k=huda+beauty+easy+bake",
    isActive: true,
    createdAt: "2026-06-12"
  },
  {
    id: "sh7",
    name: "Sigma Beauty F80 Flat Kabuki Brush",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
    description: "Dense flat brush that delivers high coverage without absorption. Essential for a flawless liquid makeup canvas.",
    category: "Tools & Accessories",
    price: "₹2,200",
    affiliateLink: "https://www.amazon.in/s?k=sigma+f80",
    isActive: true,
    createdAt: "2026-06-14"
  },
  {
    id: "sh8",
    name: "Urban Decay All Nighter Setting Spray",
    imageUrl: "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=800&auto=format&fit=crop&q=80",
    description: "The ultimate makeup shield. Keeps eyeshadow, base, and contour in place for up to 16 hours without fading.",
    category: "Makeup",
    price: "₹2,900",
    affiliateLink: "https://www.amazon.in/s?k=urban+decay+all+nighter+setting+spray",
    isActive: true,
    createdAt: "2026-06-16"
  }
];

// Helper functions to get data with Firestore read + local fallback
export async function getSettings(): Promise<GlobalSettings> {
  if (isSanityConfigured()) {
    const data = await getSanitySettings();
    if (data) return data;
  }
  try {
    const sDoc = await getDoc(doc(db, "settings", "global"));
    if (sDoc.exists()) {
      return sDoc.data() as GlobalSettings;
    }
  } catch (e) {
    console.warn("Firestore error reading settings, falling back to local memory: ", e);
  }
  return fallbackSettings;
}

export async function saveSettings(settings: GlobalSettings): Promise<void> {
  await setDoc(doc(db, "settings", "global"), settings);
}

export async function getServices(): Promise<ServiceItem[]> {
  if (isSanityConfigured()) {
    const data = await getSanityServices();
    if (data) return data;
  }
  try {
    const qSnap = await getDocs(collection(db, "services"));
    if (!qSnap.empty) {
      const services: ServiceItem[] = [];
      qSnap.forEach((doc) => {
        services.push({ id: doc.id, ...doc.data() } as ServiceItem);
      });
      return services;
    }
  } catch (e) {
    console.warn("Firestore error reading services, falling back to local memory: ", e);
  }
  return fallbackServices;
}

export async function saveService(service: ServiceItem): Promise<void> {
  await setDoc(doc(db, "services", service.id), service);
}

export async function deleteService(id: string): Promise<void> {
  await deleteDoc(doc(db, "services", id));
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  if (isSanityConfigured()) {
    const data = await getSanityPortfolio();
    if (data) return data;
  }
  try {
    const qSnap = await getDocs(collection(db, "portfolio"));
    if (!qSnap.empty) {
      const items: PortfolioItem[] = [];
      qSnap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as PortfolioItem);
      });
      return items;
    }
  } catch (e) {
    console.warn("Firestore error reading portfolio, falling back to local memory: ", e);
  }
  return fallbackPortfolio;
}

export async function savePortfolioItem(item: PortfolioItem): Promise<void> {
  await setDoc(doc(db, "portfolio", item.id), item);
}

export async function deletePortfolioItem(id: string): Promise<void> {
  await deleteDoc(doc(db, "portfolio", id));
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (isSanityConfigured()) {
    const data = await getSanityTestimonials();
    if (data) return data;
  }
  try {
    const qSnap = await getDocs(collection(db, "testimonials"));
    if (!qSnap.empty) {
      const items: TestimonialItem[] = [];
      qSnap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as TestimonialItem);
      });
      return items;
    }
  } catch (e) {
    console.warn("Firestore error reading testimonials, falling back to local memory: ", e);
  }
  return fallbackTestimonials;
}

export async function saveTestimonial(testimonial: TestimonialItem): Promise<void> {
  await setDoc(doc(db, "testimonials", testimonial.id), testimonial);
}

export async function deleteTestimonial(id: string): Promise<void> {
  await deleteDoc(doc(db, "testimonials", id));
}

export async function getFAQs(): Promise<FAQItem[]> {
  if (isSanityConfigured()) {
    const data = await getSanityFAQs();
    if (data) return data;
  }
  try {
    const qSnap = await getDocs(collection(db, "faq"));
    if (!qSnap.empty) {
      const items: FAQItem[] = [];
      qSnap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as FAQItem);
      });
      return items.sort((a, b) => a.order - b.order);
    }
  } catch (e) {
    console.warn("Firestore error reading FAQs, falling back to local memory: ", e);
  }
  return fallbackFAQs;
}

export async function saveFAQ(faq: FAQItem): Promise<void> {
  await setDoc(doc(db, "faq", faq.id), faq);
}

export async function deleteFAQ(id: string): Promise<void> {
  await deleteDoc(doc(db, "faq", id));
}

export async function getWiki(): Promise<WikiItem[]> {
  if (isSanityConfigured()) {
    const data = await getSanityWiki();
    if (data) return data;
  }
  try {
    const qSnap = await getDocs(collection(db, "wiki"));
    if (!qSnap.empty) {
      const items: WikiItem[] = [];
      qSnap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as WikiItem);
      });
      return items;
    }
  } catch (e) {
    console.warn("Firestore error reading wiki, falling back to local memory: ", e);
  }
  return fallbackWiki;
}

export async function saveWikiItem(item: WikiItem): Promise<void> {
  await setDoc(doc(db, "wiki", item.id), item);
}

export async function deleteWikiItem(id: string): Promise<void> {
  await deleteDoc(doc(db, "wiki", id));
}

export async function getShop(): Promise<ShopItem[]> {
  if (isSanityConfigured()) {
    const data = await getSanityShop();
    if (data) return data;
  }
  try {
    const qSnap = await getDocs(collection(db, "shop"));
    if (!qSnap.empty) {
      const items: ShopItem[] = [];
      qSnap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ShopItem);
      });
      return items;
    }
  } catch (e) {
    console.warn("Firestore error reading shop, falling back to local memory: ", e);
  }
  return fallbackShop;
}

export async function saveShopItem(item: ShopItem): Promise<void> {
  await setDoc(doc(db, "shop", item.id), item);
}

export async function deleteShopItem(id: string): Promise<void> {
  await deleteDoc(doc(db, "shop", id));
}

// Function to seed Firestore once if the user triggers it in Admin Panel, or automatically
export async function seedFirestoreDatabase(force = false) {
  try {
    // Check if seeded
    const sDoc = await getDoc(doc(db, "settings", "global"));
    if (sDoc.exists() && !force) {
      console.log("Database already initialized.");
      return;
    }

    console.log("Seeding Firestore database...");
    await setDoc(doc(db, "settings", "global"), fallbackSettings);

    for (const service of fallbackServices) {
      await setDoc(doc(db, "services", service.id), service);
    }
    for (const item of fallbackPortfolio) {
      await setDoc(doc(db, "portfolio", item.id), item);
    }
    for (const item of fallbackTestimonials) {
      await setDoc(doc(db, "testimonials", item.id), item);
    }
    for (const item of fallbackFAQs) {
      await setDoc(doc(db, "faq", item.id), item);
    }
    for (const item of fallbackWiki) {
      await setDoc(doc(db, "wiki", item.id), item);
    }
    for (const item of fallbackShop) {
      await setDoc(doc(db, "shop", item.id), item);
    }
    console.log("Seeding completed successfully.");
  } catch (e) {
    console.error("Database seed error: ", e);
  }
}
