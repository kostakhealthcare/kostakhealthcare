/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileText,
  Compass,
  AlertCircle,
  Building,
  Check,
  Package,
  Layers,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { SiteConfig } from '../config';

interface ProductInformationProps {
  config: SiteConfig;
}

export const ProductInformation: React.FC<ProductInformationProps> = ({ config }) => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'usage' | 'safety' | 'manufacturer'>('ingredients');

  return (
    <section id="product" className="py-16 md:py-24 bg-[#FAF7F0] border-t border-[#E8E1D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#235E37]">
            Verified Product Specification
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#112418] mt-2 font-serif-title">
            Authentic Label Formulation &amp; Directions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4E6255] leading-relaxed">
            All details below are transcribed directly from the genuine packaging jar of{' '}
            <strong>DAAD FREE Ayurvedic Antifungal Cream</strong> manufactured by Kostak Healthcare.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 p-1.5 bg-[#EFE8D8] rounded-2xl max-w-2xl mx-auto border border-[#E0D7C3]">
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'ingredients'
                ? 'bg-white text-[#112418] shadow-sm'
                : 'text-[#485E50] hover:text-[#112418] hover:bg-white/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#235E37]" />
            <span>Label Ingredients</span>
          </button>
          
          <button
            onClick={() => setActiveTab('usage')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'usage'
                ? 'bg-white text-[#112418] shadow-sm'
                : 'text-[#485E50] hover:text-[#112418] hover:bg-white/50'
            }`}
          >
            <Compass className="w-4 h-4 text-[#235E37]" />
            <span>उपयोग के तरीके (Directions)</span>
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'safety'
                ? 'bg-white text-[#112418] shadow-sm'
                : 'text-[#485E50] hover:text-[#112418] hover:bg-white/50'
            }`}
          >
            <AlertCircle className="w-4 h-4 text-[#235E37]" />
            <span>सावधानियां (Precautions)</span>
          </button>

          <button
            onClick={() => setActiveTab('manufacturer')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'manufacturer'
                ? 'bg-white text-[#112418] shadow-sm'
                : 'text-[#485E50] hover:text-[#112418] hover:bg-white/50'
            }`}
          >
            <Building className="w-4 h-4 text-[#235E37]" />
            <span>Licensing &amp; Addresses</span>
          </button>
        </div>

        {/* Tab Content Cards */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E3D5] shadow-xs max-w-4xl mx-auto">
          
          {/* TAB 1: EXACT INGREDIENTS FROM JAR LABEL */}
          {activeTab === 'ingredients' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#EAE3D4]">
                <div>
                  <h3 className="text-xl font-bold text-[#112418] font-serif-title">
                    Verified Formulation Ingredients
                  </h3>
                  <p className="text-xs text-[#526658] mt-1">
                    Directly from jar label &bull; Mfg. Lic. No.: {config.contact.ayurvedicLicenseNo}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#1F5433] bg-[#EAF4EE] px-3 py-1 rounded-full border border-[#BED9C6]">
                  100% Ayurvedic Proprietary Medicine
                </span>
              </div>

              {/* Ingredients Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#E7E0D2] text-[#14291B]">
                      <th className="py-3 px-4 font-bold">Active Ayurvedic Ingredient</th>
                      <th className="py-3 px-4 font-bold text-center">Concentration</th>
                      <th className="py-3 px-4 font-bold">Therapeutic Action on Fungal Irritation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE9DD] text-[#364A3E]">
                    {config.ingredients.map((ing, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]/50">
                        <td className="py-3.5 px-4 font-semibold text-[#14291B]">
                          {ing.name}
                        </td>
                        <td className="py-3.5 px-4 font-extrabold text-[#1B5230] text-center bg-[#F3F8F5]">
                          {ing.percentage}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#4F6456]">
                          {ing.role}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Packaging Label Preview callout */}
              <div className="mt-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D3] flex flex-col sm:flex-row items-center gap-4">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-16_at_6.14.44_PM_c6612cd6.jpeg"
                  alt="Packaging label verified details"
                  className="w-32 h-24 object-contain rounded-xl bg-white border border-[#E0D7C3] shrink-0"
                />
                <div className="text-xs text-[#4E6254] leading-relaxed">
                  <span className="font-bold text-[#14291B] block mb-1">
                    Genuine Jar Label Verification
                  </span>
                  High concentration 49% Alba Bark extract forms the core antifungal phytotherapeutic action, supported by natural Aloe Vera gel and Curcuma Longa for instant skin soothing and itch suppression.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DIRECTIONS FOR USE */}
          {activeTab === 'usage' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#112418] font-serif-title">
                  निर्देश एवं उपयोग के तरीके (Directions for Use)
                </h3>
                <p className="mt-1 text-sm text-[#435749]">
                  As officially printed on the back of the DAAD FREE jar:
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F9F6EF] border border-[#EBE3D3]">
                  <span className="w-7 h-7 rounded-full bg-[#1C5331] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#112418]">Clean &amp; Dry Skin</h4>
                    <p className="text-xs text-[#4D6254] mt-0.5">
                      प्रभावित त्वचा को हल्के गुनगुने पानी और सौम्य साबुन से धोकर सूखे साफ कपड़े से अच्छी तरह सुखा लें।
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F9F6EF] border border-[#EBE3D3]">
                  <span className="w-7 h-7 rounded-full bg-[#1C5331] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#112418]">Thin Layer Application</h4>
                    <p className="text-xs text-[#4D6254] mt-0.5">
                      दाद, खाज या खुजली वाले स्थान पर DAAD FREE क्रीम की एक पतली परत हल्के हाथों से लगाएं।
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F9F6EF] border border-[#EBE3D3]">
                  <span className="w-7 h-7 rounded-full bg-[#1C5331] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#112418]">Apply Twice Daily</h4>
                    <p className="text-xs text-[#4D6254] mt-0.5">
                      क्रीम को दिन में 2 बार (सुबह एवं रात को सोने से पहले) नियमित रूप से लगाएं।
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F9F6EF] border border-[#EBE3D3]">
                  <span className="w-7 h-7 rounded-full bg-[#1C5331] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#112418]">Wash Hands Thoroughly</h4>
                    <p className="text-xs text-[#4D6254] mt-0.5">
                      दवाई लगाने के बाद हाथों को साबुन से अच्छी तरह धो लें ताकि संक्रमण अन्य हिस्सों में न फैले।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SAFETY PRECAUTIONS & 7-DAY RULE */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#112418] font-serif-title">
                  सावधानियां (Important Safety Precautions)
                </h3>
                <p className="mt-1 text-sm text-[#435749]">
                  Strict cautions printed directly on the product label:
                </p>
              </div>

              {/* Crucial 7-Day rule callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF6F0] border-2 border-[#F5C7B4] flex items-start gap-3">
                <ShieldAlert className="w-6 h-6 text-[#C9381A] shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs text-[#5C2B20]">
                  <span className="font-extrabold text-sm text-[#A8250A] block">
                    महत्वपूर्ण निर्देश (7-Day Antifungal Transition Rule):
                  </span>
                  <p className="font-semibold leading-relaxed">
                    &ldquo;अगर कोई Antifungal दवाई या अन्य क्रीम आप पहले से इस्तेमाल कर रहे हैं तो उसे बंद करके कम से कम 07 दिन बाद ही DAAD FREE क्रीम लगाना शुरू करें।&rdquo;
                  </p>
                  <p className="text-[11px] text-[#7A3E31]">
                    This allows previously applied harsh steroids or synthetic compounds to clear from the skin tissue, preventing cross-chemical reactions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#E7DFCF] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#14291B]">
                    General Cautions
                  </h4>
                  <ul className="text-xs text-[#435749] space-y-1.5 list-disc pl-4">
                    <li>बच्चों की पहुँच से दूर रखें (Keep out of reach of children).</li>
                    <li>दवाई को आँखों में न लगने दें (Avoid contact with eyes).</li>
                    <li>For external topical use only (केवल बाहरी उपयोग हेतु).</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#E7DFCF] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#14291B]">
                    Storage &amp; Shelf Life
                  </h4>
                  <ul className="text-xs text-[#435749] space-y-1.5 list-disc pl-4">
                    <li>Storage: Dry place away from direct sunlight.</li>
                    <li>Batch No: {config.contact.batchNo}</li>
                    <li>Expiry Period: {config.contact.expiryPeriod}</li>
                    <li>Keep jar lid tightly screwed after every application.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MANUFACTURER, LICENSING & ADDRESS */}
          {activeTab === 'manufacturer' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#112418] font-serif-title">
                  Marketed &amp; Manufactured by
                </h3>
                <p className="mt-1 text-sm text-[#435749]">
                  Verified company registration and manufacturing addresses:
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#36493D]">
                <div className="p-4 rounded-2xl bg-[#F9F6EF] border border-[#EAE2D2] flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <span className="font-bold text-[#112418]">Company Name:</span>
                  <span className="font-extrabold text-[#194E2C]">{config.companyFullName}</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#F9F6EF] border border-[#EAE2D2] flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <span className="font-bold text-[#112418]">Office Address:</span>
                  <span className="text-right text-xs">{config.contact.officeAddress}</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#F9F6EF] border border-[#EAE2D2] flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <span className="font-bold text-[#112418]">Mfg. Address:</span>
                  <span className="text-right text-xs">{config.contact.mfgAddress}</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#F9F6EF] border border-[#EAE2D2] flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <span className="font-bold text-[#112418]">Mfg. Lic. No.:</span>
                  <span className="font-mono font-bold text-[#194E2C]">{config.contact.ayurvedicLicenseNo}</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#F9F6EF] border border-[#EAE2D2] flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <span className="font-bold text-[#112418]">Customer Support Contact:</span>
                  <span className="font-bold text-[#194E2C]">
                    +91 {config.contact.phone} (WhatsApp &amp; Voice)
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
