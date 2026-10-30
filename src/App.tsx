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
import { ProductInformation } from './components/ProductInformation';
import { ProductBenefits } from './components/ProductBenefits';
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
   * Opens WhatsApp with prefilled message format required by store:
   * Hello DAAD FREE Team,
   * I want to place an order.
   * Product: [Product Name]
   * Size: [Size]
   * Pack: [Pack]
   * Quantity: [Quantity]
   * Total Amount: [Amount]
   * Please confirm my order and delivery details.
   */
  const handleOrderWhatsApp = (customPack?: ProductPackOption, customQty?: number) => {
    const packToOrder = customPack || selectedPack;
    const qty = customQty != null ? customQty : quantity;
    const cleanNumber = (config.whatsAppNumber || WHATSAPP_BUSINESS.fullNumber || '').replace(/[^\d]/g, '');

    // Validate phone number
    if (!cleanNumber || cleanNumber.length < 10 || cleanNumber.includes('XXXX')) {
      setMissingPhoneAlert(true);
      return;
    }

    const unitPrice = packToOrder?.price ?? (config.price ? Number(config.price) : null);
    const totalPrice = unitPrice ? unitPrice * qty : null;

    const whatsappUrl = generateWhatsAppOrderUrl({
      productName: config.productName || 'DAAD FREE Ayurvedic Antifungal Cream',
      size: packToOrder?.size || '25g',
      pack: packToOrder?.packLabel || packToOrder?.name || 'Single',
      quantity: qty,
      unitPrice,
      totalAmount: totalPrice,
      currencySymbol: config.currencySymbol || '₹',
      customWhatsAppNumber: cleanNumber,
    });

    // Cross-platform open:
    // Try window.open first, if blocked or in mobile context fallback to location.href
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1D2A22]">
      {/* Customer support connection notice if needed */}
      {missingPhoneAlert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E2DDD0]">
            <h3 className="text-lg font-bold text-[#14291B] font-serif-title">
              WhatsApp Support
            </h3>
            <p className="text-xs sm:text-sm text-[#4E6255] mt-2 leading-relaxed">
              To place your order or speak with our Ayurvedic support representative, please reach us directly at WhatsApp / Phone <strong>+91 9131138853</strong> or email <a href="mailto:contact@kostakhealthcare.com" className="text-[#235E37] underline">contact@kostakhealthcare.com</a>.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setMissingPhoneAlert(false)}
                className="py-2.5 px-6 rounded-xl bg-[#235E37] text-white text-xs sm:text-sm font-semibold hover:bg-[#18482A] transition-colors"
              >
                Close
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
