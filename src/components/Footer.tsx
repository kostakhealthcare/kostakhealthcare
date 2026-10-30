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
    <footer className="bg-[#122419] text-[#E0EBE2] border-t border-[#1F3D2A] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#23432F]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1B3E2B] text-[#E8D4B0] flex items-center justify-center border border-[#305C42]">
                <span className="font-serif font-bold text-lg">K</span>
              </div>
              <span className="font-brand font-bold text-base tracking-wider text-white uppercase">
                {config.brandName}
              </span>
            </div>
            
            <p className="text-xs text-[#A8BEAF] leading-relaxed max-w-sm">
              Authentic Ayurvedic formulation provider. <strong>DAAD FREE Ayurvedic Antifungal Cream (25 gm)</strong> is specifically crafted for topical soothing comfort on ringworm and fungal skin irritations.
            </p>

            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={onOrderWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C8A4E] hover:bg-[#167440] text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>Buy via WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A2D4B1] block">
              Quick Navigation
            </span>
            <ul className="text-xs space-y-2 text-[#C0D3C5]">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#product" className="hover:text-white transition-colors">Product Specifications</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Ayurvedic Benefits</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Directions &amp; FAQs</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Details</a></li>
            </ul>
          </div>

          {/* Policies & Legal */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A2D4B1] block">
              Policies &amp; Legal
            </span>
            <ul className="text-xs space-y-2 text-[#C0D3C5]">
              <li>
                <button
                  onClick={() => onOpenPolicy('privacyPolicy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('termsAndConditions')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shippingPolicy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Shipping &amp; Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('cancellationAndRefundPolicy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Cancellation &amp; Refund Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="space-y-3 text-xs text-[#A8BEAF]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A2D4B1] block">
              Contact &amp; Inquiries
            </span>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#88C498] shrink-0" />
              <a href={`mailto:${config.contact.email}`} className="hover:text-white break-all">
                {config.contact.email}
              </a>
            </p>
            <p className="text-[11px] text-[#A2BBAA]">
              Phone / WhatsApp: <a href="tel:+919131138853" className="text-white hover:underline font-bold">+91 {config.contact.phone || '9131138853'}</a>
            </p>
            <p className="text-[11px] text-[#869E8F] leading-relaxed">
              Support: {config.contact.supportHours}
            </p>
            <p className="text-[11px] text-[#869E8F]">
              Office: {config.contact.officeAddress || 'Khajrana, Indore, M.P.'}
            </p>
            <p className="text-[11px] text-[#869E8F]">
              Lic: {config.contact.ayurvedicLicenseNo || 'MP/D/124/2026'}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#839C8C] gap-4">
          <p>
            &copy; {new Date().getFullYear()} {config.brandName}. All rights reserved. DAAD FREE is an Ayurvedic Proprietary Medicine.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#9BBBA6]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#88C498]" />
              Authentic Skincare &bull; No Online Payment Required
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
