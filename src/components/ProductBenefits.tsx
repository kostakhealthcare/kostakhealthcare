/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ShieldAlert,
  Leaf,
  Activity,
  Droplets,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { SiteConfig } from '../config';

interface ProductBenefitsProps {
  config: SiteConfig;
}

export const ProductBenefits: React.FC<ProductBenefitsProps> = ({ config }) => {
  const benefits = [
    {
      title: "Ayurvedic Itch Relief",
      description:
        "Helps alleviate uncomfortable prickling, itching, and skin irritation caused by localized fungal distress.",
      icon: Activity,
    },
    {
      title: "Targeted Ringworm (Daad) Care",
      description:
        "Specifically formulated for topical skin application where fungal scaling and circular irritation (daad) appear.",
      icon: Leaf,
    },
    {
      title: "Cooling & Calming Skin Base",
      description:
        "Blended in a soothing topical base that absorbs smoothly without overly greasy residue or severe staining.",
      icon: Droplets,
    },
    {
      title: "Classical Purifying Botanical Extracts",
      description:
        "Enriched with traditional purifying herbs such as Neem and Gandhak, trusted in Ayurvedic texts for skin hygiene.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="benefits" className="py-16 md:py-24 bg-white border-t border-[#EAE3D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#235E37]">
            Balanced Ayurvedic Formulation
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#112418] mt-2 font-serif-title">
            Purposeful Care for Fungal Skin Irritation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4E6255]">
            Thoughtfully crafted by {config.brandName} according to authentic Ayurvedic principles.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E9E2D4] hover:border-[#BED3C3] hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#E8EFEA] text-[#1F5433] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#12281B] font-serif-title mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E6254] leading-relaxed">
                    {b.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAE2D2] flex items-center gap-1.5 text-[11px] font-medium text-[#2A5C3C]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ayurvedic Topical Care</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible Advertising / Regulatory Disclosure Box */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-[#F8F5EE] border border-[#E0D7C4] max-w-4xl mx-auto flex items-start gap-4">
          <ShieldAlert className="w-5 h-5 text-[#8A5B15] shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs text-[#526457] leading-relaxed">
            <span className="font-bold text-[#2A3F30] block">
              Responsible Skincare Transparency &bull; Advertising Standard Compliance
            </span>
            <p>
              Not all skin rashes or itching are caused by fungal infections. DAAD FREE is intended specifically for topical application on ringworm and fungal skin distress. It is not formulated to treat bacterial infections, viral rashes, allergies, or chronic systemic eczema.
            </p>
            <p className="text-[11px] text-[#697B6E]">
              We do not promise instant miracles or universal cures. Skin recovery timelines depend on hygiene practices, severity, and proper regular application. Consult a qualified Ayurvedic physician or dermatologist if symptoms persist.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
