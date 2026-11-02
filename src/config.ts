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
  packLabel?: string;
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
  reviewVideos: unknown[];
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
  packSize: "25 ग्राम",
  price: 349, // From actual packaging label: ₹349 (MRP 380)
  mrp: 380,
  currencySymbol: "₹",
  heroDescription:
    "दाद (रिंगवर्म), जिद्दी फंगल संक्रमण, खाज और तीव्र खुजली से पहले ही दिन से असरदार राहत प्रदान करने वाली विशेष आयुर्वेदिक एंटीफंगल क्रीम। स्टेरॉयड-मुक्त एवं संवेदनशील त्वचा के लिए सुरक्षित।",
  whatsAppNumber: "919131138853",
  whatsAppGreeting:
    "नमस्ते KOSTAK Healthcare, मैं DAAD FREE आयुर्वेदिक एंटीफंगल क्रीम ऑर्डर करना चाहता/चाहती हूँ।",
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
      alt: "DAAD FREE 25 gm front and back label with complete directions and manufacturing details",
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
      name: "1 जार मानक (25 ग्राम)",
      size: "25 ग्राम",
      sizeCategory: "25g",
      packType: "single",
      packLabel: "1 जार (मानक)",
      quantityInPack: 1,
      price: 349,
      mrp: 380,
      imageUrl: "/assets/aistudio/25_gm_Master_Product_front.jpg_0667641f.jpeg",
      badge: "सर्वाधिक लोकप्रिय",
    },
    {
      id: "25gm-pack2",
      name: "2 जार का पैक (25 ग्राम x 2)",
      size: "25 ग्राम",
      sizeCategory: "25g",
      packType: "pack2",
      packLabel: "2 जार का पैक",
      quantityInPack: 2,
      price: 649,
      mrp: 760,
      imageUrl: "/assets/aistudio/25_gm_Master_Product_front_Packof2.jpg_976326fb.jpeg",
      badge: "बचत ₹111",
    },
    {
      id: "25gm-pack4",
      name: "4 जार का पारिवारिक पैक (25 ग्राम x 4)",
      size: "25 ग्राम",
      sizeCategory: "25g",
      packType: "pack4",
      packLabel: "4 जार का पारिवारिक पैक",
      quantityInPack: 4,
      price: 1199,
      mrp: 1520,
      imageUrl: "/assets/aistudio/25_gm_Master_Product_front_Packof4.jpg_d3371fa5.jpeg",
      badge: "सर्वोत्तम बचत (बचत ₹321)",
    },
    {
      id: "15gm-single",
      name: "1 जार कॉम्पैक्ट (15 ग्राम)",
      size: "15 ग्राम",
      sizeCategory: "15g",
      packType: "single",
      packLabel: "1 जार (कॉम्पैक्ट)",
      quantityInPack: 1,
      price: 249,
      mrp: 280,
      imageUrl: "/assets/aistudio/15gm_Master_Product.jpg_d47597ac.jpeg",
      badge: "सुविधाजनक साइज़",
    },
    {
      id: "15gm-pack2",
      name: "2 जार का पैक (15 ग्राम x 2)",
      size: "15 ग्राम",
      sizeCategory: "15g",
      packType: "pack2",
      packLabel: "2 जार का पैक",
      quantityInPack: 2,
      price: 469,
      mrp: 560,
      imageUrl: "/assets/aistudio/15gm_pack_of_2.jpg_63c7cb40.jpeg",
      badge: "बचत ₹91",
    },
    {
      id: "15gm-pack4",
      name: "4 जार का कॉम्बो पैक (15 ग्राम x 4)",
      size: "15 ग्राम",
      sizeCategory: "15g",
      packType: "pack4",
      packLabel: "4 जार का कॉम्बो पैक",
      quantityInPack: 4,
      price: 879,
      mrp: 1120,
      imageUrl: "/assets/aistudio/15gm_pack_of_4.jpg_a444cbd3.jpeg",
      badge: "किफायती बचत",
    },
  ],
  reviews: [],
  reviewVideos: [],
  contact: {
    brand: "Kostak Healthcare Private Limited",
    email: "kostakhealthcare@gmail.com",
    phone: "9131138853",
    supportHours: "सोमवार से शनिवार, सुबह 9:00 बजे से शाम 7:00 बजे तक",
    officeAddress: "138/139 B, श्रीराम नगर, खजराना, इंदौर (म.प्र.) 452016",
    mfgAddress: "ग्राम पाल नगर, देवास (म.प्र.) 455001",
    ayurvedicLicenseNo: "MP/D/124/2026",
    batchNo: "Dt092601",
    expiryPeriod: "निर्माण तिथि से 36 महीने तक उपयोगी (Best Before 36 Months)",
  },
  directions: [
    "बच्चों की पहुँच से हमेशा दूर रखें।",
    "दवाई को आँखों और कोमल अंगों में बिल्कुल न लगने दें।",
    "क्रीम लगाने के बाद अपने हाथों को साबुन व पानी से अच्छी तरह धो लें।",
    "विशेष सावधानी: यदि आप पहले से कोई अन्य एंटीफंगल (एलोपैथिक) क्रीम या दवा इस्तेमाल कर रहे हैं, तो उसे बंद करने के कम से कम 07 दिन बाद ही DAAD FREE क्रीम लगाना शुरू करें।",
    "प्रभावित त्वचा को हल्के गुनगुने पानी से साफ करके सूखे सूती कपड़े से पोछें, फिर दिन में 2 बार क्रीम की पतली परत हल्के हाथ से लगाएं।",
    "भंडारण: सीधे धूप से दूर, ठंडी व सूखी जगह पर रखें। केवल बाहरी उपयोग के लिए।",
  ],
  shipping: {
    dispatchTime: "WhatsApp पर ऑर्डर पुष्टि के 24 से 48 घंटे के भीतर पार्सल सुरक्षित पैक कर रवाना (डिस्पैच) किया जाता है।",
    deliveryTimeline: "एक्सप्रेस कूरियर द्वारा पूरे भारत में 3 से 7 कार्य दिवसों के भीतर सुरक्षित डिलीवरी।",
    chargesNote: "डिलीवरी शुल्क और फ्री डिलीवरी का विवरण WhatsApp पर ऑर्डर के समय सीधे स्पष्ट कर दिया जाता है।",
  },
  policies: {
    privacyPolicy: `KOSTAK Healthcare आपकी गोपनीयता का पूरा सम्मान करता है। जब आप WhatsApp के माध्यम से संपर्क या ऑर्डर करते हैं, तो हम केवल वही जानकारी एकत्र करते हैं (जैसे आपका नाम, डिलीवरी पता और संपर्क नंबर) जो आपके ऑर्डर को प्रोसेस करने और पहुंचाने के लिए आवश्यक है। हम आपकी कोई भी व्यक्तिगत जानकारी किसी तीसरे पक्ष के साथ साझा, विक्रय या आदान-प्रदान नहीं करते हैं। आपका और हमारा संवाद पूरी तरह गोपनीय रहता है।`,
    termsAndConditions: `1. ऑर्डर प्रक्रिया: "WhatsApp पर ऑर्डर करें" बटन दबाने पर सीधा संदेश भेजा जाता है। KOSTAK Healthcare द्वारा WhatsApp पर स्टॉक उपलब्धता और पते की पुष्टि के बाद ही ऑर्डर स्वीकार माना जाता है।
2. उत्पाद उपयोग: DAAD FREE एक आयुर्वेदिक औषधि (Mfg. Lic. No.: MP/D/124/2026) है जो केवल बाहरी त्वचा पर लगाने के लिए है। जार पर दिए गए निर्देशों का पालन करें।
3. महत्वपूर्ण सावधानी: यदि पहले से कोई अन्य फंगल क्रीम लगा रहे हों, तो उसे बंद करके 7 दिनों का अंतर रखकर ही इस क्रीम का उपयोग करें।
4. भंडारण: सीधे धूप से दूर, ठंडी व सूखी जगह पर रखें। बच्चों की पहुंच से दूर रखें।
5. नियम व शर्तें: Kostak Healthcare समय-समय पर नियमों व उत्पाद मूल्य में आवश्यकतानुसार संशोधन का अधिकार रखता है।`,
    shippingPolicy: `सभी ऑर्डर WhatsApp पर कन्फर्मेशन के बाद 24-48 घंटों के भीतर प्रतिष्ठित कूरियर पार्टनर्स द्वारा रवाना कर दिए जाते हैं। पार्सल रवाना होते ही ट्रैकिंग नंबर और कूरियर लिंक सीधे आपके WhatsApp पर भेज दिया जाता है।`,
    cancellationAndRefundPolicy: `1. ऑर्डर निरस्तीकरण (Cancellation): पार्सल डिस्पैच होने से पहले आप किसी भी समय WhatsApp पर संदेश भेजकर ऑर्डर रद्द कर सकते हैं।
2. वापसी (Returns): स्वच्छता और व्यक्तिगत त्वचा देखभाल उत्पाद होने के कारण खुले हुए या इस्तेमाल किए गए जार की वापसी स्वीकार नहीं की जाती है।
3. क्षतिग्रस्त उत्पाद (Damaged / Wrong Item): यदि पार्सल क्षतिग्रस्त अवस्था में मिले या गलत उत्पाद प्राप्त हो, तो डिलीवरी के 48 घंटों के भीतर WhatsApp (9131138853) पर अनबॉक्सिंग फोटो/वीडियो के साथ संपर्क करें, तुरंत नया उत्पाद या रिफंड प्रदान किया जाएगा।`,
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
