/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  Building,
  PhoneCall,
  Package,
} from 'lucide-react';
import { SiteConfig } from '../config';

interface ProductInformationProps {
  config: SiteConfig;
}

export const ProductInformation: React.FC<ProductInformationProps> = ({ config }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'manufacturer' | 'precautions' | 'support'>('details');

  return (
    <section id="info" className="py-12 sm:py-16 md:py-20 bg-white border-t border-[#E3EDE6] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1C8A4E]">
            सत्यापित विनिर्देश व उत्पाद विवरण
          </span>
          <h2 className="font-clamp-title font-bold text-[#0F281B] mt-2 font-serif-title break-words">
            महत्वपूर्ण उत्पाद जानकारी
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#4E6255] max-w-2xl mx-auto break-words">
            DAAD FREE आयुर्वेदिक एंटीफंगल क्रीम के विनिर्देश, उपलब्ध साइज़, निर्माण स्थल, सावधानियाँ एवं ग्राहक सहायता।
          </p>
        </div>

        {/* Tab Buttons - 4 Non-Formulation Tabs */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 p-1.5 bg-[#F2F7F4] rounded-2xl max-w-3xl mx-auto border border-[#E0ECE3] w-full">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'details'
                ? 'bg-[#0F281B] text-white shadow-xs'
                : 'text-[#3E5245] hover:text-[#0F281B] hover:bg-white/60'
            }`}
          >
            <Package className="w-4 h-4 shrink-0" />
            <span className="truncate">उत्पाद विवरण व साइज़</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('manufacturer')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'manufacturer'
                ? 'bg-[#0F281B] text-white shadow-xs'
                : 'text-[#3E5245] hover:text-[#0F281B] hover:bg-white/60'
            }`}
          >
            <Building className="w-4 h-4 shrink-0" />
            <span className="truncate">निर्माता व लाइसेंस</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('precautions')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'precautions'
                ? 'bg-[#0F281B] text-white shadow-xs'
                : 'text-[#3E5245] hover:text-[#0F281B] hover:bg-white/60'
            }`}
          >
            <Shield className="w-4 h-4 shrink-0" />
            <span className="truncate">सावधानियां</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('support')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-w-0 ${
              activeTab === 'support'
                ? 'bg-[#0F281B] text-white shadow-xs'
                : 'text-[#3E5245] hover:text-[#0F281B] hover:bg-white/60'
            }`}
          >
            <PhoneCall className="w-4 h-4 shrink-0" />
            <span className="truncate">ग्राहक सहायता</span>
          </button>
        </div>

        {/* Tab Content Box */}
        <div className="bg-[#FAF8F5] rounded-3xl p-5 sm:p-8 md:p-10 border border-[#E3EDE6] shadow-xs max-w-4xl mx-auto w-full">
          
          {/* TAB 1: PRODUCT DETAILS & AVAILABLE SIZES */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="border-b border-[#E3EDE6] pb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#0F281B] font-serif-title">
                  उत्पाद विनिर्देश एवं उपलब्ध साइज़
                </h3>
                <p className="text-xs sm:text-sm text-[#526658] mt-1">
                  KOSTAK Healthcare द्वारा निर्मित प्रामाणिक आयुर्वेदिक एंटीफंगल क्रीम
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6]">
                  <span className="text-xs text-[#5C6E62] block">उत्पाद का नाम</span>
                  <span className="text-sm font-bold text-[#0F281B] block mt-0.5">{config.productName}</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6]">
                  <span className="text-xs text-[#5C6E62] block">उपलब्ध साइज़ (Net Weight)</span>
                  <span className="text-sm font-bold text-[#0F281B] block mt-0.5">25 ग्राम (मानक जार) एवं 15 ग्राम (कॉम्पैक्ट जार)</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6]">
                  <span className="text-xs text-[#5C6E62] block">औषधि श्रेणी व स्वरूप</span>
                  <span className="text-sm font-bold text-[#0F281B] block mt-0.5">आयुर्वेदिक एंटीफंगल क्रीम (बाहरी त्वचा पर लेप)</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6]">
                  <span className="text-xs text-[#5C6E62] block">उपयोग अवधि (Shelf Life)</span>
                  <span className="text-sm font-bold text-[#0F281B] block mt-0.5">{config.contact.expiryPeriod}</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6]">
                  <span className="text-xs text-[#5C6E62] block">बैच संख्या (Batch No)</span>
                  <span className="text-sm font-bold text-[#0F281B] block mt-0.5">{config.contact.batchNo}</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6]">
                  <span className="text-xs text-[#5C6E62] block">उपलब्ध पैक विकल्प</span>
                  <span className="text-sm font-bold text-[#0F281B] block mt-0.5">1 जार (मानक), 2 जार पैक, 4 जार पारिवारिक पैक</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANUFACTURER & LICENSING */}
          {activeTab === 'manufacturer' && (
            <div className="space-y-6">
              <div className="border-b border-[#E3EDE6] pb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#0F281B] font-serif-title">
                  मार्केटेड एवं मैन्युफैक्चर्ड बाय (निर्माता विवरण)
                </h3>
                <p className="text-xs sm:text-sm text-[#526658] mt-1">
                  कंपनी पंजीकरण, फैक्ट्री का पता एवं राज्य आयुष औषधि लाइसेंस
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6] flex flex-col sm:flex-row justify-between sm:items-center gap-1.5">
                  <span className="font-bold text-[#0F281B]">कंपनी का नाम:</span>
                  <span className="font-extrabold text-[#1C8A4E]">{config.companyFullName}</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6] flex flex-col sm:flex-row justify-between sm:items-center gap-1.5">
                  <span className="font-bold text-[#0F281B]">पंजीकृत कार्यालय:</span>
                  <span className="text-[#3E5245]">{config.contact.officeAddress}</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6] flex flex-col sm:flex-row justify-between sm:items-center gap-1.5">
                  <span className="font-bold text-[#0F281B]">फैक्ट्री / विनिर्माण स्थल:</span>
                  <span className="text-[#3E5245]">{config.contact.mfgAddress}</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6] flex flex-col sm:flex-row justify-between sm:items-center gap-1.5">
                  <span className="font-bold text-[#0F281B]">आयुर्वेदिक औषधि लाइसेंस नं.:</span>
                  <span className="font-mono font-bold text-[#0F281B] bg-[#F2F7F4] px-2.5 py-1 rounded-md border border-[#E0ECE3]">
                    {config.contact.ayurvedicLicenseNo}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRECAUTIONS */}
          {activeTab === 'precautions' && (
            <div className="space-y-6">
              <div className="border-b border-[#E3EDE6] pb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#0F281B] font-serif-title">
                  आवश्यक सावधानियाँ (Precautions)
                </h3>
                <p className="text-xs sm:text-sm text-[#526658] mt-1">
                  सुरक्षित और प्रभावी उपयोग हेतु इन सावधानियों का पालन करें
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#FFF6F4] border border-[#F5C7BC] text-xs sm:text-sm text-[#8A2B15] space-y-1">
                  <span className="font-bold text-sm block">7 दिनों का अनिवार्य संक्रमण नियम:</span>
                  <p className="leading-relaxed">
                    यदि आप पहले से कोई अन्य एलोपैथिक या रासायनिक एंटीफंगल क्रीम उपयोग कर रहे हैं, तो उसे बंद करके कम से कम 07 दिन बाद ही DAAD FREE क्रीम लगाना शुरू करें।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6] space-y-2 text-xs sm:text-sm text-[#3E5245]">
                  <ul className="space-y-2 list-disc pl-5 leading-relaxed">
                    <li>केवल बाहरी त्वचा पर लगाने के लिए (For external topical use only)।</li>
                    <li>दवाई को आँखों और कोमल अंगों के संपर्क में बिल्कुल न आने दें।</li>
                    <li>क्रीम लगाने के तुरंत बाद अपने हाथों को साबुन व पानी से अच्छी तरह धो लें।</li>
                    <li>सीधे धूप से दूर, ठंडी व सूखी जगह पर रखें और ढक्कन कसकर बंद रखें।</li>
                    <li>बच्चों की पहुँच से हमेशा सुरक्षित दूरी पर रखें।</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMER SUPPORT */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="border-b border-[#E3EDE6] pb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#0F281B] font-serif-title">
                  ग्राहक सहायता एवं संपर्क (Customer Support)
                </h3>
                <p className="text-xs sm:text-sm text-[#526658] mt-1">
                  ऑर्डर, डिलीवरी और उत्पाद संबंधी किसी भी सहायता हेतु हमसे सीधे संपर्क करें
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6]">
                  <span className="text-xs text-[#5C6E62] block">WhatsApp एवं फोन हेल्पलाइन</span>
                  <a href={`tel:+91${config.contact.phone}`} className="text-sm font-bold text-[#1C8A4E] hover:underline block mt-0.5">
                    +91 {config.contact.phone}
                  </a>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6]">
                  <span className="text-xs text-[#5C6E62] block">ईमेल सहायता</span>
                  <a href={`mailto:${config.contact.email}`} className="text-sm font-bold text-[#1C8A4E] hover:underline block mt-0.5 break-all">
                    {config.contact.email}
                  </a>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6] sm:col-span-2">
                  <span className="text-xs text-[#5C6E62] block">सहायता समय</span>
                  <span className="text-sm font-semibold text-[#0F281B] block mt-0.5">{config.contact.supportHours}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
