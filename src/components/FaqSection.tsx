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

export const FaqSection: React.FC<FaqSectionProps> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      topic: 'उत्पाद की जानकारी',
      q: 'DAAD FREE क्या है और यह किन समस्याओं में असरदार है?',
      a: `DAAD FREE (दाद का दिव्यास्त्र) एक विशेष आयुर्वेदिक एंटीफंगल क्रीम है जो दाद (रिंगवर्म), खाज, जिद्दी फंगल संक्रमण और असहनीय खुजली से पहले ही दिन से असरदार राहत प्रदान करने के लिए तैयार की गई है। यह त्वचा की जलन व खुजली को शांत कर संक्रमण के फैलाव को रोकती है।`,
    },
    {
      topic: 'उपलब्ध पैक',
      q: 'DAAD FREE के कौन से साइज़ और पैक विकल्प उपलब्ध हैं?',
      a: `DAAD FREE दो साइज़ में उपलब्ध है: 25 ग्राम (मानक जार) और 15 ग्राम (कॉम्पैक्ट जार)। आप अपनी आवश्यकतानुसार 1 जार (मानक), 2 जार का बचत पैक, या 4 जार का पारिवारिक कॉम्बो पैक ऑर्डर कर सकते हैं। मल्टी-पैक विकल्पों पर विशेष छूट और बचत मिलती है।`,
    },
    {
      topic: 'ऑर्डर कैसे करें',
      q: 'बिना पेमेंट गेटवे के वेबसाइट से WhatsApp पर ऑर्डर कैसे होता है?',
      a: `ऑर्डर करने की प्रक्रिया अत्यंत सीधी और सुरक्षित है! जब आप वेबसाइट पर "WhatsApp पर ऑर्डर करें" बटन दबाते हैं, तो आपके मोबाइल या कंप्यूटर में WhatsApp एक तैयार संदेश (उत्पाद का नाम, चयनित साइज़, पैक, मात्रा और कुल राशि) के साथ खुल जाता है। आप बस वह संदेश KOSTAK Healthcare टीम को भेजते हैं। हमारी टीम तुरंत स्टॉक और डिलीवरी विवरण की पुष्टि करती है। वेबसाइट पर कोई कार्ड या पासवर्ड डालने की आवश्यकता नहीं है।`,
    },
    {
      topic: 'डिलीवरी एवं डिस्पैच',
      q: 'ऑर्डर की डिलीवरी में कितना समय लगता है और ट्रैकिंग कैसे मिलती है?',
      a: `WhatsApp पर ऑर्डर कन्फर्म होने के 24 से 48 घंटे के भीतर पार्सल सुरक्षित सीलबंद पैक कर एक्सप्रेस कूरियर से रवाना किया जाता है। पूरे भारत में 3 से 7 कार्य दिवसों में डिलीवरी हो जाती है। पार्सल रवाना होते ही रियल-टाइम ट्रैकिंग नंबर और कूरियर लिंक सीधे आपके WhatsApp चैट पर भेज दिया जाता है।`,
    },
    {
      topic: 'भुगतान विकल्प',
      q: 'ऑर्डर के लिए भुगतान (Payment) कैसे करना होता है?',
      a: `WhatsApp पर ऑर्डर विवरण और आपके पिनकोड की जांच के बाद, हमारी टीम आपको सीधे सुरक्षित भुगतान विकल्प (UPI जैसे Google Pay, PhonePe, Paytm अथवा बैंक ट्रांसफर) साझा करती है। आप सुविधा अनुसार सीधे भुगतान कर सकते हैं।`,
    },
    {
      topic: 'इस्तेमाल और सावधानियाँ',
      q: 'क्रीम लगाने का सही तरीका क्या है और 7 दिनों का विशेष नियम क्या है?',
      a: `प्रभावित त्वचा को हल्के गुनगुने पानी से साफ कर सुखा लें और दिन में 2 बार (सुबह व रात) क्रीम की एक पतली परत लगाएं। लगाने के बाद हाथों को साबुन से धो लें। महत्वपूर्ण सावधानी: यदि आप पहले से कोई अन्य एलोपैथिक या रासायनिक एंटीफंगल क्रीम इस्तेमाल कर रहे हैं, तो उसे बंद करके कम से कम 07 दिन बाद ही DAAD FREE लगाना शुरू करें ताकि त्वचा पर कोई विपरीत प्रभाव न पड़े।`,
    },
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 bg-[#FAF8F5] border-t border-[#E3EDE6] w-full max-w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1C8A4E]">
            अक्सर पूछे जाने वाले सवाल
          </span>
          <h2 className="font-clamp-title font-bold text-[#0F281B] mt-2 font-serif-title break-words">
            सवाल और जवाब (FAQ)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4E6255] break-words">
            उत्पाद, साइज़, ऑर्डर प्रक्रिया, डिलीवरी और उपयोग विधि से जुड़े सभी महत्वपूर्ण प्रश्न
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E3EDE6] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 px-4 sm:px-6 text-left flex items-start justify-between gap-3 hover:bg-[#F2F7F4]/50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1C8A4E] block mb-0.5">
                      {faq.topic}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#0F281B] break-words">
                      {faq.q}
                    </span>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F2F7F4] text-[#0F281B] flex items-center justify-center shrink-0 mt-0.5">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#38483D] leading-relaxed border-t border-[#EAE3D4] bg-[#FAF8F5]/40 break-words">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-8 text-center text-xs text-[#55695C] flex items-center justify-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-[#1C8A4E] shrink-0" />
          <span>कोई अन्य सवाल है? सीधे WhatsApp (+91 9131138853) पर हमारे प्रतिनिधि से पूछें।</span>
        </div>

      </div>
    </section>
  );
};
