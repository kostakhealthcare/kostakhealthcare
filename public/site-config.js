/**
 * =============================================================================
 * KOSTAK HEALTHCARE - DAAD FREE PRODUCT WEBSITE CONFIGURATION (site-config.js)
 * =============================================================================
 * 
 * Edit this file to update prices, WhatsApp phone number, images (Google Drive or local),
 * contact information, shipping terms, customer reviews, and legal policies.
 * 
 * NO CODING REQUIRED:
 * - Update the values below inside the quotes or numbers.
 * - Save the file and refresh or redeploy your website.
 * - When using Google Drive for images, follow the instructions in the comments below.
 * =============================================================================
 */

window.DAAD_FREE_CONFIG = {
  // ---------------------------------------------------------------------------
  // 1. BRAND & PRODUCT INFORMATION
  // ---------------------------------------------------------------------------
  brandName: "KOSTAK Healthcare",
  productName: "DAAD FREE Ayurvedic Antifungal Cream",
  tagline: "Targeted Ayurvedic Topical Care for Fungal Skin Irritations & Itching",
  packSize: "25 gm",
  
  /**
   * Product Price in Indian Rupees (INR):
   * - Set to a number (e.g. 199 or 249) to display the price and calculate order total.
   * - Set to null, 0, or "" (empty) if you want the site to display "Contact us for price"
   *   and omit the price and total from the WhatsApp order message.
   */
  price: 199, // Set to null or a number like 199. Never shows a fake zero!
  mrp: 250, // Optional Maximum Retail Price for discount strikethrough (set to null if not applicable)
  currencySymbol: "₹",

  // Short factual description shown in Hero
  heroDescription: "A classical Ayurvedic formulation crafted with purifying herbs for targeted external soothing relief from skin itching, ringworm (daad), and fungal irritations. Free from artificial dyes and harsh synthetic chemicals.",

  // ---------------------------------------------------------------------------
  // 2. WHATSAPP ORDERING CONFIGURATION (NO PAYMENT GATEWAY)
  // ---------------------------------------------------------------------------
  /**
   * WhatsApp Business Number:
   * - Must include country code without '+' or special symbols (digits only).
   * - Example for India: "919876543210"
   * - If left blank or set to "91XXXXXXXXXX", the website will prompt a helpful
   *   configuration notice for the owner rather than opening a broken link.
   */
  whatsAppNumber: "919876543210", // REPLACE WITH YOUR ACTUAL 10-12 DIGIT WHATSAPP NUMBER
  
  // Custom greeting message before order details
  whatsAppGreeting: "Hello KOSTAK Healthcare, I am interested in ordering DAAD FREE Ayurvedic Antifungal Cream, 25 gm.",

  // ---------------------------------------------------------------------------
  // 3. PRODUCT IMAGES & GOOGLE DRIVE INTEGRATION
  // ---------------------------------------------------------------------------
  /**
   * CACHE REFRESH / VERSION:
   * When you update an image in Google Drive using the same file ID,
   * bump this number (e.g. from 1 to 2) to force visitor browsers to load
   * the fresh image immediately rather than using their cached version.
   */
  imageVersion: 1,

  /**
   * Images can be:
   * 1. A Google Drive File ID (e.g. "1a2B3c4D5e6F...") or Google Drive sharing link.
   * 2. A direct local path (e.g. "/assets/images/25 gm_Master_Product_front.jpg.jpeg").
   * 3. A public web URL (e.g. "https://example.com/my-image.jpg").
   * 
   * If a Google Drive link or ID fails to load, the website automatically falls
   * back to the built-in local asset.
   */
  images: {
    // Primary Product Image
    mainImage: {
      url: "/assets/images/25 gm_Master_Product_front.jpg.jpeg",
      googleDriveId: "", // Optional: e.g. "1XYZ...abc" from your 'daad-free-main.jpg'
      alt: "DAAD FREE Ayurvedic Antifungal Cream 25 gm tube and box packaging by KOSTAK Healthcare",
      fallback: "/assets/images/25 gm_Master_Product_front.jpg.jpeg"
    },
    // Promotional Image 1
    promoImage1: {
      url: "/assets/images/Post1_Option2.jpg.jpeg",
      googleDriveId: "", // Optional: e.g. "1XYZ...def" from your 'daad-free-promo-1.jpg'
      alt: "DAAD FREE 25g cream tube on limestone podium with Ayurvedic herbal ingredients",
      fallback: "/assets/images/Post1_Option2.jpg.jpeg"
    },
    // Promotional Image 2
    promoImage2: {
      url: "/assets/images/Post2.jpg.jpeg",
      googleDriveId: "", // Optional: e.g. "1XYZ...ghi" from your 'daad-free-promo-2.jpg'
      alt: "DAAD FREE Ayurvedic cream with brass bowl of neem and turmeric",
      fallback: "/assets/images/Post2.jpg.jpeg"
    }
  },

  // ---------------------------------------------------------------------------
  // 4. CUSTOMER REVIEWS & REVIEW VIDEOS
  // ---------------------------------------------------------------------------
  /**
   * COMPLIANCE & HONESTY RULE:
   * In strict accordance with the owner's mandate, fake reviews are prohibited.
   * Only genuine reviews with 'approved: true' will be shown on the website.
   * By default this list starts empty until real customer reviews are approved.
   */
  reviews: [
    /* 
    Example of an approved review to add when received:
    {
      id: "rev-001",
      customerName: "Ramesh Sharma",
      city: "Jaipur",
      rating: 5,
      date: "2026-10-15",
      reviewText: "Genuine Ayurvedic cream that provided soothing relief from ringworm itching within days.",
      approved: true,
      photoUrl: ""
    }
    */
  ],

  /**
   * Approved Review Videos:
   * Only videos with 'approved: true' are shown in the video section.
   * Supports direct MP4 video URLs or YouTube links (e.g. "https://www.youtube.com/watch?v=...").
   * Videos NEVER autoplay with sound.
   */
  reviewVideos: [
    /*
    Example approved video:
    {
      id: "vid-001",
      title: "Real Customer Feedback on DAAD FREE",
      customerName: "Verified Customer",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // or direct MP4 URL / Google Drive video
      thumbnailUrl: "/assets/images/daad-free-promo-1.jpg",
      approved: true
    }
    */
  ],

  // ---------------------------------------------------------------------------
  // 5. BUSINESS & CONTACT DETAILS
  // ---------------------------------------------------------------------------
  contact: {
    brand: "KOSTAK Healthcare",
    email: "kostakhealthcare@gmail.com",
    supportHours: "Monday to Saturday, 9:00 AM – 7:00 PM IST",
    address: "India",
    ayurvedicLicenseNo: "Approved Ayurvedic Proprietary Medicine (See packaging for Lic. No & Batch)"
  },

  // ---------------------------------------------------------------------------
  // 6. SHIPPING & DELIVERY INFORMATION
  // ---------------------------------------------------------------------------
  shipping: {
    dispatchTime: "Dispatched within 24 to 48 business hours after order confirmation via WhatsApp.",
    deliveryTimeline: "Estimated delivery within 3–7 business days depending on location.",
    chargesNote: "Standard shipping charges or free shipping threshold will be confirmed directly during your WhatsApp chat."
  },

  // ---------------------------------------------------------------------------
  // 7. POLICIES & LEGAL TERMS (CONFIGURABLE BY OWNER)
  // ---------------------------------------------------------------------------
  policies: {
    privacyPolicy: `KOSTAK Healthcare respects your privacy. When you contact us or order through WhatsApp, we collect only the necessary details (such as your name, delivery address, and contact number) required to process and fulfill your order. We do not sell, rent, or trade your personal information with any third party. Your communication remains confidential between you and KOSTAK Healthcare.`,

    termsAndConditions: `1. Ordering Process: Clicking "Buy Now on WhatsApp" initiates a direct inquiry. An order is only confirmed once availability and shipping details are verified and mutually agreed upon with KOSTAK Healthcare via WhatsApp.
2. Product Use: DAAD FREE is an Ayurvedic proprietary formulation for external topical use only. It should be used strictly according to directions on the packaging or as advised by an Ayurvedic physician.
3. No Medical Guarantee: Results may vary depending on individual skin type and condition. DAAD FREE does not claim to cure internal systemic diseases or replace professional medical advice for severe conditions.
4. Changes to Terms: KOSTAK Healthcare reserves the right to update product pricing and policy terms without prior notice.`,

    shippingPolicy: `Orders are packed and dispatched via trusted domestic courier services within 24–48 business hours after WhatsApp confirmation. Delivery typically takes 3 to 7 business days across India. Tracking information will be shared directly on WhatsApp upon shipment.`,

    cancellationAndRefundPolicy: `1. Cancellation: You may cancel your order at any time before it has been dispatched by notifying us on WhatsApp.
2. Returns: Due to hygiene, personal care, and safety standards for topical healthcare products, opened or used cream tubes cannot be returned.
3. Damaged or Wrong Item: If you receive a damaged package or an incorrect product, notify us on WhatsApp within 48 hours of delivery with photos/unboxing video, and we will arrange a prompt replacement or refund.`
  }
};
