/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MessageSquare,
  Shield,
  Truck,
  Leaf,
  Sparkles,
  ChevronRight,
  Maximize2,
  X,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { SiteConfig, resolveImageUrl, ProductImageConfig } from '../config';

interface HeroProps {
  config: SiteConfig;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  onOrderWhatsApp: () => void;
  onOpenOwnerConfig: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  quantity,
  setQuantity,
  onOrderWhatsApp,
  onOpenOwnerConfig,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});

  // Gallery images array
  const galleryItems: { key: string; item: ProductImageConfig; title: string }[] = [
    {
      key: 'main',
      item: config.images.mainImage,
      title: 'Packaging & 25g Tube',
    },
    {
      key: 'promo1',
      item: config.images.promoImage1,
      title: 'Botanical Herb Display',
    },
    {
      key: 'promo2',
      item: config.images.promoImage2,
      title: 'Ayurvedic Pure Ingredients',
    },
  ];

  const currentGalleryItem = galleryItems[selectedImageIndex] || galleryItems[0];
  const activeImageUrl = imageErrorMap[selectedImageIndex]
    ? currentGalleryItem.item.fallback
    : resolveImageUrl(currentGalleryItem.item, config.imageVersion);

  const hasConfiguredPrice =
    config.price !== null &&
    config.price !== undefined &&
    config.price !== '' &&
    Number(config.price) > 0;

  const unitPrice = hasConfiguredPrice ? Number(config.price) : null;
  const totalPrice = unitPrice ? unitPrice * quantity : null;

  const hasConfiguredWhatsApp =
    config.whatsAppNumber &&
    config.whatsAppNumber.replace(/\D/g, '').length >= 10 &&
    !config.whatsAppNumber.includes('XXXX');

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(99, prev + 1));
  };

  const handleImageError = (index: number) => {
    setImageErrorMap((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section id="home" className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#E8EFE9] rounded-full blur-3xl opacity-60 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-[#F4EDE0] rounded-full blur-3xl opacity-60 pointer-events-none transform -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* ================================================================= */}
          {/* LEFT: PRODUCT IMAGE & GALLERY */}
          {/* ================================================================= */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Main Image Container */}
            <div className="relative w-full max-w-lg aspect-square bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-[#E9E4D8] group overflow-hidden flex items-center justify-center">
              <img
                src={activeImageUrl}
                alt={currentGalleryItem.item.alt || config.productName}
                onError={() => handleImageError(selectedImageIndex)}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03] select-none"
                loading="eager"
              />

              {/* Lightbox zoom button */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-[#293B30] rounded-full shadow-sm border border-[#E2DDD0] opacity-80 group-hover:opacity-100 transition-opacity"
                title="Click to expand view"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Pack badge tag */}
              <div className="absolute bottom-4 left-4 bg-[#132B1E]/90 backdrop-blur-xs text-[#FAF8F5] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-[#2D5A42]">
                <Leaf className="w-3.5 h-3.5 text-[#88C498]" />
                <span>Pack Size: {config.packSize}</span>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-4 flex items-center justify-center gap-3 w-full max-w-lg">
              {galleryItems.map((thumb, index) => {
                const thumbUrl = imageErrorMap[index]
                  ? thumb.item.fallback
                  : resolveImageUrl(thumb.item, config.imageVersion);
                const isSelected = selectedImageIndex === index;

                return (
                  <button
                    key={thumb.key}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-white border-2 transition-all p-1 flex items-center justify-center ${
                      isSelected
                        ? 'border-[#235E37] ring-2 ring-[#235E37]/20 shadow-sm'
                        : 'border-[#E4DFD3] hover:border-[#B5C8BA] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumbUrl}
                      alt={thumb.title}
                      onError={() => handleImageError(index)}
                      className="w-full h-full object-contain"
                    />
                    <span className="sr-only">{thumb.title}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-[#6E8074] mt-2 text-center">
              Click thumbnails to switch views &bull; High resolution verified product pack
            </p>
          </div>

          {/* ================================================================= */}
          {/* RIGHT: PRODUCT INFO & ORDER ACTION */}
          {/* ================================================================= */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            
            {/* Brand Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#235E37]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#235E37]" />
              <span>{config.brandName} &bull; Authentic Ayurvedic Formulation</span>
            </div>

            {/* Product Title & Subtitle */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#112418] leading-[1.18] tracking-tight font-serif-title">
                {config.productName}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#465A4E] font-medium">
                {config.tagline}
              </p>
            </div>

            {/* Factual Short Description */}
            <p className="text-sm sm:text-base text-[#38483D] leading-relaxed border-l-2 border-[#C5A059] pl-4 bg-[#F5EFE4]/40 py-1 rounded-r-md">
              {config.heroDescription}
            </p>

            {/* Pack Size & Key Specs */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#2D4033] py-2 border-y border-[#E7E1D4]">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#112418]">Pack Size:</span>
                <span className="bg-[#EFE9DC] px-2 py-0.5 rounded font-medium text-[#1E3628]">
                  {config.packSize}
                </span>
              </div>
              <span className="text-[#B9C6BD]">&bull;</span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#112418]">Form:</span>
                <span>Topical Cream</span>
              </div>
              <span className="text-[#B9C6BD]">&bull;</span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#112418]">Category:</span>
                <span>Ayurvedic Proprietary Medicine</span>
              </div>
            </div>

            {/* Pricing Section (Never fake ₹0) */}
            <div className="bg-[#FAF5ED] p-4 sm:p-5 rounded-2xl border border-[#E7DECD] shadow-xs">
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#63756A] font-medium block">
                    Price per Pack (25g)
                  </span>
                  {hasConfiguredPrice ? (
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-3xl font-bold text-[#112619] tracking-tight">
                        {config.currencySymbol}{unitPrice}
                      </span>
                      {config.mrp && Number(config.mrp) > (unitPrice || 0) && (
                        <>
                          <span className="text-base text-[#809486] line-through font-normal">
                            {config.currencySymbol}{config.mrp}
                          </span>
                          <span className="text-xs font-semibold text-[#186835] bg-[#E1F3E7] px-2 py-0.5 rounded-md">
                            Save {config.currencySymbol}{Number(config.mrp) - (unitPrice || 0)}
                          </span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="mt-1">
                      <span className="text-xl font-bold text-[#1C3627]">
                        Contact us for price
                      </span>
                      <p className="text-xs text-[#63776A] mt-0.5">
                        Price confirmed directly during WhatsApp inquiry.
                      </p>
                    </div>
                  )}
                </div>

                {/* Sub-total when price configured */}
                {hasConfiguredPrice && quantity > 1 && (
                  <div className="text-right">
                    <span className="text-xs text-[#63756A]">Order Total ({quantity} packs)</span>
                    <div className="text-xl font-bold text-[#176633]">
                      {config.currencySymbol}{totalPrice}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mt-5 pt-4 border-t border-[#E3D9C4] flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2D4033]">
                    Select Quantity:
                  </span>
                  <div className="flex items-center bg-white border border-[#CDC4B1] rounded-xl overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      className="w-10 h-10 flex items-center justify-center text-[#235E37] hover:bg-[#F2ECE1] transition-colors font-bold text-lg select-none"
                      aria-label="Decrease quantity"
                    >
                      &minus;
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val >= 1) setQuantity(val);
                      }}
                      className="w-12 h-10 text-center font-bold text-[#112418] bg-transparent border-x border-[#CDC4B1] focus:outline-hidden text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleIncrease}
                      className="w-10 h-10 flex items-center justify-center text-[#235E37] hover:bg-[#F2ECE1] transition-colors font-bold text-lg select-none"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-xs text-[#5C6E62] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#235E37]" />
                  <span>Ships in 24–48 hours</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={onOrderWhatsApp}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-[#1C8A4E] hover:bg-[#167440] active:scale-[0.99] text-white font-bold text-base shadow-md hover:shadow-lg transition-all"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Buy Now on WhatsApp</span>
                <ChevronRight className="w-4 h-4 ml-1 opacity-80" />
              </button>

              <div className="flex items-center justify-between text-xs text-[#55695C] px-1">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#1C8A4E]" />
                  No online payment gateway needed
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#1C8A4E]" />
                  Direct order verification with team
                </span>
              </div>

              {/* Notice if WhatsApp is placeholder */}
              {!hasConfiguredWhatsApp && (
                <div className="p-3 bg-[#FFF8EB] border border-[#F2D7A5] rounded-xl text-xs text-[#825400] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#C07E00] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Owner Setup Notice: </span>
                    WhatsApp business number is not yet updated in <code className="bg-[#F6E6C5] px-1 py-0.5 rounded">site-config.js</code>.
                    <button
                      onClick={onOpenOwnerConfig}
                      className="ml-1 underline font-semibold text-[#663E00] hover:text-black"
                    >
                      Configure phone number now &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Secondary CTA */}
              <div className="text-center pt-1">
                <a
                  href="#product"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#294B35] hover:text-[#112418] hover:underline"
                >
                  <span>View Verified Ingredients & Directions for Use</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E8E2D4]">
              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white/70 border border-[#ECE6D8]">
                <Shield className="w-5 h-5 text-[#235E37] mb-1" />
                <span className="text-xs font-bold text-[#14291B]">100% Ayurvedic</span>
                <span className="text-[10px] text-[#6A7D71]">Classical herbs</span>
              </div>
              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white/70 border border-[#ECE6D8]">
                <Sparkles className="w-5 h-5 text-[#235E37] mb-1" />
                <span className="text-xs font-bold text-[#14291B]">Topical Relief</span>
                <span className="text-[10px] text-[#6A7D71]">For fungal itch & daad</span>
              </div>
              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white/70 border border-[#ECE6D8]">
                <Truck className="w-5 h-5 text-[#235E37] mb-1" />
                <span className="text-xs font-bold text-[#14291B]">Pan-India Shipping</span>
                <span className="text-[10px] text-[#6A7D71]">Direct dispatch</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* =================================================================== */}
      {/* LIGHTBOX MODAL */}
      {/* =================================================================== */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeImageUrl}
              alt={currentGalleryItem.item.alt}
              className="max-h-[80vh] w-auto mx-auto object-contain"
            />
            <div className="text-center mt-3 text-xs text-[#485C4F]">
              {currentGalleryItem.title} &bull; Pack size: {config.packSize}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
