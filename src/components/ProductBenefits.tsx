/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Activity,
  HeartHandshake,
  CheckCircle2,
  BugOff,
  Sparkles,
} from 'lucide-react';
import { SiteConfig } from '../config';

interface ProductBenefitsProps {
  config: SiteConfig;
}

export const ProductBenefits: React.FC<ProductBenefitsProps> = () => {
  const benefits = [
    {
      title: "पहले ही दिन से खुजली में राहत",
      subtitle: "तीव्र खुजली व जलन में तुरंत शांति",
      description:
        "विशेष शीतलक प्रभाव त्वचा की असहनीय जलन, चुभन और खुजली को पहले ही दिन से शांत करने में मदद करता है।",
      icon: Activity,
    },
    {
      title: "दाद और फंगस का जड़ से उपचार",
      subtitle: "जिद्दी रिंगवर्म का प्रभावी समाधान",
      description:
        "त्वचा के फंगल संक्रमण की जड़ों पर प्रभावी प्रहार करता है और चकत्तों व काले निशानों को साफ करने में सहायक है।",
      icon: BugOff,
    },
    {
      title: "त्वचा संक्रमण का फैलाव रोके",
      subtitle: "प्राकृतिक एंटी-माइक्रोबियल सुरक्षा",
      description:
        "त्वचा पर एक सुरक्षित रोगाणुरोधी रक्षा कवच बनाता है, जिससे संक्रमण शरीर के अन्य हिस्सों में नहीं फैलता।",
      icon: Sparkles,
    },
    {
      title: "त्वचा के अनुकूल व स्टेरॉयड-मुक्त",
      subtitle: "त्वचा को कोमल व स्वस्थ बनाए रखे",
      description:
        "त्वचा को गहराई से नमी प्रदान कर बिना किसी दुष्प्रभाव या जलन के रूखेपन व पपड़ी को दूर करता है।",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="benefits" className="py-12 sm:py-16 md:py-20 bg-white border-t border-[#E3EDE6] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1C8A4E]">
            दाद का दिव्यास्त्र &bull; प्रमाणित लाभ
          </span>
          <h2 className="font-clamp-title font-bold text-[#0F281B] mt-2 font-serif-title break-words">
            दाद, खाज और खुजली से संपूर्ण व प्राकृतिक राहत
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#4E6255] max-w-2xl mx-auto break-words">
            पारंपरिक आयुर्वेदिक संहिताओं और वनौषधियों के गहन अनुभव से तैयार, बिना किसी स्टेरॉयड या हानिकारक रसायन के।
          </p>
        </div>

        {/* Benefits Grid - Leebord Inspired Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-[#FAF8F5] border border-[#E3EDE6] hover:border-[#1C8A4E] hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F2EC] text-[#0F281B] flex items-center justify-center mb-4 transition-colors group-hover:bg-[#0F281B] group-hover:text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F281B] font-serif-title break-words">
                    {b.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#1C8A4E] mt-1 mb-2.5 break-words">
                    {b.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4E6254] leading-relaxed break-words">
                    {b.description}
                  </p>
                </div>
                <div className="mt-4 pt-3.5 border-t border-[#E3EDE6] flex items-center gap-1.5 text-xs font-semibold text-[#0F281B]">
                  <CheckCircle2 className="w-4 h-4 text-[#1C8A4E] shrink-0" />
                  <span>सत्यापित आयुर्वेदिक क्रिया</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Infographics Display (Post 1 & Post 2 from packaging) */}
        <div className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-[#E3EDE6]">
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C8A4E]">
              उत्पाद जानकारी एवं लक्षण
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F281B] font-serif-title mt-1.5 break-words">
              DAAD FREE किन लक्षणों में असरदार है
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
            {/* Post 1 Banner */}
            <div className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#E3EDE6] shadow-xs flex flex-col justify-between">
              <div className="aspect-[4/5] overflow-hidden bg-white flex items-center justify-center p-3">
                <img
                  src="/assets/aistudio/Post1.jpg_6034f5d5.jpeg"
                  alt="DAAD FREE - दाद खाज खुजली की असरदार दवाई"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-center border-t border-[#E3EDE6] bg-white">
                <h4 className="font-bold text-sm text-[#0F281B] break-words">
                  लक्षण: दाद, खाज, खुजली एवं फंगल इन्फेक्शन
                </h4>
                <p className="text-xs text-[#526658] mt-1 break-words">
                  पहले ही दिन से तीव्र खुजली में त्वरित आराम
                </p>
              </div>
            </div>

            {/* Post 2 Banner */}
            <div className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#E3EDE6] shadow-xs flex flex-col justify-between">
              <div className="aspect-[4/5] overflow-hidden bg-white flex items-center justify-center p-3">
                <img
                  src="/assets/aistudio/Post2.jpg_bef9deeb.jpeg"
                  alt="DAAD FREE - दाद का दिव्यास्त्र"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-center border-t border-[#E3EDE6] bg-white">
                <h4 className="font-bold text-sm text-[#0F281B] break-words">
                  Fight Skin Infection &bull; Kill Fungus &bull; Relieves Itching
                </h4>
                <p className="text-xs text-[#526658] mt-1 break-words">
                  दाद का दिव्यास्त्र - प्राकृतिक वनौषधियों का शक्तिशाली संगम
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
