/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Sparkles,
  Droplets,
  Clock,
  HandMetal,
  ShieldAlert,
  SunMedium,
  CheckCircle,
} from 'lucide-react';
import { SiteConfig } from '../config';

interface UsageDirectionsProps {
  config: SiteConfig;
}

export const UsageDirections: React.FC<UsageDirectionsProps> = () => {
  const instructions = [
    {
      step: "01",
      title: "त्वचा की सफाई व सुखाना",
      subtitle: "गुनगुने पानी से तैयारी",
      description: "प्रभावित त्वचा को हल्के गुनगुने पानी से साफ करके साफ व सूखे सूती कपड़े से अच्छी तरह सुखा लें।",
      icon: Droplets,
      badge: "प्राथमिक चरण",
    },
    {
      step: "02",
      title: "पतली परत का लेप लगाना",
      subtitle: "हल्के हाथों से प्रयोग",
      description: "दाद, खाज या खुजली वाले स्थान पर DAAD FREE क्रीम की एक पतली परत हल्के हाथों से समान रूप से लगाएं।",
      icon: Sparkles,
      badge: "सही मात्रा",
    },
    {
      step: "03",
      title: "दिन में 2 बार नियमित उपयोग",
      subtitle: "सुबह और रात का नियम",
      description: "क्रीम को दिन में 2 बार (सुबह स्नान के पश्चात एवं रात को सोने से पहले) नियमित रूप से लगाएं।",
      icon: Clock,
      badge: "दैनिक क्रम",
    },
    {
      step: "04",
      title: "हाथों को साबुन से धोना",
      subtitle: "संक्रमण नियंत्रण",
      description: "दवाई लगाने के तुरंत बाद अपने हाथों को साबुन व पानी से अच्छी तरह धो लें ताकि संक्रमण अन्य अंगों में न फैले।",
      icon: HandMetal,
      badge: "स्वच्छता नियम",
    },
    {
      step: "05",
      title: "7 दिनों का विशेष नियम",
      subtitle: "अति आवश्यक सावधानी",
      description: "यदि आप पहले से कोई अन्य एलोपैथिक या फंगल क्रीम लगा रहे हैं, तो उसे बंद करके कम से कम 07 दिन बाद ही DAAD FREE लगाना शुरू करें।",
      icon: ShieldAlert,
      badge: "महत्वपूर्ण निर्देश",
      highlight: true,
    },
    {
      step: "06",
      title: "उचित भंडारण व सुरक्षा",
      subtitle: "सुरक्षित रखरखाव",
      description: "सीधे धूप से दूर ठंडी व सूखी जगह पर रखें। ढक्कन कसकर बंद रखें और बच्चों की पहुँच से हमेशा दूर रखें। केवल बाहरी उपयोग हेतु।",
      icon: SunMedium,
      badge: "सुरक्षित भंडारण",
    },
  ];

  return (
    <section id="usage" className="py-12 sm:py-16 md:py-20 bg-[#F2F7F4] border-t border-[#E3EDE6] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1C8A4E]">
            उत्पाद लेबल अनुसार प्रमाणित विधि
          </span>
          <h2 className="font-clamp-title font-bold text-[#0F281B] mt-2 font-serif-title break-words">
            उपयोग करने का सही तरीका
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#4E6255] max-w-2xl mx-auto break-words">
            DAAD FREE आयुर्वेदिक एंटीफंगल क्रीम के सुरक्षित और सर्वोत्तम परिणाम प्राप्त करने हेतु उत्पाद जार पर मुद्रित 6 आवश्यक नियम
          </p>
        </div>

        {/* Six Responsive Instruction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {instructions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-5 sm:p-6 rounded-3xl transition-all flex flex-col justify-between border ${
                  item.highlight
                    ? 'bg-white border-[#F0A898] shadow-sm ring-1 ring-[#F0A898]/40'
                    : 'bg-white border-[#E3EDE6] hover:border-[#1C8A4E] shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      item.highlight
                        ? 'bg-[#FDF2F0] text-[#B83820]'
                        : 'bg-[#E8F2EC] text-[#0F281B]'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                      item.highlight
                        ? 'bg-[#FDF2F0] text-[#B83820] border border-[#F5C7BC]'
                        : 'bg-[#F2F7F4] text-[#1C8A4E] border border-[#E0ECE3]'
                    }`}>
                      नियम {item.step}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0F281B] font-serif-title break-words">
                    {item.title}
                  </h3>
                  <div className={`text-xs font-semibold mt-1 mb-2.5 ${
                    item.highlight ? 'text-[#B83820]' : 'text-[#1C8A4E]'
                  }`}>
                    {item.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4E6254] leading-relaxed break-words">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-[#E3EDE6] flex items-center justify-between text-xs text-[#55695C]">
                  <span className="font-medium">{item.badge}</span>
                  <CheckCircle className={`w-4 h-4 ${item.highlight ? 'text-[#B83820]' : 'text-[#1C8A4E]'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Callout for Transition Caution */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-white border border-[#E3EDE6] text-center max-w-3xl mx-auto shadow-xs">
          <p className="text-xs sm:text-sm text-[#0F281B] font-semibold leading-relaxed">
            नोट: यदि आप पहले से कोई एंटीफंगल क्रीम उपयोग कर रहे हैं तो त्वचा को सामान्य होने देने के लिए 7 दिनों का अंतर रखना अनिवार्य है।
          </p>
        </div>

      </div>
    </section>
  );
};
