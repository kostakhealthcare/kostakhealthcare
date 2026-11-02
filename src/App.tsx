/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  loadSiteConfig,
  SiteConfig,
  CustomerReview,
  ProductPackOption,
  WHATSAPP_BUSINESS,
  generateWhatsAppOrderUrl,
} from './config';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductBenefits } from './components/ProductBenefits';
import { UsageDirections } from './components/UsageDirections';
import { ProductInformation } from './components/ProductInformation';
import { CustomerReviews } from './components/CustomerReviews';
import { FaqSection } from './components/FaqSection';
import { ContactAndShipping } from './components/ContactAndShipping';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => loadSiteConfig());
  const [selectedPack, setSelectedPack] = useState<ProductPackOption>(
    () => config.packOptions?.[0] || {
      id: "25gm-single",
      name: "1 जार मानक (25 ग्राम)",
      size: "25 ग्राम",
      quantityInPack: 1,
      price: 349,
      mrp: 380,
      imageUrl: "/assets/aistudio/25_gm_Master_Product_front.jpg_0667641f.jpeg",
      badge: "सर्वाधिक लोकप्रिय",
    }
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [policyModalOpen, setPolicyModalOpen] = useState<boolean>(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType>('privacyPolicy');
  const [missingPhoneAlert, setMissingPhoneAlert] = useState<boolean>(false);

  // Sync with window.DAAD_FREE_CONFIG if dynamically injected
  useEffect(() => {
    const handleStorageChange = () => {
      const freshConfig = loadSiteConfig();
      setConfig(freshConfig);
      if (freshConfig.packOptions?.[0]) {
        setSelectedPack(freshConfig.packOptions[0]);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleOpenPolicy = (type: PolicyType) => {
    setSelectedPolicy(type);
    setPolicyModalOpen(true);
  };

  /**
   * Generates and triggers the official Hindi WhatsApp order message:
   * नमस्ते DAAD FREE टीम,
   * मैं ऑर्डर देना चाहता/चाहती हूँ:
   * 
   * उत्पाद: [Product Name]
   * साइज़: [Size]
   * पैक: [Pack]
   * मात्रा: [Quantity]
   * कुल राशि: [Amount]
   * 
   * कृपया मेरे ऑर्डर और डिलीवरी विवरण की पुष्टि करें। धन्यवाद!
   */
  const handleOrderWhatsApp = (customPack?: ProductPackOption, customQty?: number) => {
    const packToOrder = customPack || selectedPack;
    const qty = customQty != null ? customQty : quantity;
    const cleanNumber = (config.whatsAppNumber || WHATSAPP_BUSINESS.fullNumber || '919131138853').replace(/[^\d]/g, '');

    if (!cleanNumber || cleanNumber.length < 10) {
      setMissingPhoneAlert(true);
      return;
    }

    const unitPrice = packToOrder?.price ?? (config.price ? Number(config.price) : null);
    const totalPrice = unitPrice ? unitPrice * qty : null;

    const whatsappUrl = generateWhatsAppOrderUrl({
      productName: config.productName || 'DAAD FREE Ayurvedic Antifungal Cream',
      size: packToOrder?.size || '25 ग्राम',
      pack: packToOrder?.packLabel || packToOrder?.name || '1 जार (मानक)',
      quantity: qty,
      unitPrice,
      totalAmount: totalPrice,
      currencySymbol: config.currencySymbol || '₹',
      customWhatsAppNumber: cleanNumber,
    });

    try {
      const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!opened || opened.closed || typeof opened.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    } catch {
      window.location.href = whatsappUrl;
    }
  };

  const handleReviewSubmitted = (newReview: CustomerReview) => {
    const updatedReviews = [...(config.reviews || []), newReview];
    const updatedConfig = { ...config, reviews: updatedReviews };
    setConfig(updatedConfig);

    try {
      localStorage.setItem('KOSTAK_DAAD_FREE_CONFIG', JSON.stringify(updatedConfig));
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1D2A22] w-full max-w-full overflow-x-hidden">
      {/* Customer support connection notice in Hindi */}
      {missingPhoneAlert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E3EDE6]">
            <h3 className="text-base sm:text-lg font-bold text-[#0F281B] font-serif-title">
              WhatsApp ग्राहक सहायता
            </h3>
            <p className="text-xs sm:text-sm text-[#4E6255] mt-2 leading-relaxed break-words">
              ऑर्डर करने या हमारे आयुर्वेदिक प्रतिनिधि से सीधे बात करने हेतु कृपया WhatsApp / फोन नंबर <strong>+91 9131138853</strong> पर संपर्क करें अथवा <a href="mailto:kostakhealthcare@gmail.com" className="text-[#1C8A4E] underline break-all">kostakhealthcare@gmail.com</a> पर ईमेल भेजें।
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setMissingPhoneAlert(false)}
                className="py-2.5 px-6 rounded-xl bg-[#0F281B] text-white text-xs sm:text-sm font-semibold hover:bg-[#143524] transition-colors cursor-pointer"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        config={config}
        onOrderWhatsApp={handleOrderWhatsApp}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Main Content Flow */}
      <main className="flex-grow">
        {/* 1. Main Product Hero Section (Leebord Inspired) */}
        <Hero
          config={config}
          quantity={quantity}
          setQuantity={setQuantity}
          selectedPack={selectedPack}
          setSelectedPack={setSelectedPack}
          onOrderWhatsApp={handleOrderWhatsApp}
        />

        {/* 2. Product Benefits */}
        <ProductBenefits config={config} />

        {/* 3. Directions and Usage Instructions ("उपयोग करने का सही तरीका" with 6 responsive cards) */}
        <UsageDirections config={config} />

        {/* 4. Important Information Section ("महत्वपूर्ण जानकारी" covering details, sizes, manufacturer, precautions, support) */}
        <ProductInformation config={config} />

        {/* 5. Customer Reviews (strictly hides when no approved reviews exist, compliant with Section 8) */}
        <CustomerReviews
          config={config}
          onReviewSubmitted={handleReviewSubmitted}
        />

        {/* 6. FAQ Section (Accordion covering all 6 topics in Hindi) */}
        <FaqSection config={config} />

        {/* 7. Contact and Shipping */}
        <ContactAndShipping
          config={config}
          onOrderWhatsApp={handleOrderWhatsApp}
        />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenPolicy={handleOpenPolicy}
        onOrderWhatsApp={handleOrderWhatsApp}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp
        config={config}
        quantity={quantity}
        onOrderWhatsApp={handleOrderWhatsApp}
      />

      {/* Policy Modal */}
      <PolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        initialTab={selectedPolicy}
        config={config}
      />
    </div>
  );
}
