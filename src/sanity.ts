import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { 
  GlobalSettings, 
  PortfolioItem, 
  ServiceItem, 
  TestimonialItem, 
  FAQItem, 
  WikiItem, 
  ShopItem 
} from "./dbHelper";

// 1. Retrieve Sanity configuration from environment variables
const metaEnv = (import.meta as any).env || {};
const projectId = metaEnv.VITE_SANITY_PROJECT_ID || "0dtesla7";
const dataset = metaEnv.VITE_SANITY_DATASET || "production";
const apiVersion = metaEnv.VITE_SANITY_API_VERSION || "2023-05-03";
const token = metaEnv.VITE_SANITY_TOKEN || ""; // Optional write/preview token

// 2. Initialize the client (only if projectId is present, otherwise fallback gracefully)
export const sanityClient = projectId 
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // `false` if you want to ensure fresh data on every load
      token: token || undefined,
    })
  : null;

// 3. Initialize the Image URL Builder for Sanity Asset References
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!builder || !source) return "";
  // If source is already an absolute HTTP/S string, just return it directly
  if (typeof source === "string" && source.startsWith("http")) {
    return source;
  }
  try {
    return builder.image(source).url() || "";
  } catch (e) {
    return "";
  }
}

// 4. Helper to check if Sanity is fully configured
export const isSanityConfigured = (): boolean => {
  return !!projectId;
};

// 5. Define GROQ queries and data fetchers with fallback mapping
export async function getSanitySettings(): Promise<GlobalSettings | null> {
  if (!sanityClient) return null;
  try {
    // We assume the settings document is a singleton with _id = 'globalSettings' or type = 'globalSettings'
    const query = `*[_type == "globalSettings"][0]`;
    const data = await sanityClient.fetch(query);
    if (!data) return null;

    return {
      heroTitle: data.heroTitle || "",
      heroTagline: data.heroTagline || "",
      heroDescription: data.heroDescription || "",
      storyNarrative: data.storyNarrative || "",
      storyNarrativeExtended: data.storyNarrativeExtended || "",
      whatsappNumber: data.whatsappNumber || "",
      phoneNumber: data.phoneNumber || "",
      instagramHandle: data.instagramHandle || "",
      emailAddress: data.emailAddress || "",
      serviceArea: data.serviceArea || "",
    };
  } catch (e) {
    console.warn("Unable to fetch globalSettings from Sanity (falling back to database/local):", e instanceof Error ? e.message : e);
    return null;
  }
}

export async function getSanityServices(): Promise<ServiceItem[] | null> {
  if (!sanityClient) return null;
  try {
    const query = `*[_type == "serviceItem"] | order(name asc)`;
    const data = await sanityClient.fetch(query);
    if (!Array.isArray(data)) return null;

    return data.map((item: any) => ({
      id: item._id || item.id,
      name: item.name || "",
      startingPrice: item.startingPrice || "",
      category: item.category || "",
      imageUrl: urlFor(item.imageUrl || item.image),
      description: item.description || "",
      features: Array.isArray(item.features) 
        ? item.features.join(", ") 
        : (item.features || ""),
    }));
  } catch (e) {
    console.warn("Unable to fetch serviceItems from Sanity (falling back to database/local):", e instanceof Error ? e.message : e);
    return null;
  }
}

export async function getSanityPortfolio(): Promise<PortfolioItem[] | null> {
  if (!sanityClient) return null;
  try {
    const query = `*[_type == "portfolioItem"] | order(createdAt desc)`;
    const data = await sanityClient.fetch(query);
    if (!Array.isArray(data)) return null;

    return data.map((item: any) => ({
      id: item._id || item.id,
      imageUrl: urlFor(item.imageUrl || item.image),
      caption: item.caption || "",
      category: item.category || "",
      createdAt: item.createdAt || item._createdAt || "",
    }));
  } catch (e) {
    console.warn("Unable to fetch portfolioItems from Sanity (falling back to database/local):", e instanceof Error ? e.message : e);
    return null;
  }
}

export async function getSanityTestimonials(): Promise<TestimonialItem[] | null> {
  if (!sanityClient) return null;
  try {
    const query = `*[_type == "testimonialItem"] | order(date desc)`;
    const data = await sanityClient.fetch(query);
    if (!Array.isArray(data)) return null;

    return data.map((item: any) => ({
      id: item._id || item.id,
      name: item.name || "",
      quote: item.quote || "",
      rating: typeof item.rating === "number" ? item.rating : 5,
      occasion: item.occasion || "",
      date: item.date || item._createdAt || "",
    }));
  } catch (e) {
    console.warn("Unable to fetch testimonialItems from Sanity (falling back to database/local):", e instanceof Error ? e.message : e);
    return null;
  }
}

export async function getSanityFAQs(): Promise<FAQItem[] | null> {
  if (!sanityClient) return null;
  try {
    const query = `*[_type == "faqItem"] | order(order asc)`;
    const data = await sanityClient.fetch(query);
    if (!Array.isArray(data)) return null;

    return data.map((item: any) => ({
      id: item._id || item.id,
      question: item.question || "",
      answer: item.answer || "",
      order: typeof item.order === "number" ? item.order : 0,
    }));
  } catch (e) {
    console.warn("Unable to fetch faqItems from Sanity (falling back to database/local):", e instanceof Error ? e.message : e);
    return null;
  }
}

export async function getSanityWiki(): Promise<WikiItem[] | null> {
  if (!sanityClient) return null;
  try {
    const query = `*[_type == "wikiItem"] | order(createdAt desc)`;
    const data = await sanityClient.fetch(query);
    if (!Array.isArray(data)) return null;

    return data.map((item: any) => ({
      id: item._id || item.id,
      title: item.title || "",
      slug: item.slug?.current || item.slug || "",
      category: item.category || "",
      summary: item.summary || "",
      content: item.content || "",
      author: item.author || "Karshini",
      createdAt: item.createdAt || item._createdAt || "",
      lastUpdated: item.lastUpdated || item._updatedAt || "",
      helpfulYes: typeof item.helpfulYes === "number" ? item.helpfulYes : 0,
      helpfulNo: typeof item.helpfulNo === "number" ? item.helpfulNo : 0,
    }));
  } catch (e) {
    console.warn("Unable to fetch wikiItems from Sanity (falling back to database/local):", e instanceof Error ? e.message : e);
    return null;
  }
}

export async function getSanityShop(): Promise<ShopItem[] | null> {
  if (!sanityClient) return null;
  try {
    const query = `*[_type == "shopItem"] | order(createdAt desc)`;
    const data = await sanityClient.fetch(query);
    if (!Array.isArray(data)) return null;

    return data.map((item: any) => ({
      id: item._id || item.id,
      name: item.name || "",
      imageUrl: urlFor(item.imageUrl || item.image),
      description: item.description || "",
      category: item.category || "",
      price: item.price || "",
      affiliateLink: item.affiliateLink || "",
      isActive: typeof item.isActive === "boolean" ? item.isActive : true,
      createdAt: item.createdAt || item._createdAt || "",
    }));
  } catch (e) {
    console.warn("Unable to fetch shopItems from Sanity (falling back to database/local):", e instanceof Error ? e.message : e);
    return null;
  }
}
