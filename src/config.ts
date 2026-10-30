/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductImageConfig {
  url: string;
  googleDriveId?: string;
  alt: string;
  fallback: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  city?: string;
  rating: number; // 1-5
  date: string;
  reviewText: string;
  approved: boolean;
  photoUrl?: string;
}

export interface ReviewVideo {
  id: string;
  title: string;
  customerName?: string;
  videoUrl: string; // YouTube or direct MP4
  thumbnailUrl?: string;
  approved: boolean;
}

export interface SiteConfig {
  brandName: string;
  productName: string;
  tagline: string;
  packSize: string;
  price: number | null | string;
  mrp: number | null | string;
  currencySymbol: string;
  heroDescription: string;
  whatsAppNumber: string;
  whatsAppGreeting: string;
  imageVersion: number;
  images: {
    mainImage: ProductImageConfig;
    promoImage1: ProductImageConfig;
    promoImage2: ProductImageConfig;
  };
  reviews: CustomerReview[];
  reviewVideos: ReviewVideo[];
  contact: {
    brand: string;
    email: string;
    supportHours: string;
    address: string;
    ayurvedicLicenseNo?: string;
  };
  shipping: {
    dispatchTime: string;
    deliveryTimeline: string;
    chargesNote: string;
  };
  policies: {
    privacyPolicy: string;
    termsAndConditions: string;
    shippingPolicy: string;
    cancellationAndRefundPolicy: string;
  };
}

export const DEFAULT_CONFIG: SiteConfig = {
  brandName: "KOSTAK Healthcare",
  productName: "DAAD FREE Ayurvedic Antifungal Cream",
  tagline: "Ayurvedic Topical Care for Fungal Skin Concerns, Itching & Ringworm",
  packSize: "25 gm",
  price: 199,
  mrp: 250,
  currencySymbol: "₹",
  heroDescription:
    "A classical Ayurvedic formulation crafted with purifying herbs for targeted external soothing relief from skin itching, ringworm (daad), and fungal irritations. Free from artificial dyes and harsh synthetic chemicals.",
  whatsAppNumber: "919876543210",
  whatsAppGreeting:
    "Hello KOSTAK Healthcare, I am interested in ordering DAAD FREE Ayurvedic Antifungal Cream, 25 gm.",
  imageVersion: 1,
  images: {
    mainImage: {
      url: "/assets/images/25 gm_Master_Product_front.jpg.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE Ayurvedic Antifungal Cream 25 gm primary product tube and carton packaging",
      fallback: "/assets/images/25 gm_Master_Product_front.jpg.jpeg",
    },
    promoImage1: {
      url: "/assets/images/Post1_Option2.jpg.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 25g cream tube on limestone pedestal with Ayurvedic neem and herbs",
      fallback: "/assets/images/Post1_Option2.jpg.jpeg",
    },
    promoImage2: {
      url: "/assets/images/Post2.jpg.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE Ayurvedic cream tube with herbal brass bowl and turmeric",
      fallback: "/assets/images/Post2.jpg.jpeg",
    },
  },
  reviews: [], // Starts empty per instructions until genuine reviews are approved
  reviewVideos: [], // Starts empty until genuine videos are approved
  contact: {
    brand: "KOSTAK Healthcare",
    email: "kostakhealthcare@gmail.com",
    supportHours: "Monday to Saturday, 9:00 AM – 7:00 PM IST",
    address: "India",
    ayurvedicLicenseNo: "Approved Ayurvedic Proprietary Medicine (See packaging for Lic. No & Batch)",
  },
  shipping: {
    dispatchTime: "Dispatched within 24 to 48 business hours after WhatsApp confirmation.",
    deliveryTimeline: "Estimated delivery within 3–7 business days across India.",
    chargesNote: "Shipping charges or free delivery threshold will be confirmed directly during WhatsApp checkout.",
  },
  policies: {
    privacyPolicy: `KOSTAK Healthcare respects your privacy. When you contact us or order through WhatsApp, we collect only the necessary details (such as your name, delivery address, and contact number) required to process and fulfill your order. We do not sell, rent, or trade your personal information with any third party. Your communication remains strictly confidential between you and KOSTAK Healthcare.`,
    termsAndConditions: `1. Ordering Process: Clicking "Buy Now on WhatsApp" initiates an inquiry. An order is confirmed only after availability, shipping details, and payment arrangements are mutually agreed upon with KOSTAK Healthcare via WhatsApp.
2. Product Usage: DAAD FREE is an Ayurvedic proprietary formulation for external topical use only. It should be used strictly according to directions on the packaging or as advised by an Ayurvedic physician.
3. No Medical Guarantee: Results may vary depending on individual skin condition and consistency of use. DAAD FREE does not claim to cure internal systemic diseases or replace professional medical advice for severe conditions.
4. Changes to Terms: KOSTAK Healthcare reserves the right to update product pricing and policy terms without prior notice.`,
    shippingPolicy: `Orders are packed and dispatched via trusted domestic courier services within 24–48 business hours after WhatsApp confirmation. Delivery typically takes 3 to 7 business days across India. Tracking information will be shared directly on WhatsApp upon shipment.`,
    cancellationAndRefundPolicy: `1. Cancellation: You may cancel your order at any time before it has been dispatched by notifying us on WhatsApp.
2. Returns: Due to hygiene, personal care, and safety standards for topical healthcare products, opened or used cream tubes cannot be returned.
3. Damaged or Wrong Item: If you receive a damaged package or an incorrect product, notify us on WhatsApp within 48 hours of delivery with photos/unboxing video, and we will arrange a prompt replacement or refund.`,
  },
};

