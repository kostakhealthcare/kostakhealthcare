/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Star,
  MessageSquarePlus,
  CheckCircle2,
  X,
  Send,
  MapPin,
} from 'lucide-react';
import { CustomerReview, SiteConfig } from '../config';

interface CustomerReviewsProps {
  config: SiteConfig;
  onReviewSubmitted: (review: CustomerReview) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  config,
  onReviewSubmitted,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Filter ONLY genuine approved reviews as strictly mandated
  const approvedReviews = (config.reviews || []).filter((r) => r.approved === true);

  // MANDATE: "If genuine reviews are unavailable, hide the reviews section."
  if (approvedReviews.length === 0) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) return;

    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      customerName: name.trim(),
      city: city.trim() || undefined,
      rating,
      date: new Date().toISOString().split('T')[0],
      reviewText: reviewText.trim(),
      photoUrl: photoUrl.trim() || undefined,
      approved: false,
    };

    onReviewSubmitted(newReview);
    setSubmittedMessage(true);

    setTimeout(() => {
      setSubmittedMessage(false);
      setModalOpen(false);
      setName('');
      setCity('');
      setRating(5);
      setReviewText('');
      setPhotoUrl('');
    }, 3000);
  };

  return (
    <section id="reviews" className="py-12 sm:py-16 md:py-20 bg-[#FAF8F5] border-t border-[#E3EDE6] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1C8A4E]">
              सत्यापित अनुभव
            </span>
            <h2 className="font-clamp-title font-bold text-[#0F281B] mt-2 font-serif-title break-words">
              सत्यापित ग्राहकों की वास्तविक समीक्षाएं
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#4E6255] break-words">
              केवल वास्तविक और अनुमति प्राप्त ग्राहकों के अनुभव।
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-white border border-[#0F281B] text-[#0F281B] hover:bg-[#0F281B] hover:text-white active:scale-95 transition-all text-xs sm:text-sm font-semibold shadow-xs cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>समीक्षा लिखें</span>
          </button>
        </div>

        {/* Approved Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E3EDE6] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= rev.rating
                          ? 'text-[#E5A823] fill-[#E5A823]'
                          : 'text-[#D9D3C7]'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#38483D] leading-relaxed italic mb-4 break-words">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>

                {/* Optional Review Photo */}
                {rev.photoUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden max-h-48 border border-[#E3EDE6]">
                    <img
                      src={rev.photoUrl}
                      alt="ग्राहक समीक्षा फोटो"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              {/* Customer Meta */}
              <div className="pt-3.5 sm:pt-4 border-t border-[#EAE3D4] flex items-center justify-between text-xs text-[#55695C] gap-2">
                <div className="min-w-0">
                  <span className="font-bold text-[#0F281B] block truncate">
                    {rev.customerName}
                  </span>
                  {rev.city && (
                    <span className="text-[11px] text-[#63776A] flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{rev.city}</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#1C8A4E] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>सत्यापित ग्राहक</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-[#E3EDE6]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F2F7F4] text-[#4E6255] cursor-pointer"
              aria-label="समीक्षा बॉक्स बंद करें"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg sm:text-xl font-bold text-[#0F281B] font-serif-title pr-8 break-words">
              अपना वास्तविक अनुभव साझा करें
            </h3>
            <p className="text-xs text-[#526558] mt-1 break-words">
              आपकी समीक्षा KOSTAK Healthcare गुणवत्ता टीम द्वारा सत्यापन के बाद वेबसाइट पर प्रदर्शित होगी।
            </p>

            {submittedMessage ? (
              <div className="mt-5 p-5 rounded-2xl bg-[#E8F2EC] border border-[#BED9C6] text-center">
                <CheckCircle2 className="w-8 h-8 text-[#1C8A4E] mx-auto mb-2" />
                <h4 className="text-sm font-bold text-[#0F281B]">समीक्षा दर्ज कर ली गई है</h4>
                <p className="text-xs text-[#3E5245] mt-1">
                  आपके बहुमूल्य अनुभव के लिए धन्यवाद! सत्यापन के बाद इसे प्रकाशित किया जाएगा।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 sm:space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F281B] mb-1">
                    आपका नाम *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="उदा. राहुल शर्मा"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBDCD1] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0F281B]"
                  />
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F281B] mb-1">
                      शहर / राज्य (वैकल्पिक)
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="उदा. इंदौर, म.प्र."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBDCD1] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0F281B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F281B] mb-1">
                      रेटिंग (स्टार) *
                    </label>
                    <div className="flex items-center gap-1.5 h-10">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                          aria-label={`${star} स्टार`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating
                                ? 'text-[#E5A823] fill-[#E5A823]'
                                : 'text-[#CBDCD1]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F281B] mb-1">
                    आपका अनुभव / समीक्षा विवरण *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="DAAD FREE क्रीम के इस्तेमाल का अनुभव, कितने दिनों में आराम मिला..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBDCD1] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0F281B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F281B] mb-1">
                    समीक्षा फोटो लिंक (वैकल्पिक)
                  </label>
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#CBDCD1] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0F281B]"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F281B] text-white text-xs sm:text-sm font-semibold hover:bg-[#143524] active:scale-[0.99] transition-colors shadow-xs cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>समीक्षा सबमिट करें</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
