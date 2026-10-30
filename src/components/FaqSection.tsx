/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { SiteConfig } from '../config';

interface FaqSectionProps {
  config: SiteConfig;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ config }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does ordering on WhatsApp work without an online payment gateway?',
      a: `Ordering is direct, simple, and personal! When you click "Buy Now on WhatsApp", it opens your official WhatsApp app with a pre-filled message detailing the product (DAAD FREE 25g), your selected quantity, and pricing. You simply send the message to KOSTAK Healthcare. Our team will verify immediate stock, calculate shipping or delivery terms for your pincode, and share direct payment instructions (such as UPI/Bank transfer or COD options if available). You never enter bank credentials on this website.`,
    },
    {
      q: 'What is the pack size and form of DAAD FREE?',
      a: `DAAD FREE comes in a 25 gm net weight tube with an outer protective carton box. It is a smooth, topical Ayurvedic cream intended for localized skin application.`,
    },
    {
      q: 'How should I apply DAAD FREE cream?',
      a: `First, cleanse the affected area gently with warm water and pat completely dry with a clean towel. Gently spread a thin layer of DAAD FREE cream over the affected skin and slightly past the margins. Apply 2 times daily (typically morning and night) or as directed by an Ayurvedic practitioner. Wash hands after use.`,
    },
    {
      q: 'Is DAAD FREE suitable for all types of skin rashes?',
      a: `No. DAAD FREE is formulated specifically for topical relief from fungal-related skin irritations, ringworm (daad), and localized fungal itching. It is not formulated to treat bacterial ulcers, viral blisters, allergies, or non-fungal conditions. If your condition does not improve or causes discomfort, stop use and consult a healthcare professional.`,
    },
    {
      q: 'What if the price shows "Contact us for price"?',
      a: `If a specific promotional or wholesale price is not listed, our representative will immediately provide current batch pricing, multi-pack discounts, and delivery estimates when you connect with us on WhatsApp.`,
    },
    {
      q: 'How long does delivery take?',
      a: `Orders confirmed via WhatsApp are typically dispatched within 24 to 48 business hours. Depending on your Indian delivery pin code, delivery takes between 3 to 7 business days via reliable courier partners. Tracking details are sent to you directly on WhatsApp.`,
    },
    {
      q: 'Can I cancel or return my order?',
      a: `You may cancel your order at any time before dispatch by messaging our team on WhatsApp. Due to pharmaceutical hygiene and safety standards for personal skincare products, opened or used cream tubes cannot be returned. Please refer to our full Return & Refund Policy in the footer.`,
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FAF7F0] border-t border-[#E8E1D2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#235E37]">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#112418] mt-2 font-serif-title">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-[#4E6255]">
            Everything you need to know about DAAD FREE and WhatsApp ordering.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#EBE3D5] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 hover:bg-[#FDFBF7] transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#14291B]">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F4EFE5] text-[#235E37] flex items-center justify-center shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#44584B] leading-relaxed border-t border-[#F2ECE0]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
