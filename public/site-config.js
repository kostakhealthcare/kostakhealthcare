/**
 * =============================================================================
 * KOSTAK HEALTHCARE - DAAD FREE PRODUCT WEBSITE CONFIGURATION (site-config.js)
 * =============================================================================
 * 
 * प्रामाणिक उत्पाद पैकेजिंग विवरण:
 * - ब्रांड: Kostak Healthcare Private Limited
 * - उत्पाद: DAAD FREE Ayurvedic Antifungal Cream (दाद का दिव्यास्त्र)
 * - देश: भारत (+91)
 * - ग्राहक सहायता / WhatsApp: 9131138853
 * - पूर्ण WhatsApp नंबर: 919131138853
 * - WhatsApp डायरेक्ट चैट: https://wa.me/919131138853
 * - मूल्य: ₹349 (MRP: ₹380) 25 ग्राम पैक
 * - लाइसेंस नं.: MP/D/124/2026
 * =============================================================================
 */

window.DAAD_FREE_CONFIG = {
  brandName: "KOSTAK Healthcare",
  companyFullName: "Kostak Healthcare Private Limited",
  productName: "DAAD FREE Ayurvedic Antifungal Cream",
  tagline: "दाद का दिव्यास्त्र • दाद, खाज, खुजली की असरदार दवाई",
  packSize: "25 ग्राम",
  
  price: 349,
  mrp: 380,
  currencySymbol: "₹",

  heroDescription: "दाद (रिंगवर्म), जिद्दी फंगल संक्रमण, खाज और तीव्र खुजली से पहले ही दिन से असरदार राहत प्रदान करने वाली विशेष आयुर्वेदिक एंटीफंगल क्रीम। स्टेरॉयड-मुक्त एवं संवेदनशील त्वचा के लिए सुरक्षित।",

  whatsAppBusiness: {
    country: "India",
    countryCode: "+91",
    whatsappNumber: "9131138853",
    fullWhatsAppNumber: "919131138853",
    clickToChatUrl: "https://wa.me/919131138853",
    brandTeamName: "DAAD FREE टीम"
  },

  whatsAppNumber: "919131138853",
  whatsAppGreeting: "नमस्ते DAAD FREE टीम,\nमैं ऑर्डर देना चाहता/चाहती हूँ।",

  imageVersion: 1,

  images: {
    mainImage: {
      url: "/assets/aistudio/25_gm_Master_Product_front.jpg_0667641f.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE आयुर्वेदिक एंटीफंगल क्रीम 25 ग्राम मुख्य जार - Kostak Healthcare",
      fallback: "/assets/images/25_gm_Master_Product_front.jpg"
    },
    frontBackJar: {
      url: "/assets/aistudio/WhatsApp_Image_2026-10-16_at_6.14.44_PM_c6612cd6.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 25 ग्राम फ्रंट और बैक लेबल - निर्देश एवं निर्माण विवरण",
      fallback: "/assets/images/25gm_front_and_back_jar.jpeg"
    },
    promoImage1: {
      url: "/assets/aistudio/Post1.jpg_6034f5d5.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE - दाद, खाज, खुजली की असरदार दवाई - पहले ही दिन से खुजली में राहत",
      fallback: "/assets/images/Post1_Option2.jpg.jpeg"
    },
    promoImage2: {
      url: "/assets/aistudio/Post2.jpg_bef9deeb.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE - दाद का दिव्यास्त्र - Fight skin infection, Kill fungus, Relieves itching",
      fallback: "/assets/images/Post2.jpg.jpeg"
    },
    packOf2Image: {
      url: "/assets/aistudio/25_gm_Master_Product_front_Packof2.jpg_976326fb.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 25 ग्राम - 2 जार का पैक",
      fallback: "/assets/images/25gm_pack_of_2.jpeg"
    },
    packOf4Image: {
      url: "/assets/aistudio/25_gm_Master_Product_front_Packof4.jpg_d3371fa5.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 25 ग्राम - 4 जार का पारिवारिक बचत पैक",
      fallback: "/assets/images/25gm_pack_of_4.jpeg"
    },
    fifteenGmImage: {
      url: "/assets/aistudio/15gm_Master_Product.jpg_d47597ac.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 15 ग्राम कॉम्पैक्ट जार",
      fallback: "/assets/images/15gm_master_product.jpeg"
    },
    fifteenGmPack2: {
      url: "/assets/aistudio/15gm_pack_of_2.jpg_63c7cb40.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 15 ग्राम - 2 जार का पैक",
      fallback: "/assets/images/15gm_pack_of_2.jpeg"
    },
    fifteenGmPack4: {
      url: "/assets/aistudio/15gm_pack_of_4.jpg_a444cbd3.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 15 ग्राम - 4 जार का कॉम्बो पैक",
      fallback: "/assets/images/15gm_pack_of_4.jpeg"
    }
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
      badge: "सर्वाधिक लोकप्रिय"
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
      badge: "बचत ₹111"
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
      badge: "सर्वोत्तम बचत (बचत ₹321)"
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
      badge: "सुविधाजनक साइज़"
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
      badge: "बचत ₹91"
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
      badge: "किफायती बचत"
    }
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
    expiryPeriod: "निर्माण तिथि से 36 महीने तक उपयोगी"
  },

  shipping: {
    dispatchTime: "WhatsApp पर ऑर्डर पुष्टि के 24 से 48 घंटे के भीतर पार्सल सुरक्षित पैक कर रवाना किया जाता है।",
    deliveryTimeline: "एक्सप्रेस कूरियर द्वारा पूरे भारत में 3 से 7 कार्य दिवसों में सुरक्षित डिलीवरी।",
    chargesNote: "डिलीवरी शुल्क और फ्री डिलीवरी का विवरण WhatsApp पर सीधे स्पष्ट किया जाता है।"
  }
};
