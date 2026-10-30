/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { loadSiteConfig, SiteConfig, CustomerReview } from './config';
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
  const [quantity, setQuantity] = useState<number>(1);
  const [policyModalOpen, setPolicyModalOpen] = useState<boolean>(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType>('privacyPolicy');
  const [ownerConfigOpen, setOwnerConfigOpen] = useState<boolean>(false);
  const [missingPhoneAlert, setMissingPhoneAlert] = useState<boolean>(false);

  // Sync with window.DAAD_FREE_CONFIG if dynamically injected
  useEffect(() => {
    const handleStorageChange = () => {
      setConfig(loadSiteConfig());
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

    const hasConfiguredPrice =
      config.price !== null &&
      config.price !== undefined &&
      config.price !== '' &&
      Number(config.price) > 0;

    const unitPrice = hasConfiguredPrice ? Number(config.price) : null;
    const totalPrice = unitPrice ? unitPrice * quantity : null;

    // Build pre-filled message strictly as specified
    const greeting = config.whatsAppGreeting || `Hello ${config.brandName}, I am interested in ordering ${config.productName}, ${config.packSize}.`;
    
    let messageText = `${greeting}\n\n`;
    messageText += `• Product: ${config.productName}\n`;
    messageText += `• Pack Size: ${config.packSize}\n`;
    messageText += `• Quantity: ${quantity}\n`;

    if (hasConfiguredPrice && unitPrice && totalPrice) {
      messageText += `• Unit Price: ${config.currencySymbol}${unitPrice}\n`;
      messageText += `• Estimated Total: ${config.currencySymbol}${totalPrice} (excluding shipping if applicable)\n`;
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
    if (currentUrl) {
      messageText += `• Product Page: ${currentUrl}\n\n`;
    } else {
      messageText += `\n`;
    }

    messageText += `Please confirm availability, final price, and delivery details.`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

    // Open WhatsApp in current or new window
    window.location.href = whatsappUrl;
  };

  const handleReviewSubmitted = (newReview: CustomerReview) => {
    // Save to reviews queue in config (approved: false)
    const updatedReviews = [...(config.reviews || []), newReview];
    const updatedConfig = { ...config, reviews: updatedReviews };
    setConfig(updatedConfig);

    // Save to localStorage so owner can immediately review it
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
        {/* Hero Section */}
        <Hero
          config={config}
          quantity={quantity}
          setQuantity={setQuantity}
          onOrderWhatsApp={handleOrderWhatsApp}
          onOpenOwnerConfig={() => setOwnerConfigOpen(true)}
        />

        {/* Product Information */}
        <ProductInformation config={config} />

        {/* Product Benefits */}
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

        {/* Contact and Shipping */}
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
