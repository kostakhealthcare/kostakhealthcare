/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Clock, MapPin, Truck, MessageSquare, ShieldCheck, Check } from 'lucide-react';
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
    <section id="contact" className="py-16 md:py-24 bg-white border-t border-[#E8E1D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#235E37]">
            Direct Customer Support
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#112418] mt-2 font-serif-title">
            Connect with KOSTAK Healthcare
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4E6255]">
            We are here to assist with product inquiries, wholesale orders, and delivery assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#E9E2D4] space-y-6">
            <h3 className="text-lg font-bold text-[#112418] font-serif-title">
              Official Business Contact
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#3E5244]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EBE4D5] text-[#235E37] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#14291B] block">Email Support</span>
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="text-[#235E37] hover:underline break-all"
                  >
                    {config.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EBE4D5] text-[#235E37] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#14291B] block">Operational Hours</span>
                  <span>{config.contact.supportHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EBE4D5] text-[#235E37] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#14291B] block">Location</span>
                  <span>{config.contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EBE4D5] text-[#235E37] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#14291B] block">Product License</span>
                  <span className="text-xs text-[#526658]">
                    {config.contact.ayurvedicLicenseNo || 'Ayurvedic Proprietary Medicine'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOrderWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1C8A4E] hover:bg-[#15723F] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Message on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Shipping & Delivery Highlights */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#E9E2D4] space-y-6">
            <h3 className="text-lg font-bold text-[#112418] font-serif-title flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#235E37]" />
              <span>Shipping & Delivery Policy</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#ECE5D8]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#235E37] block mb-1">
                  Dispatch Schedule
                </span>
                <p className="text-xs text-[#435749] leading-relaxed">
                  {config.shipping.dispatchTime}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#ECE5D8]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#235E37] block mb-1">
                  Transit Times
                </span>
                <p className="text-xs text-[#435749] leading-relaxed">
                  {config.shipping.deliveryTimeline}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4EDE0] border border-[#E3D9C5] text-xs text-[#485C4F] space-y-1.5">
              <span className="font-bold text-[#162B1E] block">Delivery Terms & WhatsApp Confirmation</span>
              <p>{config.shipping.chargesNote}</p>
              <p className="text-[11px] text-[#63776A]">
                Once your order is booked, your tracking ID and courier link will be provided directly on your WhatsApp chat.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs text-[#3D5244] pt-2">
              <div className="p-2.5 rounded-xl bg-white border border-[#EDE7DB]">
                <span className="font-bold text-[#14291B] block">Safe Packaging</span>
                <span className="text-[10px] text-[#697D70]">Tamper-evident</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#EDE7DB]">
                <span className="font-bold text-[#14291B] block">Trackable</span>
                <span className="text-[10px] text-[#697D70]">Active updates</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#EDE7DB]">
                <span className="font-bold text-[#14291B] block">Customer Care</span>
                <span className="text-[10px] text-[#697D70]">Direct WhatsApp</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
