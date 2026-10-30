/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ShieldAlert,
  Activity,
  Droplets,
  HeartHandshake,
  CheckCircle2,
  BugOff,
  Sparkles,
} from 'lucide-react';
import { SiteConfig } from '../config';

interface ProductBenefitsProps {
  config: SiteConfig;
}

export const ProductBenefits: React.FC<ProductBenefitsProps> = ({ config }) => {
  const benefits = [
    {
      title: "पहले ही दिन से खुजली में राहत",
      subtitle: "Relieves Itching from Day 1",
      description:
        "Fast-acting cooling herbal agents soothe intense irritation, prickling sensation, and burning discomfort on affected skin.",
      icon: Activity,
    },
    {
      title: "दाद का जड़ से उपचार",
      subtitle: "Targeted Ringworm (Daad) Eradication",
      description:
        "49% concentrated Alba Bark actively combats circular fungal colonies, helping clear scaling and ring borders.",
      icon: BugOff,
    },
    {
      title: "त्वचा संक्रमण से सुरक्षा",
      subtitle: "Fight Skin Fungal Infection",
      description:
        "Curcuma Longa (हल्दी) and Cocos Nucifera provide a natural antimicrobial defense barrier that prevents spreading.",
      icon: Sparkles,
    },
    {
      title: "प्राकृतिक एवं सुरक्षित",
      subtitle: "Gentle Herbal Botanical Base",
      description:
        "Enriched with 3% Aloe Vera gel for deep skin hydration, preventing dryness without harsh steroid chemicals.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="benefits" className="py-16 md:py-24 bg-white border-t border-[#EAE3D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#235E37]">
            दाद का दिव्यास्त्र
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#112418] mt-2 font-serif-title">
            दाद, खाज और खुजली से संपूर्ण राहत
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4E6255]">
            Classical Ayurvedic wisdom formulated specifically for stubborn fungal infections.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E9E2D4] hover:border-[#BED3C3] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E8EFEA] text-[#1F5433] flex items-center justify-center mb-4 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#12281B] font-serif-title">
                    {b.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-[#25633C] mb-2 uppercase tracking-wider">
                    {b.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4E6254] leading-relaxed">
                    {b.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAE2D2] flex items-center gap-1.5 text-[11px] font-semibold text-[#2A5C3C]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Ayurvedic Action</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Showcase of User's Actual Promotional Post Infographics */}
        <div className="mt-14 pt-12 border-t border-[#EAE2D2]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#235E37]">
              Product Infographics &amp; Indications
            </span>
            <h3 className="text-2xl font-bold text-[#14291B] font-serif-title mt-1">
              What DAAD FREE Is Formulated To Treat
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
            {/* Post 1 Banner */}
            <div className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#E7DECD] shadow-sm hover:shadow-md transition-all group">
              <div className="aspect-[4/5] overflow-hidden bg-white flex items-center justify-center p-2">
                <img
                  src="/assets/aistudio/Post1.jpg_6034f5d5.jpeg"
                  alt="DAAD FREE - दाद खाज खुजली की असरदार दवाई"
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center border-t border-[#E7DECD]">
                <h4 className="font-bold text-sm text-[#14291B]">
                  लक्षण: दाद, खाज, खुजली एवं फंगल इन्फेक्शन
                </h4>
                <p className="text-xs text-[#526658] mt-0.5">
                  पहले ही दिन से खुजली में त्वरित आराम
                </p>
              </div>
            </div>

            {/* Post 2 Banner */}
            <div className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#E7DECD] shadow-sm hover:shadow-md transition-all group">
              <div className="aspect-[4/5] overflow-hidden bg-white flex items-center justify-center p-2">
                <img
                  src="/assets/aistudio/Post2.jpg_bef9deeb.jpeg"
                  alt="DAAD FREE - दाद का दिव्यास्त्र"
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center border-t border-[#E7DECD]">
                <h4 className="font-bold text-sm text-[#14291B]">
                  Fight Skin Infection • Kill Fungus • Relieves Itching
                </h4>
                <p className="text-xs text-[#526658] mt-0.5">
                  दाद का दिव्यास्त्र - प्राकृतिक जड़ी-बूटियों का शक्तिशाली संगम
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Responsible Skincare & Transition Guidance */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-[#F8F5EE] border border-[#E0D7C4] max-w-4xl mx-auto flex items-start gap-4">
          <ShieldAlert className="w-5 h-5 text-[#8A5B15] shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs text-[#526457] leading-relaxed">
            <span className="font-bold text-[#2A3F30] block">
              Responsible Care &bull; Advertising Standard Compliance
            </span>
            <p>
              DAAD FREE is an authentic Ayurvedic Proprietary formulation created for localized topical application on fungal skin distress, ringworm, and fungal itching. It is not formulated to treat bacterial ulcers, systemic viral infections, or unrelated rashes.
            </p>
            <p className="text-[11px] text-[#697B6E]">
              Always adhere to the label advice: if switching from another antifungal cream, allow a 7-day interval before beginning DAAD FREE application.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
