/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Star,
  MessageSquarePlus,
  CheckCircle2,
  Calendar,
  MapPin,
  X,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { CustomerReview, SiteConfig } from '../config';

interface CustomerReviewsProps {
  config: SiteConfig;
  onReviewSubmitted: (newReview: CustomerReview) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ config, onReviewSubmitted }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Filter ONLY approved reviews as mandated
  const approvedReviews = (config.reviews || []).filter((r) => r.approved === true);

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
      approved: false, // Must be approved by owner before public display!
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
    <section id="reviews" className="py-16 md:py-24 bg-[#FAF8F5] border-t border-[#E8E1D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#235E37]">
              Customer Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#112418] mt-2 font-serif-title">
              Verified Customer Reviews
            </h2>
            <p className="mt-2 text-sm text-[#4A5D50]">
              Authentic experiences only. We never publish fake testimonials or automated ratings.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#235E37] text-[#235E37] hover:bg-[#235E37] hover:text-white transition-all text-xs sm:text-sm font-semibold shadow-xs self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews List or Honest Empty State */}
        {approvedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-2xl border border-[#EBE3D5] shadow-xs flex flex-col justify-between"
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
                  <p className="text-xs sm:text-sm text-[#384A3E] leading-relaxed italic mb-4">
                    &ldquo;{rev.reviewText}&rdquo;
                  </p>

                  {/* Optional Review Photo */}
                  {rev.photoUrl && (
                    <div className="mb-4 rounded-xl overflow-hidden max-h-48 border border-[#E9E2D2]">
                      <img
                        src={rev.photoUrl}
                        alt="Customer review attachment"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Customer Meta */}
                <div className="pt-4 border-t border-[#EAE3D3] flex items-center justify-between text-xs text-[#5D7063]">
                  <div>
                    <span className="font-bold text-[#14291B] block">
                      {rev.customerName}
                    </span>
                    {rev.city && (
                      <span className="text-[11px] text-[#718476] flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {rev.city}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#235E37]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approved</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State Compliant with Master Prompt */
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#EAE2D4] max-w-2xl mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#EBF3ED] text-[#235E37] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#112418] font-serif-title">
              No Approved Reviews Yet
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#506356] leading-relaxed max-w-md mx-auto">
              In strict adherence to KOSTAK Healthcare&apos;s honesty policy, we do not show manufactured or pre-populated reviews. Only real, approved customer feedback will appear here.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#235E37] text-white text-xs sm:text-sm font-semibold hover:bg-[#1A4B2B] transition-colors shadow-xs"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Be the First to Review</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* =================================================================== */}
      {/* WRITE A REVIEW MODAL */}
      {/* =================================================================== */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#E2DDD0]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F2ECE1] text-[#4A5D50]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#112418] font-serif-title">
              Submit Your Honest Feedback
            </h3>
            <p className="text-xs text-[#526558] mt-1">
              Your review will be verified by the KOSTAK Healthcare team before appearing on the site.
            </p>

            {submittedMessage ? (
              <div className="mt-6 p-6 rounded-2xl bg-[#EAF5EE] border border-[#B8DEC3] text-center">
                <CheckCircle2 className="w-8 h-8 text-[#1A6C39] mx-auto mb-2" />
                <h4 className="text-sm font-bold text-[#112418]">Review Submitted for Moderation</h4>
                <p className="text-xs text-[#395041] mt-1">
                  Thank you for your valuable feedback! It will appear once approved by the business administrator.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F3325] mb-1">
                    Your Name / Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Patel"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDC0] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#235E37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F3325] mb-1">
                      City / State (Optional)
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Pune, MH"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDC0] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#235E37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1F3325] mb-1">
                      Rating *
                    </label>
                    <div className="flex items-center gap-1.5 h-10">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating
                                ? 'text-[#E5A823] fill-[#E5A823]'
                                : 'text-[#CDC6B8]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3325] mb-1">
                    Written Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience using DAAD FREE cream, duration of use, and comfort..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDC0] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#235E37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3325] mb-1">
                    Optional Review Photo Link (Public image URL)
                  </label>
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDC0] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#235E37]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#235E37] text-white text-xs sm:text-sm font-semibold hover:bg-[#1A4A2B] transition-colors shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Review for Admin Approval</span>
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
