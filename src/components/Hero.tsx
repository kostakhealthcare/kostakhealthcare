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
}

export const Hero: React.FC<HeroProps> = ({
  config,
  quantity,
  setQuantity,
  selectedPack,
  setSelectedPack,
  onOrderWhatsApp,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});
  const [activeSizeFilter, setActiveSizeFilter] = useState<'25g' | '15g'>('25g');
  const [showMessagePreview, setShowMessagePreview] = useState(false);

  // Authentic product photography gallery
  const galleryItems: { key: string; item: ProductImageConfig; title: string; category: string }[] = [
    {
      key: '25g-single',
      item: config.images.mainImage,
      title: '25 ग्राम मुख्य उत्पाद जार',
      category: 'उत्पाद जार',
    },
    {
      key: '25g-pack2',
      item: config.images.packOf2Image,
      title: '25 ग्राम - 2 जार का पैक',
      category: 'बंडल पैक',
    },
    {
      key: '25g-pack4',
      item: config.images.packOf4Image,
      title: '25 ग्राम - 4 जार का पारिवारिक पैक',
      category: 'बचत पैक',
    },
    {
      key: '15g-single',
      item: config.images.fifteenGmImage,
      title: '15 ग्राम कॉम्पैक्ट जार',
      category: 'कॉम्पैक्ट साइज़',
    },
    {
      key: '15g-pack2',
      item: config.images.fifteenGmPack2,
      title: '15 ग्राम - 2 जार का पैक',
      category: 'बंडल पैक',
    },
    {
      key: '15g-pack4',
      item: config.images.fifteenGmPack4,
      title: '15 ग्राम - 4 जार का कॉम्बो पैक',
      category: 'बचत पैक',
    },
    {
      key: 'frontBack',
      item: config.images.frontBackJar,
      title: 'फ्रंट व बैक लेबल (उत्पाद व निर्माण विवरण)',
      category: 'सत्यापित लेबल',
    },
    {
      key: 'promo1',
      item: config.images.promoImage1,
      title: 'दाद, खाज, खुजली की असरदार दवाई (पोस्टर 1)',
      category: 'इन्फोग्राफिक',
    },
    {
      key: 'promo2',
      item: config.images.promoImage2,
      title: 'दाद का दिव्यास्त्र (पोस्टर 2)',
      category: 'इन्फोग्राफिक',
    },
  ];

  const currentGalleryItem = galleryItems[selectedImageIndex] || galleryItems[0];
  const activeImageUrl = imageErrorMap[selectedImageIndex]
    ? currentGalleryItem.item.fallback
    : resolveImageUrl(currentGalleryItem.item, config.imageVersion);

  const unitPrice = selectedPack?.price ?? (config.price ? Number(config.price) : null);
  const unitMrp = selectedPack?.mrp ?? (config.mrp ? Number(config.mrp) : null);
  const totalPrice = unitPrice ? unitPrice * quantity : null;

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
    const currentPackType = selectedPack.packType || 'single';
    const matchingPack =
      config.packOptions.find((p) => p.sizeCategory === size && p.packType === currentPackType) ||
      config.packOptions.find((p) => p.sizeCategory === size) ||
      config.packOptions[0];
    if (matchingPack) {
      handleSelectPack(matchingPack);
    }
  };

  const displayedPacks = config.packOptions.filter((p) => {
    if (p.sizeCategory) return p.sizeCategory === activeSizeFilter;
    if (activeSizeFilter === '25g') return p.size.includes('25');
    if (activeSizeFilter === '15g') return p.size.includes('15');
    return true;
  });

  const sampleMessage = generateOrderMessage({
    productName: config.productName || 'DAAD FREE Ayurvedic Antifungal Cream',
    size: selectedPack.size || '25 ग्राम',
    pack: selectedPack.packLabel || selectedPack.name || '1 जार (मानक)',
    quantity: quantity,
    unitPrice: unitPrice,
    totalAmount: totalPrice,
    currencySymbol: config.currencySymbol || '₹',
  });

  return (
    <section id="home" className="relative pt-4 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 overflow-hidden w-full max-w-full">
      {/* Subtle organic background tint */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#E8F2EC] rounded-full blur-3xl opacity-60 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-[#F4EDE0] rounded-full blur-3xl opacity-50 pointer-events-none transform -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* ================================================================= */}
          {/* LEFT: PRODUCT IMAGE & INTERACTIVE GALLERY (LEEBORD INSPIRED) */}
          {/* ================================================================= */}
          <div className="lg:col-span-6 flex flex-col items-center w-full max-w-full lg:sticky lg:top-28">
            
            {/* Main Showcase Image Frame - Never stretch or crop */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square bg-white rounded-3xl p-4 sm:p-8 shadow-sm border border-[#E3EDE6] group overflow-hidden flex items-center justify-center">
              <img
                src={activeImageUrl}
                alt={currentGalleryItem.item.alt || config.productName}
                onError={() => handleImageError(selectedImageIndex)}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02] select-none"
                loading="eager"
              />

              {/* Lightbox zoom button */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2.5 bg-white/95 hover:bg-white text-[#0F281B] rounded-full shadow-xs border border-[#E0ECE3] transition-colors cursor-pointer"
                title="उच्च रिज़ॉल्यूशन में बड़ा करके देखें"
                aria-label="चित्र बड़ा करें"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Category indicator */}
              <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 bg-[#0F281B]/90 backdrop-blur-xs text-[#FAF8F5] text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-[#1E4D34] shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#88C498] shrink-0" />
                <span className="truncate">{currentGalleryItem.title}</span>
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="mt-4 w-full max-w-md sm:max-w-lg">
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 px-1 touch-pan-x overscroll-x-contain scrollbar-thin snap-x snap-mandatory">
                {galleryItems.map((thumb, index) => {
                  const thumbUrl = imageErrorMap[index]
                    ? thumb.item.fallback
                    : resolveImageUrl(thumb.item, config.imageVersion);
                  const isSelected = selectedImageIndex === index;

                  return (
                    <button
                      key={thumb.key}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 snap-start rounded-2xl overflow-hidden bg-white border-2 transition-all p-1.5 flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border-[#0F281B] ring-2 ring-[#0F281B]/20 shadow-xs scale-105'
                          : 'border-[#E3EDE6] hover:border-[#ADC4B4] opacity-80 hover:opacity-100'
                      }`}
                      aria-label={thumb.title}
                    >
                      <img
                        src={thumbUrl}
                        alt={thumb.title}
                        onError={() => handleImageError(index)}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[#55695C] mt-1.5 text-center">
                25 ग्राम &bull; 15 ग्राम &bull; 2 जार &bull; 4 जार &bull; प्रामाणिक पैकेजिंग फोटो
              </p>
            </div>

            {/* Trust Highlights Below Image */}
            <div className="grid grid-cols-3 gap-2.5 w-full max-w-md sm:max-w-lg mt-4 text-center">
              <div className="bg-white/80 p-2.5 rounded-xl border border-[#E3EDE6]">
                <Shield className="w-4 h-4 text-[#1C8A4E] mx-auto mb-1" />
                <span className="text-[10px] sm:text-[11px] font-bold text-[#0F281B] block leading-tight">आयुर्वेदिक निर्माण</span>
                <span className="text-[9px] text-[#5A6E62]">लाइसेंस प्राप्त</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-[#E3EDE6]">
                <Sparkles className="w-4 h-4 text-[#1C8A4E] mx-auto mb-1" />
                <span className="text-[10px] sm:text-[11px] font-bold text-[#0F281B] block leading-tight">स्टेरॉयड मुक्त</span>
                <span className="text-[9px] text-[#5A6E62]">त्वचा के लिए कोमल</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-[#E3EDE6]">
                <Truck className="w-4 h-4 text-[#1C8A4E] mx-auto mb-1" />
                <span className="text-[10px] sm:text-[11px] font-bold text-[#0F281B] block leading-tight">अखिल भारतीय</span>
                <span className="text-[9px] text-[#5A6E62]">24-48h में डिस्पैच</span>
              </div>
            </div>

          </div>

          {/* ================================================================= */}
          {/* RIGHT: CONTIGUOUS PURCHASE MODULE (LEEBORD INSPIRED) */}
          {/* ================================================================= */}
          <div className="lg:col-span-6 flex flex-col space-y-5 sm:space-y-6 w-full max-w-full">
            
            {/* Brand Kicker with license (clean unboxed text) */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold tracking-wide uppercase text-[#1C8A4E]">
              <span>{config.companyFullName || config.brandName}</span>
              <span className="text-[#899D8F]">&bull;</span>
              <span className="text-[#4E6255]">आयुर्वेदिक लाइसेंस: {config.contact.ayurvedicLicenseNo}</span>
            </div>

            {/* Product Title & Tagline */}
            <div>
              <h1 className="font-clamp-hero font-bold text-[#0F281B] tracking-tight font-serif-title break-words">
                {config.productName}
              </h1>
              <p className="mt-2 text-base sm:text-lg text-[#143524] font-semibold break-words">
                {config.tagline}
              </p>
            </div>

            {/* Verified Short Description */}
            <p className="text-sm sm:text-base text-[#38483D] leading-relaxed bg-[#F2F7F4] p-3.5 sm:p-4 rounded-2xl border border-[#E0ECE3] break-words">
              {config.heroDescription}
            </p>

            {/* 4 Active Product Highlights (No confidential formulation or ingredient names) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#2D4033]">
              <div className="p-2.5 rounded-xl bg-white border border-[#E3EDE6] text-center">
                <span className="block font-bold text-xs sm:text-sm text-[#0F281B]">पहले दिन से राहत</span>
                <span className="text-[10px] text-[#55695C] block">तीव्र खुजली व जलन में असर</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E3EDE6] text-center">
                <span className="block font-bold text-xs sm:text-sm text-[#0F281B]">फंगस पर लक्षित वार</span>
                <span className="text-[10px] text-[#55695C] block">संक्रमण फैलाव से सुरक्षा</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E3EDE6] text-center">
                <span className="block font-bold text-xs sm:text-sm text-[#0F281B]">स्टेरॉयड-मुक्त</span>
                <span className="text-[10px] text-[#55695C] block">त्वचा के लिए सुरक्षित व कोमल</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E3EDE6] text-center">
                <span className="block font-bold text-xs sm:text-sm text-[#0F281B]">प्रामाणिक निर्माण</span>
                <span className="text-[10px] text-[#55695C] block">KOSTAK Healthcare</span>
              </div>
            </div>

            {/* Step 1 & 2: Size & Pack Selector (Leebord Clean Card Design) */}
            <div className="space-y-4 bg-white p-4 sm:p-5 rounded-3xl border border-[#E3EDE6] shadow-xs w-full">
              
              {/* Step 1: Select Size (25g vs 15g) */}
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F281B]">
                  1. साइज़ चुनें (Size):
                </span>
                <div className="inline-flex items-center gap-1.5 p-1 bg-[#F2F7F4] rounded-xl border border-[#DFEBE3] self-start xs:self-auto">
                  <button
                    type="button"
                    onClick={() => handleFilterSize('25g')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeSizeFilter === '25g'
                        ? 'bg-[#0F281B] text-white shadow-xs'
                        : 'text-[#475C4E] hover:text-[#0F281B]'
                    }`}
                  >
                    25 ग्राम (मानक जार)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFilterSize('15g')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeSizeFilter === '15g'
                        ? 'bg-[#0F281B] text-white shadow-xs'
                        : 'text-[#475C4E] hover:text-[#0F281B]'
                    }`}
                  >
                    15 ग्राम (कॉम्पैक्ट जार)
                  </button>
                </div>
              </div>

              {/* Step 2: Select Pack Option (Single, Pack of 2, Pack of 4) */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F281B] block mb-2.5">
                  2. पैक विकल्प चुनें (Pack Options):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {displayedPacks.map((pack) => {
                    const isSelected = selectedPack.id === pack.id;
                    const savings = pack.mrp > pack.price ? pack.mrp - pack.price : 0;

                    return (
                      <div
                        key={pack.id}
                        onClick={() => handleSelectPack(pack)}
                        className={`relative p-3.5 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between min-w-0 ${
                          isSelected
                            ? 'border-[#0F281B] bg-[#F2F7F4] shadow-xs'
                            : 'border-[#E3EDE6] bg-white hover:border-[#ADC4B4]'
                        }`}
                      >
                        {pack.badge && (
                          <span className="absolute -top-2.5 right-2 text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-[#1C8A4E] text-white shadow-xs">
                            {pack.badge}
                          </span>
                        )}

                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-[#0F281B] bg-[#0F281B]' : 'border-[#A7BAAE]'
                            }`}>
                              {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                            </span>
                            <span className="text-xs font-bold text-[#0F281B] truncate">{pack.packLabel || pack.name}</span>
                          </div>
                          <span className="text-[11px] text-[#55695C] block mt-1 ml-6">
                            {pack.size}
                          </span>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-[#E0ECE3] flex items-baseline justify-between gap-1">
                          <span className="text-sm sm:text-base font-extrabold text-[#0F281B]">
                            {config.currencySymbol}{pack.price}
                          </span>
                          {savings > 0 && (
                            <span className="text-[10px] font-semibold text-[#1C8A4E] bg-[#E1F3E7] px-2 py-0.5 rounded-md whitespace-nowrap">
                              बचत {config.currencySymbol}{savings}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pricing Summary & Quantity Stepper */}
            <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-3xl border border-[#E3EDE6] shadow-xs w-full">
              <div className="flex flex-col xs:flex-row xs:items-baseline justify-between gap-2.5">
                <div className="min-w-0">
                  <span className="text-xs uppercase tracking-wider text-[#63756A] font-semibold block break-words">
                    चयनित: {config.productName} ({selectedPack.size} &bull; {selectedPack.packLabel || selectedPack.name})
                  </span>
                  {unitPrice ? (
                    <div className="flex items-baseline gap-2.5 sm:gap-3 mt-1.5 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#0F281B] tracking-tight">
                        {config.currencySymbol}{unitPrice}
                      </span>
                      {unitMrp && unitMrp > unitPrice && (
                        <>
                          <span className="text-sm sm:text-base text-[#809486] line-through font-normal">
                            {config.currencySymbol}{unitMrp}
                          </span>
                          <span className="text-xs font-bold text-[#1C8A4E] bg-[#E1F3E7] px-2 py-0.5 rounded-md whitespace-nowrap">
                            बचत {config.currencySymbol}{unitMrp - unitPrice}
                          </span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="mt-1">
                      <span className="text-lg font-bold text-[#0F281B]">
                        मूल्य हेतु संपर्क करें
                      </span>
                    </div>
                  )}
                </div>

                {/* Subtotal calculation */}
                {unitPrice && quantity > 1 && (
                  <div className="text-left xs:text-right shrink-0">
                    <span className="text-xs text-[#63756A] block">कुल राशि ({quantity} सेट)</span>
                    <div className="text-xl sm:text-2xl font-bold text-[#0F281B]">
                      {config.currencySymbol}{totalPrice}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Stepper */}
              <div className="mt-4 pt-3.5 border-t border-[#E0ECE3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2D4033]">
                    मात्रा (Quantity):
                  </span>
                  <div className="flex items-center bg-white border border-[#CBDCD1] rounded-xl overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      className="w-10 h-10 flex items-center justify-center text-[#0F281B] hover:bg-[#F2F7F4] transition-colors font-bold text-lg select-none cursor-pointer"
                      aria-label="मात्रा घटाएं"
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
                      className="w-12 h-10 text-center font-bold text-[#0F281B] bg-transparent border-x border-[#CBDCD1] focus:outline-hidden text-sm"
                      aria-label="ऑर्डर मात्रा"
                    />
                    <button
                      type="button"
                      onClick={handleIncrease}
                      className="w-10 h-10 flex items-center justify-center text-[#0F281B] hover:bg-[#F2F7F4] transition-colors font-bold text-lg select-none cursor-pointer"
                      aria-label="मात्रा बढ़ाएं"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-xs text-[#55695C] flex items-center gap-1.5 font-medium">
                  <Truck className="w-4 h-4 text-[#1C8A4E] shrink-0" />
                  <span>अखिल भारतीय एक्सप्रेस कूरियर डिलीवरी &bull; 24–48 घंटे में डिस्पैच</span>
                </div>
              </div>
            </div>

            {/* Prominent WhatsApp Ordering CTA Button (Leebord Style) */}
            <div className="space-y-3 w-full">
              <button
                onClick={() => onOrderWhatsApp(selectedPack, quantity)}
                className="w-full flex items-center justify-center gap-2.5 sm:gap-3 py-4 sm:py-4.5 px-6 rounded-2xl bg-[#0F281B] hover:bg-[#153B25] active:scale-[0.99] text-white font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                title={`WhatsApp पर ${selectedPack.size} ऑर्डर करें`}
              >
                <MessageSquare className="w-5 h-5 text-[#88C498] fill-[#88C498] shrink-0" />
                <span className="text-sm sm:text-base font-bold text-center leading-snug">
                  WhatsApp पर ऑर्डर करें &bull; {selectedPack.size} {totalPrice ? `(${config.currencySymbol}${totalPrice})` : ''}
                </span>
                <ChevronRight className="w-4 h-4 shrink-0 opacity-80 hidden xs:inline" />
              </button>

              {/* Message preview toggle */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowMessagePreview(!showMessagePreview)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#4E6255] hover:text-[#0F281B] font-medium underline underline-offset-2 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showMessagePreview ? 'छुपाएं' : 'देखें'} WhatsApp पर जाने वाला प्री-फिल्ड संदेश</span>
                </button>
              </div>

              {/* Prefilled message preview card */}
              {showMessagePreview && (
                <div className="p-3.5 sm:p-4 bg-white border border-[#E0ECE3] rounded-2xl text-xs text-[#2D3E32] space-y-2.5 shadow-xs">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between font-bold text-[#0F281B] gap-1">
                    <span className="flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#1C8A4E] shrink-0" />
                      WhatsApp पर जाने वाले संदेश का प्रारूप:
                    </span>
                    <span className="text-[11px] text-[#647C6C] font-normal">+91 9131138853 पर प्रेषित</span>
                  </div>
                  <pre className="bg-[#F2F7F4] p-3 rounded-xl border border-[#DFEBE3] text-xs leading-relaxed text-[#0F281B] font-mono whitespace-pre-wrap break-words overflow-x-auto">
                    {sampleMessage}
                  </pre>
                  <p className="text-[11px] text-[#6B8072]">
                    &ldquo;WhatsApp पर ऑर्डर करें&rdquo; बटन दबाते ही यह संदेश आपके मोबाइल या कंप्यूटर के WhatsApp में खुल जाएगा।
                  </p>
                </div>
              )}

              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between text-xs text-[#55695C] px-1 gap-1.5">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#1C8A4E] shrink-0" />
                  किसी ऑनलाइन पेमेंट गेटवे की आवश्यकता नहीं
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#1C8A4E] shrink-0" />
                  सीधे WhatsApp पर ऑर्डर पुष्टि
                </span>
              </div>

              {/* Secondary jump to usage and ingredients */}
              <div className="text-center pt-1">
                <a
                  href="#usage"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C8A4E] hover:text-[#0F281B] hover:underline"
                >
                  <span>उपयोग करने का सही तरीका (6 महत्वपूर्ण नियम) देखें</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
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
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl p-4 sm:p-6 overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
              aria-label="चित्र बंद करें"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeImageUrl}
              alt={currentGalleryItem.item.alt}
              className="max-h-[68vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-xl"
            />
            <div className="text-center mt-3 px-2">
              <span className="text-sm font-bold text-[#0F281B] block">
                {currentGalleryItem.title}
              </span>
              <span className="text-xs text-[#55695C] block mt-0.5">
                Kostak Healthcare Private Limited &bull; DAAD FREE Ayurvedic Antifungal Cream
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
