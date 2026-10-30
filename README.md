# DAAD FREE Ayurvedic Antifungal Cream (25 gm) — Official Website

A production-ready, responsive, lightweight skincare product website built for **KOSTAK Healthcare** to showcase and sell **DAAD FREE Ayurvedic Antifungal Cream (25 gm)** with direct WhatsApp ordering (no payment gateway, no customer logins, and no complex backend required).

---

## 🌿 Table of Contents
1. [Key Features](#key-features)
2. [Project File Structure](#project-file-structure)
3. [Managing Product Content & Settings (`site-config.js`)](#managing-product-content--settings-site-configjs)
4. [WhatsApp Ordering Configuration](#whatsapp-ordering-configuration)
5. [Google Drive Image Management](#google-drive-image-management)
6. [Customer Review & Video Moderation](#customer-review--video-moderation)
7. [Local Testing & Development](#local-testing--development)
8. [Deployment Instructions (Netlify, Vercel, GitHub Pages)](#deployment-instructions)
9. [Connecting Your Custom Domain](#connecting-your-custom-domain)
10. [Troubleshooting Guide](#troubleshooting-guide)

---

## 1. Key Features

- **Direct WhatsApp Ordering**: Uses the official WhatsApp click-to-chat API (`https://wa.me/`) with pre-filled product details, quantity, pricing, and product URL.
- **Zero Payment Gateway Friction**: No credit card processor or payment fees; the business confirms stock, pincode shipping, and direct payment methods (UPI, Bank, COD) on WhatsApp.
- **No Fake Price Guarantee**: If no price is configured, the website automatically displays *"Contact us for price"* and omits price/totals from the WhatsApp inquiry.
- **Interactive Product Gallery**: Showcases the 25 gm carton packaging and tube (`25 gm_Master_Product_front.jpg.jpeg`) and promotional imagery (`Post1_Option2.jpg.jpeg`, `Post2.jpg.jpeg`) with interactive thumbnail switching and full-screen lightbox zoom.
- **Authentic Reviews (No Fake Testimonials)**: Starts clean and empty per compliance rules. Customers can submit feedback, which appears only after approval by the store owner.
- **Review Videos**: Displays approved customer review videos (YouTube embeds or direct MP4 files) with play/pause controls and zero invasive sound autoplay.
- **Google Drive Image Integration**: Load high-resolution images directly from Google Drive using Google's global CDN (`https://lh3.googleusercontent.com/d/{FILE_ID}`) with cache-busting and automatic local fallback.
- **Owner Configurator UI**: A built-in visual settings drawer to test prices, phone numbers, and moderation locally, with 1-click **"Copy `site-config.js`"** and **"Download `site-config.js`"**.
- **Complete Legal Policies**: Privacy Policy, Terms and Conditions, Shipping & Delivery Policy, and Cancellation & Refund Policy.
- **Full SEO & Schema.org**: Rich OpenGraph social sharing cards, Twitter cards, and Schema.org JSON-LD Product & Organization metadata.

---

## 2. Project File Structure

```text
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── 25 gm_Master_Product_front.jpg.jpeg   <-- Primary packshot
│   │   │   ├── Post1_Option2.jpg.jpeg                 <-- Promotional image 1
│   │   │   ├── Post2.jpg.jpeg                         <-- Promotional image 2
│   │   │   ├── daad-free-main.jpg                     <-- Local alias
│   │   │   ├── daad-free-promo-1.jpg
│   │   │   └── daad-free-promo-2.jpg
│   │   └── videos/                                    <-- Optional local MP4 review videos
│   └── site-config.js                                 <-- Static configuration file
├── src/
│   ├── components/
│   │   ├── Header.tsx                                 <-- Navigation & WhatsApp CTAs
│   │   ├── Hero.tsx                                   <-- Gallery, pricing, quantity selector
│   │   ├── ProductInformation.tsx                     <-- Verified specs, directions & safety
│   │   ├── ProductBenefits.tsx                        <-- Botanical benefits & legal notices
│   │   ├── CustomerReviews.tsx                        <-- Moderated customer reviews
│   │   ├── ReviewVideos.tsx                           <-- Video reviews (YouTube/MP4)
│   │   ├── FaqSection.tsx                             <-- Frequently asked questions
│   │   ├── ContactAndShipping.tsx                     <-- Contact details & transit times
│   │   ├── PolicyModal.tsx                            <-- Tabbed policy viewer
│   │   ├── OwnerConfigModal.tsx                       <-- Visual settings & config generator
│   │   └── FloatingWhatsApp.tsx                       <-- Bottom-right quick-order trigger
│   ├── config.ts                                      <-- Config engine & Drive URL resolver
│   ├── App.tsx                                        <-- Main application layout
│   ├── index.css                                      <-- Styling & typography
│   └── main.tsx                                       <-- React entry point
├── index.html                                         <-- SEO, fonts & Schema.org JSON-LD
├── site-config.js                                     <-- Root easy-to-edit configuration
├── metadata.json
└── package.json
```

---

## 3. Managing Product Content & Settings (`site-config.js`)

You do not need to touch React or TypeScript code to update your website. Open `site-config.js` in any text editor.

### Key Configuration Fields:
```javascript
window.DAAD_FREE_CONFIG = {
  brandName: "KOSTAK Healthcare",
  productName: "DAAD FREE Ayurvedic Antifungal Cream",
  packSize: "25 gm",

  // Set to a number (e.g. 199) or null/"" to show "Contact us for price"
  price: 199,
  mrp: 250, // Optional strikethrough retail price

  // WhatsApp Business Number: Country code + digits only (e.g. 91 for India)
  whatsAppNumber: "919876543210",

  // Bump this number when you replace images in Google Drive
  imageVersion: 1,

  // Images and Drive IDs
  images: {
    mainImage: {
      url: "/assets/images/25 gm_Master_Product_front.jpg.jpeg",
      googleDriveId: "", // Or paste your Drive File ID
      alt: "DAAD FREE Ayurvedic Antifungal Cream 25 gm",
      fallback: "/assets/images/25 gm_Master_Product_front.jpg.jpeg"
    },
    // ... promoImage1, promoImage2
  },

  // Contact details
  contact: {
    email: "kostakhealthcare@gmail.com",
    supportHours: "Monday to Saturday, 9:00 AM – 7:00 PM IST",
    address: "India"
  }
};
```

---

## 4. WhatsApp Ordering Configuration

The website includes a centralized WhatsApp Business ordering workflow:

### Official WhatsApp Business Credentials:
- **Country**: India
- **Country Code**: `+91`
- **WhatsApp Support Number**: `9131138853`
- **Full WhatsApp Integration Number**: `919131138853`
- **Official Click-to-Chat Base URL**: `https://wa.me/919131138853`

### Central Configuration Files:
- `src/whatsapp-config.ts` (React app single source of truth)
- `site-config.js` and `public/site-config.js` (Non-coding static configuration)

### Standard Customer Order Message:
When a customer clicks **"Order on WhatsApp"** or **"Buy Now"**, it opens WhatsApp with this prefilled format:

```text
Hello DAAD FREE Team,
I want to place an order.

Product: DAAD FREE Ayurvedic Antifungal Cream
Size: [Size - 15g or 25g]
Pack: [Pack - Single, Pack of 2, or Pack of 4]
Quantity: [Quantity]
Total Amount: [Amount]

Please confirm my order and delivery details.
```

### Universal Device Compatibility:
The `https://wa.me/919131138853?text=...` format is fully tested and supported on:
- **Android**: Opens directly in native WhatsApp application.
- **iPhone / iOS (Safari, Chrome)**: Opens native WhatsApp via Universal Links without popup warnings.
- **Desktop (Windows, Mac, Linux)**: Opens WhatsApp Web or Desktop application.

---

## 5. Google Drive Image Management

You can host product images in Google Drive without writing code or paying for extra image hosting.

### Recommended Google Drive Folder Structure:
Create a folder in your Google Drive named `Product Images/` containing:
- `daad-free-main.jpg`
- `daad-free-promo-1.jpg`
- `daad-free-promo-2.jpg`
- `daad-free-review-1.mp4`
- `daad-free-review-2.mp4`

### How to Make Google Drive Files Publicly Viewable:
1. Right-click the image or folder in Google Drive.
2. Select **Share &rarr; Share**.
3. Under **General access**, change from *Restricted* to **"Anyone with the link can view"**.
4. Copy the link. It looks like:
   `https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9/view?usp=sharing`
5. The File ID is `1A2B3C4D5E6F7G8H9`.

### How to Replace an Image in Google Drive Preserving the SAME File ID:
To update a photo without breaking any links or changing code:
1. Open Google Drive on your computer browser.
2. Right-click the file (e.g., `daad-free-main.jpg`).
3. Click **File information &rarr; Manage versions** (or **Manage versions**).
4. Click **"Upload new version"** and pick your updated photo.
5. **Result**: Google Drive replaces the visual content of the file while **keeping the exact same File ID and URL**!
6. Open the website Owner Settings and click **"Bump Version"** (or change `imageVersion: 2` in `site-config.js`) so returning visitors' browsers instantly download the new picture instead of using their old cached copy.

---

## 6. Customer Review & Video Moderation

Per strict consumer protection and advertising guidelines, this website **never displays fake reviews or fabricated testimonials**.

1. When customers click **"Write a Review"**, they submit their name, rating, and honest feedback.
2. The review is marked as `approved: false` and queued for your approval.
3. As the store owner, open the **Owner Settings** (gear icon in the header or footer):
   - Navigate to the **Customer Reviews** tab.
   - Click **"Approve"** on genuine submissions.
   - Click **"Delete"** on any spam or inappropriate text.
4. You can also add YouTube or MP4 video links to showcase approved customer reviews.

---

## 7. Local Testing & Development

To test the website on your computer:
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open browser at:
http://localhost:3000
```

To test on your mobile phone on the same Wi-Fi network:
```bash
npm run dev -- --host
# Open the Network URL shown in your terminal on your mobile browser
```

---

## 8. Deployment Instructions

### Option A: Deploying to Netlify (Recommended - Simplest)
1. Run the build command locally:
   ```bash
   npm run build
   ```
   This generates a self-contained static `/dist` folder.
2. Log in to [Netlify](https://www.netlify.com/).
3. Go to **Sites &rarr; Add new site &rarr; Deploy manually**.
4. Drag and drop the `/dist` folder into the Netlify upload box.
5. Your website will be live in 10 seconds!

*(Alternatively, connect your GitHub repository to Netlify and set Build command: `npm run build`, Publish directory: `dist`)*.

### Option B: Deploying to Vercel (Ready & Pre-Configured)
1. The project already includes `vercel.json` with framework preset `vite`, output directory `dist`, and SPA rewrites.
2. Peer dependencies for `esbuild ^0.28.0` and `vite 8.3.5` are 100% harmonized; Vercel builds pass with zero `ERESOLVE` errors.
3. In [Vercel](https://vercel.com/), click **Add New &rarr; Project** and select your repository.
4. Framework Preset will auto-detect as **Vite** with build command `npm run build`.
5. Click **Deploy**. Your custom domain (`daadfree.com` or `kostakhealthcare.com`) can be linked immediately in Vercel project settings.

### Option C: Deploying to GitHub Pages
1. In `vite.config.ts`, set `base: './'` for relative asset paths if hosting under a repository subdirectory.
2. Run:
   ```bash
   npm run build
   ```
3. Push the contents of the `dist` folder to your `gh-pages` branch.

---

## 9. Connecting Your Custom Domain

1. Go to your domain registrar (e.g. GoDaddy, Namecheap, Google Domains / Squarespace).
2. Open **DNS Management** for your domain (e.g. `kostakhealthcare.com`).
3. Add the DNS records provided by your hosting provider:
   - **For Netlify**:
     - `A Record`: `@` pointing to `75.2.60.5`
     - `CNAME Record`: `www` pointing to `[your-site-name].netlify.app`
   - **For Vercel**:
     - `A Record`: `@` pointing to `76.76.21.21`
     - `CNAME Record`: `www` pointing to `cname.vercel-dns.com`
4. Wait 5–30 minutes for DNS propagation. SSL certificates are provisioned automatically for free.

---

## 10. Troubleshooting Guide

| Problem | Cause | Solution |
| :--- | :--- | :--- |
| **WhatsApp link doesn't open** | Phone number contains letters or country code is missing | Ensure `whatsAppNumber` in `site-config.js` has digits only with country code (e.g. `919876543210` for India, no `+` sign). |
| **Price shows "Contact us for price"** | Price is set to `null` or empty | Set `price: 199` in `site-config.js` or via the Owner Settings drawer. |
| **Google Drive image does not load** | File sharing is set to *Restricted* | In Google Drive, change access to **"Anyone with the link can view"**. The website will fall back to local images until corrected. |
| **Updated image still shows old photo** | Browser cached the old image file | Bump `imageVersion: 2` in `site-config.js` or click "Bump Version" in the Owner Configurator. |
| **No reviews appear** | Reviews must be approved by the owner | Open Owner Settings &rarr; Reviews tab &rarr; Click "Approve" on submitted reviews. |

---

&copy; KOSTAK Healthcare. DAAD FREE Ayurvedic Antifungal Cream (25 gm).
