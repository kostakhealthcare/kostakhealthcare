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
} from 'lucide-react';
import { SiteConfig } from '../config';

interface ProductInformationProps {
  config: SiteConfig;
}

export const ProductInformation: React.FC<ProductInformationProps> = ({ config }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'usage' | 'safety' | 'manufacturer'>('overview');

  return (
    <section id="product" className="py-16 md:py-24 bg-[#FAF7F0] border-t border-[#E8E1D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#235E37]">
            Verified Product Specification
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#112418] mt-2 font-serif-title">
            Authentic Product Information & Details
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4E6255] leading-relaxed">
            All details below are based on genuine packaging and Ayurvedic proprietary documentation.
            We provide clear, honest information without fabricated claims.
          </p>
        </div>

        {/* Tab Buttons (Accessible Segmented Controls) */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 p-1.5 bg-[#EFE8D8] rounded-2xl max-w-2xl mx-auto border border-[#E0D7C3]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-white text-[#112418] shadow-sm'
                : 'text-[#485E50] hover:text-[#112418] hover:bg-white/50'
            }`}
          >
            <FileText className="w-4 h-4 text-[#235E37]" />
            <span>Overview & Action</span>
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
            <span>Directions for Use</span>
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
            <span>Storage & Safety</span>
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
            <span>Packaging & Licensing</span>
          </button>
        </div>

        {/* Tab Content Cards */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E3D5] shadow-xs max-w-4xl mx-auto">
          
          {/* TAB 1: OVERVIEW & INDICATIONS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#112418] flex items-center gap-2 font-serif-title">
                  <span>Targeted Topical Herbal Care</span>
                </h3>
                <p className="mt-2 text-sm text-[#435749] leading-relaxed">
                  <strong>DAAD FREE Ayurvedic Antifungal Cream</strong> is formulated by <strong>KOSTAK Healthcare</strong> to provide targeted soothing relief from skin discomfort associated with fungal irritations, ringworm (daad), fungal itching, and superficial skin scaling.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#E8E1D2]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#235E37] flex items-center gap-1.5 mb-2">
                    <Check className="w-4 h-4" />
                    Key Herbal Profile
                  </h4>
                  <p className="text-xs text-[#485D4F] leading-relaxed">
                    Crafted with classical skin-purifying Ayurvedic botanical actives traditionally valued for their antimicrobial and cooling actions (including Neem extracts, Gandhak / Purified Sulphur, and natural soothing botanical base). Please refer to the genuine packaging carton for full component proportions.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#E8E1D2]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#235E37] flex items-center gap-1.5 mb-2">
                    <Package className="w-4 h-4" />
                    Pack Details & Form
                  </h4>
                  <ul className="text-xs text-[#485D4F] space-y-1.5">
                    <li>&bull; <strong>Net Quantity:</strong> {config.packSize} (25 grams)</li>
                    <li>&bull; <strong>Dosage Form:</strong> Smooth topical cream in sealed aluminum/laminate tube</li>
                    <li>&bull; <strong>Fragrance & Color:</strong> Natural botanical aroma; no artificial food coloring</li>
                  </ul>
                </div>
              </div>

              <div className="text-xs text-[#5C7063] bg-[#F2EDE2] p-4 rounded-xl border border-[#DFD6C3] leading-relaxed">
                <strong>Legal & Regulatory Notice:</strong> DAAD FREE is an Ayurvedic Proprietary Medicine intended strictly for topical soothing relief. It is not advertised as a guaranteed overnight miracle or universal cure for unrelated dermatological conditions.
              </div>
            </div>
          )}

          {/* TAB 2: DIRECTIONS FOR USE */}
          {activeTab === 'usage' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#112418] font-serif-title">
                  Verified Manufacturer Directions for Use
                </h3>
                <p className="mt-2 text-sm text-[#435749] leading-relaxed">
                  For optimal hygiene and comfort, follow these standard manufacturer directions:
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F9F6EF] border border-[#EBE3D3]">
                  <span className="w-6 h-6 rounded-full bg-[#1C5331] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#112418]">Cleanse the Area</h4>
                    <p className="text-xs text-[#4D6254] mt-0.5">
                      Wash the affected skin gently with mild soap and lukewarm water. Avoid scrubbing aggressively.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F9F6EF] border border-[#EBE3D3]">
                  <span className="w-6 h-6 rounded-full bg-[#1C5331] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#112418]">Pat Dry Thoroughly</h4>
                    <p className="text-xs text-[#4D6254] mt-0.5">
                      Gently dry the area with a dedicated, clean towel. Keep moisture low, as fungal organisms thrive in damp environments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F9F6EF] border border-[#EBE3D3]">
                  <span className="w-6 h-6 rounded-full bg-[#1C5331] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#112418]">Apply a Thin Film</h4>
                    <p className="text-xs text-[#4D6254] mt-0.5">
                      Dispense a small amount of DAAD FREE cream and gently spread a thin layer over the affected area and slightly beyond its borders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F9F6EF] border border-[#EBE3D3]">
                  <span className="w-6 h-6 rounded-full bg-[#1C5331] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#112418]">Frequency of Application</h4>
                    <p className="text-xs text-[#4D6254] mt-0.5">
                      Apply 2 times daily (typically morning and evening), or as instructed by your Ayurvedic healthcare consultant. Wash hands thoroughly after application.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STORAGE & SAFETY */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#112418] font-serif-title">
                  Storage, Cautions & Safety Guidelines
                </h3>
                <p className="mt-2 text-sm text-[#435749] leading-relaxed">
                  Proper storage preserves the natural therapeutic properties of the Ayurvedic botanicals:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#F8F5ED] border border-[#E5DEC] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C5331]">
                    Storage Recommendations
                  </h4>
                  <ul className="text-xs text-[#44594A] space-y-1">
                    <li>&bull; Store below 25&deg;C in a cool, dry place.</li>
                    <li>&bull; Protect from direct heat, freezing, and sunlight.</li>
                    <li>&bull; Keep cap tightly closed after every use.</li>
                    <li>&bull; Do not use if protective nozzle seal is broken prior to first use.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF6F3] border border-[#F4DDD5] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#A53826]">
                    Important Safety Precautions
                  </h4>
                  <ul className="text-xs text-[#5E3A32] space-y-1">
                    <li>&bull; <strong>For External Topical Use Only.</strong> Not for ingestion.</li>
                    <li>&bull; Avoid contact with eyes, nostrils, mouth, or mucous membranes.</li>
                    <li>&bull; In case of accidental eye contact, rinse immediately with clean water.</li>
                    <li>&bull; Discontinue use and consult a physician if excessive irritation or hypersensitivity develops.</li>
                    <li>&bull; Keep strictly out of the reach of children.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MANUFACTURER & LICENSING */}
          {activeTab === 'manufacturer' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#112418] font-serif-title">
                  Manufacturing, Brand & Licensing Details
                </h3>
                <p className="mt-2 text-sm text-[#435749] leading-relaxed">
                  Only authentic details as shown on the genuine packaging:
                </p>
              </div>

              <div className="space-y-3 text-xs text-[#36493D]">
                <div className="p-3.5 rounded-xl bg-[#F9F6EF] border border-[#EAE2D2] flex justify-between items-center">
                  <span className="font-semibold text-[#112418]">Brand Owner / Marketer:</span>
                  <span className="font-bold text-[#1A452B]">{config.brandName}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F9F6EF] border border-[#EAE2D2] flex justify-between items-center">
                  <span className="font-semibold text-[#112418]">Ayurvedic Product Category:</span>
                  <span>Ayurvedic Proprietary Medicine (Topical Ointment/Cream)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F9F6EF] border border-[#EAE2D2] flex justify-between items-center">
                  <span className="font-semibold text-[#112418]">Packaging Pack Size:</span>
                  <span>{config.packSize} (25 grams net content)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F9F6EF] border border-[#EAE2D2] flex justify-between items-center">
                  <span className="font-semibold text-[#112418]">Batch & License Number:</span>
                  <span>Printed on the base of carton box and tube crimp</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F9F6EF] border border-[#EAE2D2] flex justify-between items-center">
                  <span className="font-semibold text-[#112418]">Contact Email:</span>
                  <a href={`mailto:${config.contact.email}`} className="text-[#1C5331] font-medium underline">
                    {config.contact.email}
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
