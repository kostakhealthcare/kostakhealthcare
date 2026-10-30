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
  Eye,
  Info,
} from 'lucide-react';
import {
  SiteConfig,
  resolveImageUrl,
  ProductImageConfig,
  ProductPackOption,
  generateOrderMessage,
} from '../config';

interface HeroProps {
  config: SiteConfig;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  selectedPack: ProductPackOption;
  setSelectedPack: React.Dispatch<React.SetStateAction<ProductPackOption>>;
  onOrderWhatsApp: (pack?: ProductPackOption, qty?: number) => void;
  onOpenOwnerConfig: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  quantity,
  setQuantity,
  selectedPack,
  setSelectedPack,
  onOrderWhatsApp,
  onOpenOwnerConfig,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});
  const [activeSizeFilter, setActiveSizeFilter] = useState<'25g' | '15g'>('25g');
  const [showMessagePreview, setShowMessagePreview] = useState(false);

  // Full gallery items using all authentic user uploaded product photographs
  const galleryItems: { key: string; item: ProductImageConfig; title: string; category: string }[] = [
    {
      key: '25g-single',
      item: config.images.mainImage,
      title: '25 gm Master Product Jar',
      category: 'Product Packshot',
    },
    {
      key: '25g-pack2',
      item: config.images.packOf2Image,
      title: '25 gm Pack of 2 Jars',
      category: 'Bundle Pack',
    },
    {
      key: '25g-pack4',
      item: config.images.packOf4Image,
      title: '25 gm Pack of 4 Jars (Family Saver)',
      category: 'Bundle Pack',
    },
    {
      key: '15g-single',
      item: config.images.fifteenGmImage,
      title: '15 gm Compact Jar',
      category: 'Variant Size',
    },
    {
      key: '15g-pack2',
      item: config.images.fifteenGmPack2,
      title: '15 gm Pack of 2 Jars',
      category: 'Bundle Pack',
    },
    {
      key: '15g-pack4',
      item: config.images.fifteenGmPack4,
      title: '15 gm Pack of 4 Jars (Value Pack)',
      category: 'Bundle Pack',
    },
    {
      key: 'frontBack',
      item: config.images.frontBackJar,
      title: 'Front & Back Label (Ingredients & Mfg Details)',
      category: 'Verified Packaging',
    },
    {
      key: 'promo1',
      item: config.images.promoImage1,
      title: 'दाद, खाज, खुजली की असरदार दवाई (Post 1)',
      category: 'Infographic',
    },
    {
      key: 'promo2',
      item: config.images.promoImage2,
      title: 'दाद का दिव्यास्त्र (Post 2)',
      category: 'Infographic',
    },
  ];

  const currentGalleryItem = galleryItems[selectedImageIndex] || galleryItems[0];
  const activeImageUrl = imageErrorMap[selectedImageIndex]
    ? currentGalleryItem.item.fallback
    : resolveImageUrl(currentGalleryItem.item, config.imageVersion);

  const unitPrice = selectedPack?.price ?? (config.price ? Number(config.price) : null);
  const unitMrp = selectedPack?.mrp ?? (config.mrp ? Number(config.mrp) : null);
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

  const handleSelectPack = (pack: ProductPackOption) => {
    setSelectedPack(pack);
    if (pack.sizeCategory) {
      setActiveSizeFilter(pack.sizeCategory);
    }
    // Match corresponding gallery item
    if (pack.id === '25gm-single') setSelectedImageIndex(0);
    else if (pack.id === '25gm-pack2') setSelectedImageIndex(1);
    else if (pack.id === '25gm-pack4') setSelectedImageIndex(2);
    else if (pack.id === '15gm-single') setSelectedImageIndex(3);
    else if (pack.id === '15gm-pack2') setSelectedImageIndex(4);
    else if (pack.id === '15gm-pack4') setSelectedImageIndex(5);
  };

  const handleFilterSize = (size: '25g' | '15g') => {
    setActiveSizeFilter(size);
    // Find matching pack in this size
    const currentPackType = selectedPack.packType || 'single';
    const matchingPack =
      config.packOptions.find((p) => p.sizeCategory === size && p.packType === currentPackType) ||
      config.packOptions.find((p) => p.sizeCategory === size) ||
      config.packOptions[0];
    if (matchingPack) {
      handleSelectPack(matchingPack);
    }
  };

  // Filtered packs for active size tab
  const displayedPacks = config.packOptions.filter((p) => {
    if (p.sizeCategory) return p.sizeCategory === activeSizeFilter;
    if (activeSizeFilter === '25g') return p.size.includes('25');
    if (activeSizeFilter === '15g') return p.size.includes('15');
    return true;
  });

  // Generate preview of exact WhatsApp message that will be sent
  const sampleMessage = generateOrderMessage({
    productName: config.productName || 'DAAD FREE Ayurvedic Antifungal Cream',
    size: selectedPack.size || '25g',
    pack: selectedPack.packLabel || selectedPack.name || 'Single',
    quantity: quantity,
    unitPrice: unitPrice,
    totalAmount: totalPrice,
    currencySymbol: config.currencySymbol || '₹',
  });

  return (
    <section id="home" className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Organic background glows */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#E8EFE9] rounded-full blur-3xl opacity-60 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-[#F4EDE0] rounded-full blur-3xl opacity-60 pointer-events-none transform -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* ================================================================= */}
          {/* LEFT: PRODUCT IMAGE & INTERACTIVE GALLERY */}
          {/* ================================================================= */}
          <div className="lg:col-span-6 flex flex-col items-center sticky top-24">
            
            {/* Main Showcase Image Frame */}
            <div className="relative w-full max-w-lg aspect-square bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-[#E9E4D8] group overflow-hidden flex items-center justify-center">
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
                className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white text-[#293B30] rounded-full shadow-md border border-[#E2DDD0] opacity-80 group-hover:opacity-100 transition-opacity"
                title="Click to view full image in high resolution"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Tag / Category indicator */}
              <div className="absolute bottom-4 left-4 bg-[#132B1E]/90 backdrop-blur-xs text-[#FAF8F5] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-[#2D5A42] shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-[#88C498]" />
                <span>{currentGalleryItem.title}</span>
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="mt-4 flex items-center gap-2.5 w-full max-w-lg overflow-x-auto pb-2 scrollbar-thin">
              {galleryItems.map((thumb, index) => {
                const thumbUrl = imageErrorMap[index]
                  ? thumb.item.fallback
                  : resolveImageUrl(thumb.item, config.imageVersion);
                const isSelected = selectedImageIndex === index;

                return (
                  <button
                    key={thumb.key}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-white border-2 transition-all p-1 flex items-center justify-center ${
                      isSelected
                        ? 'border-[#235E37] ring-2 ring-[#235E37]/30 shadow-md scale-105'
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
            
            <p className="text-[11px] text-[#6E8074] mt-1 text-center">
              Click thumbnail to inspect 25g &bull; 15g &bull; Pack of 2 &bull; Pack of 4 &bull; Verified Label
            </p>
          </div>

          {/* ================================================================= */}
          {/* RIGHT: PRODUCT INFO & ORDER ACTION */}
          {/* ================================================================= */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            
            {/* Brand Kicker */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#235E37]">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#235E37]" />
              <span>{config.companyFullName || config.brandName}</span>
              <span className="text-[#899D8F]">•</span>
              <span className="text-[#6D8273]">Mfg. Lic. No: {config.contact.ayurvedicLicenseNo}</span>
            </div>

            {/* Product Title & Subtitle */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#112418] leading-[1.18] tracking-tight font-serif-title">
                {config.productName}
              </h1>
              <p className="mt-2 text-base sm:text-lg text-[#1C5331] font-semibold">
                {config.tagline}
              </p>
            </div>

            {/* Factual Short Description */}
            <p className="text-sm sm:text-base text-[#38483D] leading-relaxed border-l-3 border-[#235E37] pl-4 bg-[#F5EFE4]/50 py-2 rounded-r-xl">
              {config.heroDescription}
            </p>

            {/* Key Active Formulation Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#2D4033] py-2">
              <div className="p-2.5 rounded-xl bg-white border border-[#E7E0D2] text-center">
                <span className="block font-bold text-sm text-[#18532F]">49%</span>
                <span className="text-[10px] text-[#55695C]">Alba Bark (श्वेत कुटज)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E7E0D2] text-center">
                <span className="block font-bold text-sm text-[#18532F]">3%</span>
                <span className="text-[10px] text-[#55695C]">Aloevera Gel</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E7E0D2] text-center">
                <span className="block font-bold text-sm text-[#18532F]">0.5%</span>
                <span className="text-[10px] text-[#55695C]">Curcuma Longa (हल्दी)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E7E0D2] text-center">
                <span className="block font-bold text-sm text-[#18532F]">Day 1</span>
                <span className="text-[10px] text-[#55695C]">Itch Relief Action</span>
              </div>
            </div>

            {/* Size & Pack Selection Section */}
            <div className="space-y-3 bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DFD1] shadow-xs">
              
              {/* Step 1: Select Size (25g or 15g) */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#14291B]">
                  1. Select Product Size:
                </span>
                <div className="flex items-center gap-1.5 p-1 bg-[#F2EDE2] rounded-xl border border-[#E0D7C4]">
                  <button
                    type="button"
                    onClick={() => handleFilterSize('25g')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeSizeFilter === '25g'
                        ? 'bg-[#1C8A4E] text-white shadow-xs'
                        : 'text-[#475C4E] hover:text-[#112418]'
                    }`}
                  >
                    25 gm (Standard)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFilterSize('15g')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeSizeFilter === '15g'
                        ? 'bg-[#1C8A4E] text-white shadow-xs'
                        : 'text-[#475C4E] hover:text-[#112418]'
                    }`}
                  >
                    15 gm (Compact)
                  </button>
                </div>
              </div>

              {/* Step 2: Select Pack (Single, Pack of 2, Pack of 4) */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#14291B] block mb-2">
                  2. Choose Pack Option:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {displayedPacks.map((pack) => {
                    const isSelected = selectedPack.id === pack.id;
                    const savings = pack.mrp > pack.price ? pack.mrp - pack.price : 0;

                    return (
                      <div
                        key={pack.id}
                        onClick={() => handleSelectPack(pack)}
                        className={`relative p-3 rounded-xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#1C8A4E] bg-[#F1F9F4] shadow-xs ring-1 ring-[#1C8A4E]'
                            : 'border-[#E2DDD0] bg-white hover:border-[#ADC4B4]'
                        }`}
                      >
                        {pack.badge && (
                          <span className="absolute -top-2.5 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#1C8A4E] text-white shadow-xs">
                            {pack.badge}
                          </span>
                        )}

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-[#1C8A4E] bg-[#1C8A4E]' : 'border-[#A7BAAE]'
                            }`}>
                              {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                            </span>
                            <span className="text-xs font-bold text-[#14291B]">{pack.packLabel || pack.name}</span>
                          </div>
                          <span className="text-[11px] text-[#55695C] block mt-0.5 ml-5">
                            {pack.size}
                          </span>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-[#EAE3D5] flex items-baseline justify-between">
                          <span className="text-sm font-extrabold text-[#112418]">
                            {config.currencySymbol}{pack.price}
                          </span>
                          {savings > 0 && (
                            <span className="text-[10px] font-semibold text-[#1B6C39] bg-[#E1F3E7] px-1.5 py-0.5 rounded">
                              Save {config.currencySymbol}{savings}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pricing Summary & Quantity Selector */}
            <div className="bg-[#FAF5ED] p-4 sm:p-5 rounded-2xl border border-[#E7DECD] shadow-xs">
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#63756A] font-semibold block">
                    Selected: {config.productName} ({selectedPack.size} • {selectedPack.packLabel || selectedPack.name})
                  </span>
                  {unitPrice ? (
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-3xl font-extrabold text-[#112619] tracking-tight">
                        {config.currencySymbol}{unitPrice}
                      </span>
                      {unitMrp && unitMrp > unitPrice && (
                        <>
                          <span className="text-base text-[#809486] line-through font-normal">
                            {config.currencySymbol}{unitMrp}
                          </span>
                          <span className="text-xs font-bold text-[#186835] bg-[#E1F3E7] px-2 py-0.5 rounded-md">
                            Save {config.currencySymbol}{unitMrp - unitPrice}
                          </span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="mt-1">
                      <span className="text-xl font-bold text-[#1C3627]">
                        Contact us for price
                      </span>
                    </div>
                  )}
                </div>

                {/* Subtotal calculation */}
                {unitPrice && quantity > 1 && (
                  <div className="text-right">
                    <span className="text-xs text-[#63756A]">Total Amount ({quantity} sets)</span>
                    <div className="text-xl font-bold text-[#176633]">
                      {config.currencySymbol}{totalPrice}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mt-5 pt-4 border-t border-[#E3D9C4] flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2D4033]">
                    Quantity:
                  </span>
                  <div className="flex items-center bg-white border border-[#CDC4B1] rounded-xl overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      className="w-10 h-10 flex items-center justify-center text-[#235E37] hover:bg-[#F2ECE1] transition-colors font-bold text-lg select-none cursor-pointer"
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
                      className="w-10 h-10 flex items-center justify-center text-[#235E37] hover:bg-[#F2ECE1] transition-colors font-bold text-lg select-none cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-xs text-[#5C6E62] flex items-center gap-1.5 font-medium">
                  <Truck className="w-4 h-4 text-[#235E37]" />
                  <span>Pan-India express delivery &bull; Dispatched in 24–48h</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={() => onOrderWhatsApp(selectedPack, quantity)}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-[#1C8A4E] hover:bg-[#167440] active:scale-[0.99] text-white font-bold text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
                title={`Order ${selectedPack.size} ${selectedPack.packLabel || selectedPack.name} on WhatsApp`}
              >
                <MessageSquare className="w-5 h-5 fill-white shrink-0" />
                <span>
                  Order on WhatsApp &bull; {selectedPack.size} {selectedPack.packLabel || selectedPack.name} {totalPrice ? `(${config.currencySymbol}${totalPrice})` : ''}
                </span>
                <ChevronRight className="w-4 h-4 ml-1 opacity-80" />
              </button>

              {/* Message preview toggle */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowMessagePreview(!showMessagePreview)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#486351] hover:text-[#112418] font-medium underline underline-offset-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showMessagePreview ? 'Hide' : 'View'} prefilled WhatsApp order message</span>
                </button>
              </div>

              {/* Prefilled message preview card */}
              {showMessagePreview && (
                <div className="p-3.5 bg-[#FAF7F0] border border-[#DDD3C0] rounded-xl text-xs text-[#2D3E32] space-y-2">
                  <div className="flex items-center justify-between font-bold text-[#112418]">
                    <span className="flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#1C8A4E]" />
                      Prefilled Message Preview for WhatsApp:
                    </span>
                    <span className="text-[10px] text-[#647C6C] font-normal">Sent to +91 9131138853</span>
                  </div>
                  <pre className="bg-white p-3 rounded-lg border border-[#E5DECD] text-[11px] leading-relaxed text-[#213527] font-mono whitespace-pre-wrap overflow-x-auto">
                    {sampleMessage}
                  </pre>
                  <p className="text-[10px] text-[#6B8072]">
                    Clicking &ldquo;Order on WhatsApp&rdquo; opens this exact message in your WhatsApp app on phone or desktop.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-[#55695C] px-1">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#1C8A4E]" />
                  No payment gateway needed
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#1C8A4E]" />
                  Direct WhatsApp verification
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
                  <span>View Verified Label Ingredients & Directions for Use</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E8E2D4]">
              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white/80 border border-[#ECE6D8]">
                <Shield className="w-5 h-5 text-[#235E37] mb-1" />
                <span className="text-xs font-bold text-[#14291B]">Ayurvedic Proprietary</span>
                <span className="text-[10px] text-[#6A7D71]">Lic: {config.contact.ayurvedicLicenseNo}</span>
              </div>
              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white/80 border border-[#ECE6D8]">
                <Sparkles className="w-5 h-5 text-[#235E37] mb-1" />
                <span className="text-xs font-bold text-[#14291B]">49% Alba Bark</span>
                <span className="text-[10px] text-[#6A7D71]">Pure botanical extract</span>
              </div>
              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white/80 border border-[#ECE6D8]">
                <Truck className="w-5 h-5 text-[#235E37] mb-1" />
                <span className="text-xs font-bold text-[#14291B]">Pan-India Delivery</span>
                <span className="text-[10px] text-[#6A7D71]">Express courier tracking</span>
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
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[92vh] bg-white rounded-3xl p-4 sm:p-6 overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeImageUrl}
              alt={currentGalleryItem.item.alt}
              className="max-h-[75vh] w-auto mx-auto object-contain rounded-xl"
            />
            <div className="text-center mt-3">
              <span className="text-xs font-bold text-[#14291B] block">
                {currentGalleryItem.title}
              </span>
              <span className="text-[11px] text-[#55695C]">
                Kostak Healthcare Private Limited &bull; DAAD FREE Ayurvedic Antifungal Cream
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
