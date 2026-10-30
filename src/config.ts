/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  WHATSAPP_BUSINESS,
  generateWhatsAppOrderUrl,
  generateOrderMessage,
  formatSizeDisplay,
  formatPackDisplay,
  OrderMessageParams,
} from './whatsapp-config';

export {
  WHATSAPP_BUSINESS,
  generateWhatsAppOrderUrl,
  generateOrderMessage,
  formatSizeDisplay,
  formatPackDisplay,
};
export type { OrderMessageParams };

export interface ProductImageConfig {
  url: string;
  googleDriveId?: string;
  alt: string;
  fallback: string;
}

export interface ProductPackOption {
  id: string;
  name: string;
  size: string; // '25g' or '15g'
  sizeCategory?: '15g' | '25g';
  packType?: 'single' | 'pack2' | 'pack4';
  packLabel?: string; // 'Single', 'Pack of 2', 'Pack of 4'
  quantityInPack: number;
  price: number;
  mrp: number;
  imageUrl: string;
  badge?: string;
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
  companyFullName: string;
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
    frontBackJar: ProductImageConfig;
    promoImage1: ProductImageConfig;
    promoImage2: ProductImageConfig;
    packOf2Image: ProductImageConfig;
    packOf4Image: ProductImageConfig;
    fifteenGmImage: ProductImageConfig;
    fifteenGmPack2: ProductImageConfig;
    fifteenGmPack4: ProductImageConfig;
  };
  packOptions: ProductPackOption[];
  reviews: CustomerReview[];
  reviewVideos: ReviewVideo[];
  contact: {
    brand: string;
    email: string;
    phone: string;
    supportHours: string;
    officeAddress: string;
    mfgAddress: string;
    ayurvedicLicenseNo: string;
    batchNo: string;
    expiryPeriod: string;
  };
  ingredients: {
    name: string;
    botanicalName: string;
    percentage: string;
    role: string;
  }[];
  directions: string[];
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
  companyFullName: "Kostak Healthcare Private Limited",
  productName: "DAAD FREE Ayurvedic Antifungal Cream",
  tagline: "दाद का दिव्यास्त्र • दाद, खाज, खुजली की असरदार दवाई",
  packSize: "25 gm",
  price: 349, // From actual packaging label: ₹349 (MRP 380)
  mrp: 380,
  currencySymbol: "₹",
  heroDescription:
    "An authentic Ayurvedic proprietary formula with 49% Alba Bark (श्वेत कुटज), Curcuma Longa (हल्दी), and Aloe Vera. Provides fast, soothing relief from ringworm (daad), severe itching, and fungal skin distress. Relief from the first day.",
  whatsAppNumber: "919131138853", // From genuine label: Customer Support 9131138853 (with 91 country code)
  whatsAppGreeting:
    "Hello KOSTAK Healthcare, I am interested in ordering DAAD FREE Ayurvedic Antifungal Cream.",
  imageVersion: 1,
  images: {
    mainImage: {
      url: "/assets/aistudio/25_gm_Master_Product_front.jpg_0667641f.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE Ayurvedic Antifungal Cream 25 gm Master Product Jar by Kostak Healthcare",
      fallback: "/assets/images/25_gm_Master_Product_front.jpg",
    },
    frontBackJar: {
      url: "/assets/aistudio/WhatsApp_Image_2026-10-16_at_6.14.44_PM_c6612cd6.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 25 gm front and back label with complete ingredients, directions and manufacturing details",
      fallback: "/assets/images/25gm_front_and_back_jar.jpeg",
    },
    promoImage1: {
      url: "/assets/aistudio/Post1.jpg_6034f5d5.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE - दाद, खाज, खुजली की असरदार दवाई - पहले ही दिन से खुजली में राहत",
      fallback: "/assets/images/Post1_Option2.jpg.jpeg",
    },
    promoImage2: {
      url: "/assets/aistudio/Post2.jpg_bef9deeb.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE - दाद का दिव्यास्त्र - Fight skin infection, Kill fungus, Relieves itching",
      fallback: "/assets/images/Post2.jpg.jpeg",
    },
    packOf2Image: {
      url: "/assets/aistudio/25_gm_Master_Product_front_Packof2.jpg_976326fb.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 25 gm Pack of 2 Jars",
      fallback: "/assets/images/25gm_pack_of_2.jpeg",
    },
    packOf4Image: {
      url: "/assets/aistudio/25_gm_Master_Product_front_Packof4.jpg_d3371fa5.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 25 gm Pack of 4 Jars (Family Saver Pack)",
      fallback: "/assets/images/25gm_pack_of_4.jpeg",
    },
    fifteenGmImage: {
      url: "/assets/aistudio/15gm_Master_Product.jpg_d47597ac.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 15 gm Master Jar",
      fallback: "/assets/images/15gm_master_product.jpeg",
    },
    fifteenGmPack2: {
      url: "/assets/aistudio/15gm_pack_of_2.jpg_63c7cb40.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 15 gm Pack of 2",
      fallback: "/assets/images/15gm_pack_of_2.jpeg",
    },
    fifteenGmPack4: {
      url: "/assets/aistudio/15gm_pack_of_4.jpg_a444cbd3.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 15 gm Pack of 4",
      fallback: "/assets/images/15gm_pack_of_4.jpeg",
    },
  },
  packOptions: [
    {
      id: "25gm-single",
      name: "Single Jar (Standard)",
      size: "25g",
      sizeCategory: "25g",
      packType: "single",
      packLabel: "Single",
      quantityInPack: 1,
      price: 349,
      mrp: 380,
      imageUrl: "/assets/aistudio/25_gm_Master_Product_front.jpg_0667641f.jpeg",
      badge: "Most Popular",
    },
    {
      id: "25gm-pack2",
      name: "Pack of 2 Jars",
      size: "25g",
      sizeCategory: "25g",
      packType: "pack2",
      packLabel: "Pack of 2",
      quantityInPack: 2,
      price: 649,
      mrp: 760,
      imageUrl: "/assets/aistudio/25_gm_Master_Product_front_Packof2.jpg_976326fb.jpeg",
      badge: "Save ₹111",
    },
    {
      id: "25gm-pack4",
      name: "Pack of 4 Jars (Family Saver)",
      size: "25g",
      sizeCategory: "25g",
      packType: "pack4",
      packLabel: "Pack of 4",
      quantityInPack: 4,
      price: 1199,
      mrp: 1520,
      imageUrl: "/assets/aistudio/25_gm_Master_Product_front_Packof4.jpg_d3371fa5.jpeg",
      badge: "Best Value (Save ₹321)",
    },
    {
      id: "15gm-single",
      name: "Compact Jar (Travel Friendly)",
      size: "15g",
      sizeCategory: "15g",
      packType: "single",
      packLabel: "Single",
      quantityInPack: 1,
      price: 249,
      mrp: 280,
      imageUrl: "/assets/aistudio/15gm_Master_Product.jpg_d47597ac.jpeg",
      badge: "Travel Size",
    },
    {
      id: "15gm-pack2",
      name: "Pack of 2 Jars (15g x 2)",
      size: "15g",
      sizeCategory: "15g",
      packType: "pack2",
      packLabel: "Pack of 2",
      quantityInPack: 2,
      price: 469,
      mrp: 560,
      imageUrl: "/assets/aistudio/15gm_pack_of_2.jpg_63c7cb40.jpeg",
      badge: "Save ₹91",
    },
    {
      id: "15gm-pack4",
      name: "Pack of 4 Jars (15g x 4)",
      size: "15g",
      sizeCategory: "15g",
      packType: "pack4",
      packLabel: "Pack of 4",
      quantityInPack: 4,
      price: 879,
      mrp: 1120,
      imageUrl: "/assets/aistudio/15gm_pack_of_4.jpg_a444cbd3.jpeg",
      badge: "Economy Saver",
    },
  ],
  reviews: [],
  reviewVideos: [],
  contact: {
    brand: "Kostak Healthcare Private Limited",
    email: "kostakhealthcare@gmail.com",
    phone: "9131138853",
    supportHours: "Monday to Saturday, 9:00 AM – 7:00 PM IST",
    officeAddress: "138/139 B, Shriram Nagar, Khajrana, Indore, M.P. 452016",
    mfgAddress: "Village Paal Nagar, Dewas, M.P. 455001",
    ayurvedicLicenseNo: "MP/D/124/2026",
    batchNo: "Dt092601",
    expiryPeriod: "Best before 36 months from Mfg Date",
  },
  ingredients: [
    {
      name: "Alba Bark (श्वेत कुटज छाल)",
      botanicalName: "Alba Bark (Wrightia tinctoria)",
      percentage: "49%",
      role: "Potent classical Ayurvedic bark recognized for purifying skin tissues and counteracting stubborn fungal irritations.",
    },
    {
      name: "Cocos Nucifera (नारियल तेल)",
      botanicalName: "Cocos Nucifera",
      percentage: "0.5%",
      role: "Pure natural coconut medium providing moisture barrier, reducing dry scaling and softening cracked skin.",
    },
    {
      name: "Curcuma Longa (हल्दी / Haridra)",
      botanicalName: "Curcuma Longa",
      percentage: "0.5%",
      role: "Traditional antimicrobial and anti-inflammatory rhizome that soothes burning sensations and promotes skin healing.",
    },
    {
      name: "Aloevera Gel (घृतकुमारी)",
      botanicalName: "Aloe Barbadensis",
      percentage: "3%",
      role: "Instant cooling hydrator that calms intense itching and prevents irritation on sensitive dermal layers.",
    },
    {
      name: "Excipient Base",
      botanicalName: "Ayurvedic Cream Base",
      percentage: "47%",
      role: "Gentle topical carrier ensuring deep penetration without leaving greasy stains.",
    },
  ],
  directions: [
    "बच्चों की पहुँच से दूर रखें (Keep strictly out of reach of children).",
    "दवाई को आँखों में न लगने दें (Avoid contact with eyes and mucous membranes).",
    "दवाई लगाने के बाद हाथों को साबुन से अच्छी तरह धो लें (Wash hands thoroughly with soap after application).",
    "महत्वपूर्ण निर्देश: अगर कोई अन्य Antifungal दवाई या एलोपैथिक क्रीम आप पहले से इस्तेमाल कर रहे हैं, तो उसे बंद करके कम से कम 07 दिन बाद DAAD FREE क्रीम लगाना शुरू करें।",
    "प्रभावित त्वचा को हल्के गुनगुने पानी से साफ करके सूखे कपड़े से सुखाएं और क्रीम की पतली परत दिन में 2 बार लगाएं।",
    "Storage: Store in a dry place away from direct sunlight. For external topical use only.",
  ],
  shipping: {
    dispatchTime: "Dispatched within 24 to 48 business hours after WhatsApp confirmation.",
    deliveryTimeline: "Estimated delivery within 3–7 business days across India via express courier.",
    chargesNote: "Shipping charges or free delivery threshold will be confirmed directly during WhatsApp checkout.",
  },
  policies: {
    privacyPolicy: `KOSTAK Healthcare respects your privacy. When you contact us or order through WhatsApp, we collect only the necessary details (such as your name, delivery address, and contact number) required to process and fulfill your order. We do not sell, rent, or trade your personal information with any third party. Your communication remains confidential between you and Kostak Healthcare Private Limited.`,
    termsAndConditions: `1. Ordering Process: Clicking "Buy Now on WhatsApp" initiates a direct inquiry. An order is confirmed only once stock availability and delivery details are verified with Kostak Healthcare via WhatsApp.
2. Product Use: DAAD FREE is an Ayurvedic proprietary medicine (Mfg. Lic. No.: MP/D/124/2026) for external topical use only. Follow the manufacturer's directions printed on the jar.
3. Crucial Precaution: If previously using another antifungal cream, stop and wait 7 days before starting DAAD FREE.
4. Storage: Store in a dry place away from direct sunlight. Keep out of reach of children.
5. Changes to Terms: Kostak Healthcare reserves the right to update product pricing and policy terms without prior notice.`,
    shippingPolicy: `Orders are packed and dispatched via trusted domestic courier partners within 24–48 business hours after WhatsApp order confirmation. Tracking information will be shared directly on WhatsApp upon shipment.`,
    cancellationAndRefundPolicy: `1. Cancellation: You may cancel your order at any time before dispatch by messaging our support on WhatsApp.
2. Returns: Due to hygiene, personal care, and safety standards for topical healthcare products, opened or used cream jars cannot be returned.
3. Damaged or Wrong Item: If you receive a damaged package or an incorrect product, notify us on WhatsApp (9131138853) within 48 hours of delivery with photos/unboxing video for a prompt replacement or refund.`,
  },
};

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