/**
 * Extracts a Google Drive File ID from either a raw ID, a sharing link, or a direct link
 */
export function extractGoogleDriveId(input: string | undefined): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) return match[1];

  const matchId = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) return matchId[1];

  return null;
}

/**
 * Builds a fast, reliable direct CDN URL for Google Drive files
 * Google's high-speed CDN: https://lh3.googleusercontent.com/d/{FILE_ID}
 */
export function resolveImageUrl(imageConfig: ProductImageConfig, version: number): string {
  const driveId = extractGoogleDriveId(imageConfig.googleDriveId);
  if (driveId) {
    return `https://lh3.googleusercontent.com/d/${driveId}?v=${version}`;
  }
  if (imageConfig.url && imageConfig.url.trim()) {
    const isLocal = imageConfig.url.startsWith("/") || imageConfig.url.startsWith("./");
    return isLocal ? `${imageConfig.url}?v=${version}` : imageConfig.url;
  }
  return imageConfig.fallback;
}

/**
 * Normalizes YouTube video URLs to embed format
 */
export function getEmbedVideoUrl(url: string): { type: "youtube" | "direct" | "unknown"; src: string } {
  if (!url) return { type: "unknown", src: "" };
  const trimmed = url.trim();

  // YouTube match
  const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`,
    };
  }

  // Google Drive video
  const driveId = extractGoogleDriveId(trimmed);
  if (driveId) {
    return {
      type: "youtube", // Drive preview iframe behaves like embed
      src: `https://drive.google.com/file/d/${driveId}/preview`,
    };
  }

  // Direct MP4 or video
  if (trimmed.endsWith(".mp4") || trimmed.endsWith(".webm") || trimmed.startsWith("http")) {
    return { type: "direct", src: trimmed };
  }

  return { type: "direct", src: trimmed };
}

/**
 * Retrieves the current site configuration from window object, localStorage, or default
 */
export function loadSiteConfig(): SiteConfig {
  const localOverride = localStorage.getItem("KOSTAK_DAAD_FREE_CONFIG");
  if (localOverride) {
    try {
      const parsed = JSON.parse(localOverride);
      return { ...DEFAULT_CONFIG, ...parsed };
    } catch {
      // ignore JSON parse error
    }
  }

  if (typeof window !== "undefined" && (window as unknown as { DAAD_FREE_CONFIG?: Partial<SiteConfig> }).DAAD_FREE_CONFIG) {
    const winConfig = (window as unknown as { DAAD_FREE_CONFIG: Partial<SiteConfig> }).DAAD_FREE_CONFIG;
    return { ...DEFAULT_CONFIG, ...winConfig };
  }

  return DEFAULT_CONFIG;
}

/**
 * Saves configuration to browser localStorage for instant preview
 */
export function saveSiteConfigLocally(config: SiteConfig): void {
  localStorage.setItem("KOSTAK_DAAD_FREE_CONFIG", JSON.stringify(config, null, 2));
}

/**
 * Resets local override to original site-config.js defaults
 */
export function resetSiteConfigLocally(): void {
  localStorage.removeItem("KOSTAK_DAAD_FREE_CONFIG");
}
