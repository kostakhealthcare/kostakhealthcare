/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { loadSiteConfig, SiteConfig, CustomerReview, ProductPackOption } from './config';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductInformation } from './components/ProductInformation';
import { ProductBenefits } from './components/ProductBenefits';
import { CustomerReviews } from './components/CustomerReviews';
import { ReviewVideos } from './components/ReviewVideos';
import { FaqSection } from './components/FaqSection';
import { ContactAndShipping } from './components/ContactAndShipping';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { OwnerConfigModal } from './components/OwnerConfigModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => loadSiteConfig());
  const [selectedPack, setSelectedPack] = useState<ProductPackOption>(
    () => config.packOptions?.[0] || {
      id: "25gm-single",
      name: "Single Jar (Standard)",
      size: "25 gm",
      quantityInPack: 1,
      price: 349,
      mrp: 380,
      imageUrl: "/assets/aistudio/25_gm_Master_Product_front.jpg_0667641f.jpeg",
      badge: "Most Popular",
    }
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [policyModalOpen, setPolicyModalOpen] = useState<boolean>(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType>('privacyPolicy');
  const [ownerConfigOpen, setOwnerConfigOpen] = useState<boolean>(false);
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
   * Generates and triggers the official WhatsApp click-to-chat order URL
   */
  const handleOrderWhatsApp = () => {
    const cleanNumber = (config.whatsAppNumber || '').replace(/[^\d]/g, '');

    // Validate phone number
    if (!cleanNumber || cleanNumber.length < 10 || config.whatsAppNumber.includes('XXXX')) {
      setMissingPhoneAlert(true);
      return;
    }

    const unitPrice = selectedPack?.price ?? (config.price ? Number(config.price) : null);
    const totalPrice = unitPrice ? unitPrice * quantity : null;

    // Build pre-filled message strictly as specified with actual pack option details
    const greeting = config.whatsAppGreeting || `Hello ${config.brandName}, I am interested in ordering ${config.productName}.`;
    
    let messageText = `${greeting}\n\n`;
    messageText += `• Product: ${config.productName}\n`;
    messageText += `• Selected Pack: ${selectedPack.name} (${selectedPack.size})\n`;
    messageText += `• Quantity: ${quantity}\n`;

    if (unitPrice && totalPrice) {
      messageText += `• Unit Price: ${config.currencySymbol}${unitPrice}\n`;
      messageText += `• Order Total: ${config.currencySymbol}${totalPrice} (excluding shipping if applicable)\n`;
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
    if (currentUrl) {
      messageText += `• Webpage Link: ${currentUrl}\n\n`;
    } else {
      messageText += `\n`;
    }

    messageText += `Please confirm availability, delivery timeline, and payment details.`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

    // Open WhatsApp
    window.location.href = whatsappUrl;
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1D2A22]">
      {/* Missing WhatsApp configuration dialog */}
      {missingPhoneAlert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E2DDD0]">
            <h3 className="text-lg font-bold text-[#14291B] font-serif-title">
              WhatsApp Number Configuration Required
            </h3>
            <p className="text-xs sm:text-sm text-[#4E6255] mt-2 leading-relaxed">
              The official WhatsApp business number has not yet been set up in <code>site-config.js</code>.
            </p>
            <p className="text-xs text-[#63786A] mt-2">
              If you are the store owner, you can set your 10-12 digit WhatsApp phone number right now in the Owner Settings drawer.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setMissingPhoneAlert(false);
                  setOwnerConfigOpen(true);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#235E37] text-white text-xs sm:text-sm font-semibold hover:bg-[#18482A] transition-colors"
              >
                Configure WhatsApp Number
              </button>
              <button
                onClick={() => setMissingPhoneAlert(false)}
                className="py-2.5 px-4 rounded-xl bg-[#EFE9DC] text-[#34473B] text-xs sm:text-sm font-semibold hover:bg-[#E5DDCB]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        config={config}
        onOpenOwnerConfig={() => setOwnerConfigOpen(true)}
        onOrderWhatsApp={handleOrderWhatsApp}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section with genuine packaging showcase and pack selector */}
        <Hero
          config={config}
          quantity={quantity}
          setQuantity={setQuantity}
          selectedPack={selectedPack}
          setSelectedPack={setSelectedPack}
          onOrderWhatsApp={handleOrderWhatsApp}
          onOpenOwnerConfig={() => setOwnerConfigOpen(true)}
        />

        {/* Product Information with verified label ingredients and directions */}
        <ProductInformation config={config} />

        {/* Product Benefits with official infographics */}
        <ProductBenefits config={config} />

        {/* Customer Reviews (starts empty until approved) */}
        <CustomerReviews
          config={config}
          onReviewSubmitted={handleReviewSubmitted}
        />

        {/* Customer Review Videos */}
        <ReviewVideos
          config={config}
          onOpenOwnerConfig={() => setOwnerConfigOpen(true)}
        />

        {/* FAQ Section */}
        <FaqSection config={config} />

        {/* Contact and Shipping with genuine addresses */}
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
        onOpenOwnerConfig={() => setOwnerConfigOpen(true)}
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

      {/* Store Owner Configurator Modal */}
      <OwnerConfigModal
        isOpen={ownerConfigOpen}
        onClose={() => setOwnerConfigOpen(false)}
        config={config}
        onConfigUpdated={(newCfg) => setConfig(newCfg)}
      />
    </div>
  );
}