export function getEmbedVideoUrl(url: string): { type: "youtube" | "direct" | "unknown"; src: string } {
  if (!url) return { type: "unknown", src: "" };
  const trimmed = url.trim();

  const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`,
    };
  }

  const driveId = extractGoogleDriveId(trimmed);
  if (driveId) {
    return {
      type: "youtube",
      src: `https://drive.google.com/file/d/${driveId}/preview`,
    };
  }

  if (trimmed.endsWith(".mp4") || trimmed.endsWith(".webm") || trimmed.startsWith("http")) {
    return { type: "direct", src: trimmed };
  }

  return { type: "direct", src: trimmed };
}

export function loadSiteConfig(): SiteConfig {
  const localOverride = localStorage.getItem("KOSTAK_DAAD_FREE_CONFIG");
  if (localOverride) {
    try {
      const parsed = JSON.parse(localOverride);
      return { ...DEFAULT_CONFIG, ...parsed };
    } catch {
      // ignore
    }
  }

  if (typeof window !== "undefined" && (window as unknown as { DAAD_FREE_CONFIG?: Partial<SiteConfig> }).DAAD_FREE_CONFIG) {
    const winConfig = (window as unknown as { DAAD_FREE_CONFIG: Partial<SiteConfig> }).DAAD_FREE_CONFIG;
    return { ...DEFAULT_CONFIG, ...winConfig };
  }

  return DEFAULT_CONFIG;
}

export function saveSiteConfigLocally(config: SiteConfig): void {
  localStorage.setItem("KOSTAK_DAAD_FREE_CONFIG", JSON.stringify(config, null, 2));
}

export function resetSiteConfigLocally(): void {
  localStorage.removeItem("KOSTAK_DAAD_FREE_CONFIG");
}
