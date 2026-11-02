/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Clock, MapPin, Truck, MessageSquare, ShieldCheck, PhoneCall, Building2 } from 'lucide-react';
import { SiteConfig } from '../config';

interface ContactAndShippingProps {
  config: SiteConfig;
  onOrderWhatsApp: () => void;
}

export const ContactAndShipping: React.FC<ContactAndShippingProps> = ({
  config,
  onOrderWhatsApp,
}) => {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white border-t border-[#E3EDE6] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1C8A4E]">
            सीधी ग्राहक सहायता
          </span>
          <h2 className="font-clamp-title font-bold text-[#0F281B] mt-2 font-serif-title break-words">
            {config.companyFullName || config.brandName} से संपर्क करें
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4E6255] break-words">
            उत्पाद पूछताछ, डिलीवरी स्थिति और ऑर्डर संबंधी हर सहायता के लिए हमारे आधिकारिक प्रतिनिधि से जुड़ें।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-5 sm:p-7 md:p-8 rounded-3xl border border-[#E3EDE6] space-y-5 sm:space-y-6 w-full shadow-xs">
            <h3 className="text-base sm:text-lg font-bold text-[#0F281B] font-serif-title break-words">
              आधिकारिक व्यावसायिक संपर्क
            </h3>

            <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm text-[#3E5244]">
              {/* Phone / Customer Support */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8F2EC] text-[#0F281B] flex items-center justify-center shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-semibold text-[#0F281B] block">ग्राहक सेवा एवं WhatsApp ऑर्डर</span>
                  <a
                    href={`tel:+91${config.contact.phone || '9131138853'}`}
                    className="text-[#1C8A4E] hover:underline font-bold break-words"
                  >
                    +91 {config.contact.phone || '9131138853'}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8F2EC] text-[#0F281B] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-semibold text-[#0F281B] block">ईमेल पूछताछ</span>
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="text-[#1C8A4E] hover:underline break-all"
                  >
                    {config.contact.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8F2EC] text-[#0F281B] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-semibold text-[#0F281B] block">कार्य समय</span>
                  <span className="break-words">{config.contact.supportHours}</span>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8F2EC] text-[#0F281B] flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-semibold text-[#0F281B] block">पंजीकृत कार्यालय पता</span>
                  <span className="text-xs text-[#526658] break-words">
                    {config.contact.officeAddress || '138/139 B, श्रीराम नगर, खजराना, इंदौर (म.प्र.) 452016'}
                  </span>
                </div>
              </div>

              {/* Mfg Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8F2EC] text-[#0F281B] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-semibold text-[#0F281B] block">फैक्ट्री / निर्माण स्थल</span>
                  <span className="text-xs text-[#526658] break-words">
                    {config.contact.mfgAddress || 'ग्राम पाल नगर, देवास (म.प्र.) 455001'}
                  </span>
                </div>
              </div>

              {/* Lic & Batch */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8F2EC] text-[#0F281B] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-semibold text-[#0F281B] block">आयुर्वेदिक औषधि निर्माण लाइसेंस</span>
                  <span className="text-xs text-[#0F281B] font-mono font-bold break-words">
                    {config.contact.ayurvedicLicenseNo}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOrderWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#0F281B] hover:bg-[#143524] active:scale-[0.99] text-white text-xs sm:text-sm font-bold transition-colors shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#88C498] fill-[#88C498] shrink-0" />
                <span className="truncate">WhatsApp पर संदेश भेजें (+91 {config.contact.phone})</span>
              </button>
            </div>
          </div>

          {/* Shipping & Delivery Details */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-5 sm:p-7 md:p-8 rounded-3xl border border-[#E3EDE6] space-y-5 sm:space-y-6 w-full shadow-xs">
            <h3 className="text-base sm:text-lg font-bold text-[#0F281B] font-serif-title flex items-center gap-2 break-words">
              <Truck className="w-5 h-5 text-[#1C8A4E] shrink-0" />
              <span>अखिल भारतीय तीव्र एक्सप्रेस डिलीवरी</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C8A4E] block mb-1">
                  डिस्पैच समय-सारणी
                </span>
                <p className="text-xs sm:text-sm text-[#435749] leading-relaxed break-words">
                  {config.shipping.dispatchTime}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E3EDE6]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C8A4E] block mb-1">
                  डिलीवरी अवधि
                </span>
                <p className="text-xs sm:text-sm text-[#435749] leading-relaxed break-words">
                  {config.shipping.deliveryTimeline}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F2F7F4] border border-[#DFEBE3] text-xs sm:text-sm text-[#3E5245] space-y-1.5">
              <span className="font-bold text-[#0F281B] block">कूरियर ट्रैकिंग एवं WhatsApp अपडेट्स</span>
              <p className="break-words">{config.shipping.chargesNote}</p>
              <p className="text-xs text-[#5C6E62] break-words">
                ऑर्डर बुक होते ही रियल-टाइम कूरियर ट्रैकिंग नंबर और लिंक सीधे आपके WhatsApp चैट पर भेज दिया जाएगा।
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center text-xs text-[#3D5244] pt-2">
              <div className="p-2.5 rounded-xl bg-white border border-[#E3EDE6] min-w-0">
                <span className="font-bold text-[#0F281B] block text-[11px] sm:text-xs truncate">सील-बंद जार</span>
                <span className="text-[10px] text-[#697D70] block truncate">सुरक्षित पैकेजिंग</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E3EDE6] min-w-0">
                <span className="font-bold text-[#0F281B] block text-[11px] sm:text-xs truncate">100% असली व शुद्ध</span>
                <span className="text-[10px] text-[#697D70] block truncate">सीधे निर्माता द्वारा</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E3EDE6] min-w-0">
                <span className="font-bold text-[#0F281B] block text-[11px] sm:text-xs truncate">हेल्पलाइन नंबर</span>
                <span className="text-[10px] text-[#697D70] block truncate">9131138853</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
