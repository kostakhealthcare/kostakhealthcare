/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageSquare, ShieldCheck, Mail } from 'lucide-react';
import { SiteConfig } from '../config';
import { PolicyType } from './PolicyModal';

interface FooterProps {
  config: SiteConfig;
  onOpenPolicy: (type: PolicyType) => void;
  onOrderWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenPolicy,
  onOrderWhatsApp,
}) => {
  return (
    <footer className="bg-[#0A1C12] text-[#E0EBE2] border-t border-[#163824] pt-12 sm:pt-16 pb-8 sm:pb-12 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 sm:pb-12 border-b border-[#1E432D]">
          
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#143524] text-[#E8D4B0] flex items-center justify-center border border-[#2D5A42] shrink-0">
                <span className="font-serif font-bold text-lg">K</span>
              </div>
              <span className="font-brand font-bold text-base sm:text-lg tracking-wider text-white uppercase break-words">
                {config.brandName}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#A8BEAF] leading-relaxed max-w-sm break-words">
              प्रामाणिक आयुर्वेदिक उत्पाद प्रदाता। <strong>DAAD FREE आयुर्वेदिक एंटीफंगल क्रीम</strong> विशेष रूप से दाद, खाज, खुजली और जिद्दी फंगल त्वचा संक्रमण से प्राकृतिक राहत दिलाने के लिए शास्त्रीय विधि से निर्मित है।
            </p>

            <div className="pt-1">
              <button
                onClick={onOrderWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C8A4E] hover:bg-[#167440] active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp पर ऑर्डर करें</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#88C498] block">
              मुख्य नेविगेशन
            </span>
            <ul className="text-xs sm:text-sm space-y-2 text-[#C0D3C5]">
              <li><a href="#home" className="hover:text-white transition-colors">मुख्य पृष्ठ</a></li>
              <li><a href="#product" className="hover:text-white transition-colors">उत्पाद विवरण व साइज़</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">आयुर्वेदिक लाभ</a></li>
              <li><a href="#usage" className="hover:text-white transition-colors">उपयोग करने का सही तरीका</a></li>
              <li><a href="#info" className="hover:text-white transition-colors">महत्वपूर्ण जानकारी</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">सवाल-जवाब (FAQ)</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">संपर्क विवरण</a></li>
            </ul>
          </div>

          {/* Policies & Legal */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#88C498] block">
              नीतियां एवं नियम
            </span>
            <ul className="text-xs sm:text-sm space-y-2 text-[#C0D3C5]">
              <li>
                <button
                  onClick={() => onOpenPolicy('privacyPolicy')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  गोपनीयता नीति (Privacy Policy)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('termsAndConditions')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  नियम व शर्तें (Terms &amp; Conditions)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shippingPolicy')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  शिपिंग एवं डिलीवरी नीति
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('cancellationAndRefundPolicy')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  रद्दीकरण एवं वापसी नीति
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="space-y-3 text-xs sm:text-sm text-[#A8BEAF]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#88C498] block">
              संपर्क एवं सहायता
            </span>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#88C498] shrink-0" />
              <a href={`mailto:${config.contact.email}`} className="hover:text-white break-all">
                {config.contact.email}
              </a>
            </p>
            <p className="text-xs text-[#A2BBAA] break-words">
              फोन / WhatsApp: <a href="tel:+919131138853" className="text-white hover:underline font-bold">+91 {config.contact.phone || '9131138853'}</a>
            </p>
            <p className="text-xs text-[#869E8F] leading-relaxed break-words">
              समय: {config.contact.supportHours}
            </p>
            <p className="text-xs text-[#869E8F] break-words">
              कार्यालय: {config.contact.officeAddress || 'खजराना, इंदौर, म.प्र.'}
            </p>
            <p className="text-xs text-[#869E8F] break-words">
              लाइसेंस नं.: {config.contact.ayurvedicLicenseNo || 'MP/D/124/2026'}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#839C8C] gap-3 text-center sm:text-left">
          <p className="break-words">
            &copy; {new Date().getFullYear()} {config.brandName}. सर्वाधिकार सुरक्षित। DAAD FREE आयुर्वेदिक एंटीफंगल स्किनकेयर फॉर्मूलेशन।
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#9BBBA6] text-center sm:text-right">
              <ShieldCheck className="w-4 h-4 text-[#88C498] shrink-0" />
              प्रामाणिक स्किनकेयर &bull; सीधे WhatsApp द्वारा सुरक्षित ऑर्डर
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
