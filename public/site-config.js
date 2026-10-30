/**
 * =============================================================================
 * KOSTAK HEALTHCARE - DAAD FREE PRODUCT WEBSITE CONFIGURATION (site-config.js)
 * =============================================================================
 * 
 * Verified from genuine product packaging:
 * - Brand: Kostak Healthcare Private Limited
 * - Product: DAAD FREE Ayurvedic Antifungal Cream (दाद का दिव्यास्त्र)
 * - Country: India (+91)
 * - Customer Support / WhatsApp: 9131138853
 * - Full WhatsApp Number: 919131138853
 * - WhatsApp Click-to-Chat URL: https://wa.me/919131138853
 * - Price: ₹349 (MRP: ₹380) for 25 gm
 * - Mfg Lic: MP/D/124/2026
 * =============================================================================
 */

window.DAAD_FREE_CONFIG = {
  brandName: "KOSTAK Healthcare",
  companyFullName: "Kostak Healthcare Private Limited",
  productName: "DAAD FREE Ayurvedic Antifungal Cream",
  tagline: "दाद का दिव्यास्त्र • दाद, खाज, खुजली की असरदार दवाई",
  packSize: "25 gm",
  
  price: 349, // From official product label
  mrp: 380,   // From official product label
  currencySymbol: "₹",

  heroDescription: "An authentic Ayurvedic proprietary formula with 49% Alba Bark (श्वेत कुटज), Curcuma Longa (हल्दी), and Aloe Vera. Provides fast, soothing relief from ringworm (daad), severe itching, and fungal skin distress. Relief from the first day.",

  // Central WhatsApp Business Details
  whatsAppBusiness: {
    country: "India",
    countryCode: "+91",
    whatsappNumber: "9131138853",
    fullWhatsAppNumber: "919131138853",
    clickToChatUrl: "https://wa.me/919131138853",
    brandTeamName: "DAAD FREE Team"
  },

  // Primary WhatsApp number used for all order buttons
  whatsAppNumber: "919131138853",
  whatsAppGreeting: "Hello DAAD FREE Team,\nI want to place an order.",

  imageVersion: 1,

  images: {
    mainImage: {
      url: "/assets/aistudio/25_gm_Master_Product_front.jpg_0667641f.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE Ayurvedic Antifungal Cream 25 gm Master Product Jar by Kostak Healthcare",
      fallback: "/assets/images/25_gm_Master_Product_front.jpg"
    },
    frontBackJar: {
      url: "/assets/aistudio/WhatsApp_Image_2026-10-16_at_6.14.44_PM_c6612cd6.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 25 gm front and back label with complete ingredients, directions and manufacturing details",
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
      alt: "DAAD FREE 25 gm Pack of 2 Jars",
      fallback: "/assets/images/25gm_pack_of_2.jpeg"
    },
    packOf4Image: {
      url: "/assets/aistudio/25_gm_Master_Product_front_Packof4.jpg_d3371fa5.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 25 gm Pack of 4 Jars (Family Saver Pack)",
      fallback: "/assets/images/25gm_pack_of_4.jpeg"
    },
    fifteenGmImage: {
      url: "/assets/aistudio/15gm_Master_Product.jpg_d47597ac.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 15 gm Master Jar",
      fallback: "/assets/images/15gm_master_product.jpeg"
    },
    fifteenGmPack2: {
      url: "/assets/aistudio/15gm_pack_of_2.jpg_63c7cb40.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 15 gm Pack of 2",
      fallback: "/assets/images/15gm_pack_of_2.jpeg"
    },
    fifteenGmPack4: {
      url: "/assets/aistudio/15gm_pack_of_4.jpg_a444cbd3.jpeg",
      googleDriveId: "",
      alt: "DAAD FREE 15 gm Pack of 4",
      fallback: "/assets/images/15gm_pack_of_4.jpeg"
    }
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
      badge: "Most Popular"
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
      badge: "Save ₹111"
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
      badge: "Best Value (Save ₹321)"
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
      badge: "Travel Size"
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
      badge: "Save ₹91"
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
      badge: "Economy Saver"
    }
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
    expiryPeriod: "Best before 36 months from Mfg Date"
  },

  shipping: {
    dispatchTime: "Dispatched within 24 to 48 business hours after order confirmation via WhatsApp.",
    deliveryTimeline: "Estimated delivery within 3–7 business days across India.",
    chargesNote: "Shipping charges or free delivery will be confirmed directly during WhatsApp order verification."
  }
};
