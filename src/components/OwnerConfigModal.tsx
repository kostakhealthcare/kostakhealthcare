/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Sliders,
  Copy,
  Download,
  RotateCcw,
  Check,
  CheckCircle2,
  Trash2,
  Star,
  ExternalLink,
  Info,
  HelpCircle,
  Plus,
  RefreshCw,
  Eye,
} from 'lucide-react';
import {
  SiteConfig,
  saveSiteConfigLocally,
  resetSiteConfigLocally,
  CustomerReview,
  ReviewVideo,
  resolveImageUrl,
} from '../config';

interface OwnerConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onConfigUpdated: (newConfig: SiteConfig) => void;
}

export const OwnerConfigModal: React.FC<OwnerConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onConfigUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'images' | 'reviews' | 'export'>('general');
  const [localConfig, setLocalConfig] = useState<SiteConfig>(config);
  const [copied, setCopied] = useState(false);
  const [savedLocallyToast, setSavedLocallyToast] = useState(false);

  // New video form state
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoAuthor, setNewVideoAuthor] = useState('');

  if (!isOpen) return null;

  const handlePriceChange = (val: string) => {
    if (val === '') {
      setLocalConfig({ ...localConfig, price: null });
    } else {
      const num = parseFloat(val);
      setLocalConfig({ ...localConfig, price: isNaN(num) ? null : num });
    }
  };

  const handleSaveLocally = () => {
    saveSiteConfigLocally(localConfig);
    onConfigUpdated(localConfig);
    setSavedLocallyToast(true);
    setTimeout(() => setSavedLocallyToast(false), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all local settings back to original site-config.js defaults?')) {
      resetSiteConfigLocally();
      window.location.reload();
    }
  };

  const handleBumpImageVersion = () => {
    const updated = { ...localConfig, imageVersion: (localConfig.imageVersion || 1) + 1 };
    setLocalConfig(updated);
  };

  const handleToggleReviewApproval = (reviewId: string) => {
    const updatedReviews = localConfig.reviews.map((r) =>
      r.id === reviewId ? { ...r, approved: !r.approved } : r
    );
    const updated = { ...localConfig, reviews: updatedReviews };
    setLocalConfig(updated);
    saveSiteConfigLocally(updated);
    onConfigUpdated(updated);
  };

  const handleDeleteReview = (reviewId: string) => {
    const updatedReviews = localConfig.reviews.filter((r) => r.id !== reviewId);
    const updated = { ...localConfig, reviews: updatedReviews };
    setLocalConfig(updated);
    saveSiteConfigLocally(updated);
    onConfigUpdated(updated);
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle.trim() || !newVideoUrl.trim()) return;

    const newVid: ReviewVideo = {
      id: `vid-${Date.now()}`,
      title: newVideoTitle.trim(),
      customerName: newVideoAuthor.trim() || undefined,
      videoUrl: newVideoUrl.trim(),
      approved: true,
    };

    const updated = { ...localConfig, reviewVideos: [...(localConfig.reviewVideos || []), newVid] };
    setLocalConfig(updated);
    saveSiteConfigLocally(updated);
    onConfigUpdated(updated);

    setNewVideoTitle('');
    setNewVideoUrl('');
    setNewVideoAuthor('');
  };

  const handleDeleteVideo = (videoId: string) => {
    const updatedVideos = (localConfig.reviewVideos || []).filter((v) => v.id !== videoId);
    const updated = { ...localConfig, reviewVideos: updatedVideos };
    setLocalConfig(updated);
    saveSiteConfigLocally(updated);
    onConfigUpdated(updated);
  };

  // Generate clean site-config.js text
  const generateConfigFileText = (): string => {
    return `/**
 * KOSTAK HEALTHCARE - DAAD FREE PRODUCT WEBSITE CONFIGURATION (site-config.js)
 * Generated on: ${new Date().toISOString()}
 */

window.DAAD_FREE_CONFIG = ${JSON.stringify(localConfig, null, 2)};
`;
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateConfigFileText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([generateConfigFileText()], { type: 'application/javascript' });
    element.href = URL.createObjectURL(file);
    element.download = 'site-config.js';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E2DDD0] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAE3D4] bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#14291B] text-[#E8D4B0] flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#14291B]">
                Store Owner Configurator & Settings
              </h3>
              <p className="text-[11px] text-[#55695C]">
                Manage price, WhatsApp number, Google Drive images, and review moderation without writing code
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EFE9DD] text-[#4F6255] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#EAE3D4] bg-[#F7F4EC] p-1.5 gap-1 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'general' ? 'bg-white text-[#112418] shadow-xs' : 'text-[#4F6355] hover:bg-white/40'
            }`}
          >
            Pricing & WhatsApp
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'images' ? 'bg-white text-[#112418] shadow-xs' : 'text-[#4F6355] hover:bg-white/40'
            }`}
          >
            Google Drive & Images
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'reviews' ? 'bg-white text-[#112418] shadow-xs' : 'text-[#4F6355] hover:bg-white/40'
            }`}
          >
            Customer Reviews & Videos ({localConfig.reviews?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'export' ? 'bg-white text-[#112418] shadow-xs' : 'text-[#4F6355] hover:bg-white/40'
            }`}
          >
            Export site-config.js
          </button>
        </div>

        {/* Main Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* =============================================================== */}
          {/* TAB 1: PRICING & WHATSAPP */}
          {/* =============================================================== */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              
              {/* WhatsApp phone number configuration */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D5] space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#14291B] uppercase tracking-wider mb-1">
                    WhatsApp Business Phone Number *
                  </label>
                  <p className="text-[11px] text-[#55695C] mb-2">
                    Country code + digits only (e.g. <code>919131138853</code> for India). No spaces, dashes, or &apos;+&apos;.
                  </p>
                  <input
                    type="text"
                    value={localConfig.whatsAppNumber}
                    onChange={(e) =>
                      setLocalConfig({ ...localConfig, whatsAppNumber: e.target.value.replace(/[^\d]/g, '') })
                    }
                    placeholder="919131138853"
                    className="w-full max-w-md px-3.5 py-2.5 rounded-xl border border-[#D5CDC0] text-sm font-mono focus:ring-2 focus:ring-[#235E37]"
                  />
                </div>

                <div className="text-[11px] text-[#4E6254] bg-white p-3 rounded-xl border border-[#ECE5D8]">
                  <strong>Current link format:</strong>{' '}
                  <code className="text-[#194E2C]">
                    https://wa.me/{localConfig.whatsAppNumber || '919131138853'}?text=...
                  </code>
                </div>
              </div>

              {/* Product Pricing configuration */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D5] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-[#14291B] uppercase tracking-wider">
                      Product Unit Price (25g Pack)
                    </label>
                    <p className="text-[11px] text-[#55695C]">
                      Leave empty or 0 if you want the website to show &quot;Contact us for price&quot;.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#14291B] mb-1">
                      Selling Price (₹)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-[#14291B]">₹</span>
                      <input
                        type="number"
                        min="0"
                        value={localConfig.price ?? ''}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        placeholder="e.g. 199 (or empty for contact)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDC0] text-sm font-semibold focus:ring-2 focus:ring-[#235E37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14291B] mb-1">
                      Maximum Retail Price / MRP (₹ Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-[#14291B]">₹</span>
                      <input
                        type="number"
                        min="0"
                        value={localConfig.mrp ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLocalConfig({
                            ...localConfig,
                            mrp: val === '' ? null : parseFloat(val),
                          });
                        }}
                        placeholder="e.g. 250"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CDC0] text-sm focus:ring-2 focus:ring-[#235E37]"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-[#526658]">
                  {localConfig.price ? (
                    <span className="text-[#194E2C] font-semibold">
                      ✓ Website will display ₹{localConfig.price} and calculate order totals automatically.
                    </span>
                  ) : (
                    <span className="text-[#875507] font-semibold">
                      ℹ Website will display &quot;Contact us for price&quot; and omit price numbers from the WhatsApp message.
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D5] space-y-4">
                <label className="block text-xs font-bold text-[#14291B] uppercase tracking-wider">
                  Business Support Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#334639] mb-1">Support Email</label>
                    <input
                      type="email"
                      value={localConfig.contact.email}
                      onChange={(e) =>
                        setLocalConfig({
                          ...localConfig,
                          contact: { ...localConfig.contact, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#D5CDC0] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#334639] mb-1">Support Hours</label>
                    <input
                      type="text"
                      value={localConfig.contact.supportHours}
                      onChange={(e) =>
                        setLocalConfig({
                          ...localConfig,
                          contact: { ...localConfig.contact, supportHours: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#D5CDC0] text-xs"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 2: GOOGLE DRIVE & IMAGES */}
          {/* =============================================================== */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              
              {/* Educational banner on how to preserve Google Drive File ID */}
              <div className="p-5 rounded-2xl bg-[#EAF2ED] border border-[#BCD9C5] space-y-2 text-xs text-[#2A4C36]">
                <div className="flex items-center gap-2 font-bold text-[#14291B]">
                  <HelpCircle className="w-4 h-4 text-[#235E37]" />
                  <span>How to replace images in Google Drive while preserving the exact same File ID:</span>
                </div>
                <ol className="list-decimal pl-5 space-y-1 text-[11px] leading-relaxed">
                  <li>In Google Drive on your computer, open your <code>Product Images/</code> folder.</li>
                  <li>Right-click on the image you want to replace (e.g. <code>daad-free-main.jpg</code>).</li>
                  <li>Click <strong>File information &rarr; Manage versions</strong>.</li>
                  <li>Click <strong>Upload new version</strong> and choose your updated photo.</li>
                  <li><strong>Result:</strong> Google Drive updates the file content without changing its File ID or sharing link!</li>
                  <li>Click &quot;Bump Image Version&quot; below to force visitors&apos; browsers to fetch the latest version immediately.</li>
                </ol>
              </div>

              {/* Version & Cache control */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF8F5] border border-[#E9E2D4]">
                <div>
                  <span className="font-bold text-xs text-[#14291B] block">Browser Cache Version</span>
                  <span className="text-[11px] text-[#55695C]">
                    Current version query: <code>?v={localConfig.imageVersion}</code>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleBumpImageVersion}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#235E37] text-[#235E37] hover:bg-[#235E37] hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Bump Version (v{(localConfig.imageVersion || 1) + 1})</span>
                </button>
              </div>

              {/* Image 1: Main Product Image */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E9E2D4] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#14291B]">
                    1. Main Product Image (25 gm_Master_Product_front)
                  </span>
                  <span className="text-[10px] bg-[#EAE2D4] px-2 py-0.5 rounded text-[#2E4536] font-mono">
                    Hero Showcase
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-3 aspect-square bg-white rounded-xl p-2 border border-[#E2DDD0] flex items-center justify-center overflow-hidden">
                    <img
                      src={resolveImageUrl(localConfig.images.mainImage, localConfig.imageVersion)}
                      alt="Main preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="md:col-span-9 space-y-2 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#304436]">
                        Google Drive File ID or Share URL (Optional)
                      </label>
                      <input
                        type="text"
                        value={localConfig.images.mainImage.googleDriveId || ''}
                        onChange={(e) =>
                          setLocalConfig({
                            ...localConfig,
                            images: {
                              ...localConfig.images,
                              mainImage: {
                                ...localConfig.images.mainImage,
                                googleDriveId: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="Paste Google Drive link or File ID..."
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CDC0] text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#304436]">
                        Direct Local / CDN URL
                      </label>
                      <input
                        type="text"
                        value={localConfig.images.mainImage.url}
                        onChange={(e) =>
                          setLocalConfig({
                            ...localConfig,
                            images: {
                              ...localConfig.images,
                              mainImage: {
                                ...localConfig.images.mainImage,
                                url: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CDC0] text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image 2: Promo Image 1 */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E9E2D4] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#14291B] block">
                  2. Promotional Image 1 (Post1_Option2)
                </span>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-3 aspect-square bg-white rounded-xl p-2 border border-[#E2DDD0] flex items-center justify-center overflow-hidden">
                    <img
                      src={resolveImageUrl(localConfig.images.promoImage1, localConfig.imageVersion)}
                      alt="Promo 1 preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="md:col-span-9 space-y-2 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#304436]">
                        Google Drive File ID or Share URL
                      </label>
                      <input
                        type="text"
                        value={localConfig.images.promoImage1.googleDriveId || ''}
                        onChange={(e) =>
                          setLocalConfig({
                            ...localConfig,
                            images: {
                              ...localConfig.images,
                              promoImage1: {
                                ...localConfig.images.promoImage1,
                                googleDriveId: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="Paste Google Drive link or File ID..."
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CDC0] text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#304436]">
                        Direct Local / CDN URL
                      </label>
                      <input
                        type="text"
                        value={localConfig.images.promoImage1.url}
                        onChange={(e) =>
                          setLocalConfig({
                            ...localConfig,
                            images: {
                              ...localConfig.images,
                              promoImage1: {
                                ...localConfig.images.promoImage1,
                                url: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CDC0] text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image 3: Promo Image 2 */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E9E2D4] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#14291B] block">
                  3. Promotional Image 2 (Post2)
                </span>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-3 aspect-square bg-white rounded-xl p-2 border border-[#E2DDD0] flex items-center justify-center overflow-hidden">
                    <img
                      src={resolveImageUrl(localConfig.images.promoImage2, localConfig.imageVersion)}
                      alt="Promo 2 preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="md:col-span-9 space-y-2 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#304436]">
                        Google Drive File ID or Share URL
                      </label>
                      <input
                        type="text"
                        value={localConfig.images.promoImage2.googleDriveId || ''}
                        onChange={(e) =>
                          setLocalConfig({
                            ...localConfig,
                            images: {
                              ...localConfig.images,
                              promoImage2: {
                                ...localConfig.images.promoImage2,
                                googleDriveId: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="Paste Google Drive link or File ID..."
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CDC0] text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#304436]">
                        Direct Local / CDN URL
                      </label>
                      <input
                        type="text"
                        value={localConfig.images.promoImage2.url}
                        onChange={(e) =>
                          setLocalConfig({
                            ...localConfig,
                            images: {
                              ...localConfig.images,
                              promoImage2: {
                                ...localConfig.images.promoImage2,
                                url: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CDC0] text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 3: CUSTOMER REVIEWS & VIDEOS */}
          {/* =============================================================== */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D3]">
                <span className="text-xs font-bold text-[#14291B] block">Review Moderation Policy</span>
                <p className="text-[11px] text-[#55695C] mt-0.5">
                  Only reviews with &quot;Approved&quot; status appear on your public website. You can toggle approval or delete inappropriate submissions below.
                </p>
              </div>

              {/* Review list */}
              <div className="space-y-3">
                {localConfig.reviews && localConfig.reviews.length > 0 ? (
                  localConfig.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl border border-[#E8E1D3] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#14291B]">{rev.customerName}</span>
                          {rev.city && <span className="text-[10px] text-[#697B70]">({rev.city})</span>}
                          <span className="text-[10px] text-[#E5A823] font-bold">★ {rev.rating}/5</span>
                          <span className="text-[10px] text-[#718476]">{rev.date}</span>
                        </div>
                        <p className="text-xs text-[#44584B] mt-1 italic">&ldquo;{rev.reviewText}&rdquo;</p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          type="button"
                          onClick={() => handleToggleReviewApproval(rev.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                            rev.approved
                              ? 'bg-[#E1F3E7] text-[#176633] hover:bg-[#D0ECD7]'
                              : 'bg-[#FFF3CD] text-[#856404] hover:bg-[#FFE8A1]'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{rev.approved ? 'Approved' : 'Pending Approval'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReview(rev.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-center py-6 text-[#6B7D72] italic">
                    No customer reviews submitted yet. When customers submit reviews on the site, they will appear here for your approval.
                  </p>
                )}
              </div>

              {/* Add Video Section */}
              <div className="pt-4 border-t border-[#EAE3D4] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#14291B] block">
                  Add Approved Review Video
                </span>
                <form onSubmit={handleAddVideo} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    placeholder="Video Title (e.g. 2-Week Experience)"
                    className="px-3 py-2 rounded-xl border border-[#D5CDC0] text-xs"
                  />
                  <input
                    type="text"
                    value={newVideoAuthor}
                    onChange={(e) => setNewVideoAuthor(e.target.value)}
                    placeholder="Customer Name (e.g. Ramesh S.)"
                    className="px-3 py-2 rounded-xl border border-[#D5CDC0] text-xs"
                  />
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={newVideoUrl}
                      onChange={(e) => setNewVideoUrl(e.target.value)}
                      placeholder="YouTube link or MP4 URL"
                      className="w-full px-3 py-2 rounded-xl border border-[#D5CDC0] text-xs"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#235E37] text-white rounded-xl text-xs font-semibold hover:bg-[#18482A] shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Existing videos */}
                {localConfig.reviewVideos && localConfig.reviewVideos.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {localConfig.reviewVideos.map((vid) => (
                      <div
                        key={vid.id}
                        className="p-3 bg-white rounded-xl border border-[#E8E1D3] flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-bold text-[#14291B]">{vid.title}</span>
                          <span className="text-[#687C70] ml-2 font-mono text-[11px] truncate max-w-xs inline-block align-bottom">
                            {vid.videoUrl}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteVideo(vid.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 4: EXPORT CONFIG */}
          {/* =============================================================== */}
          {activeTab === 'export' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E9E2D4] space-y-1.5 text-xs text-[#3E5245]">
                <span className="font-bold text-[#14291B] block">How to publish these changes permanently:</span>
                <p>
                  1. Click <strong>&quot;Download site-config.js&quot;</strong> or <strong>&quot;Copy site-config.js&quot;</strong> below.
                </p>
                <p>
                  2. Replace the <code>site-config.js</code> file in your website repository or hosting dashboard (Netlify / Vercel / GitHub).
                </p>
                <p>
                  3. Your changes will immediately go live for all customers without any code compilation or rebuild!
                </p>
              </div>

              {/* Code preview block */}
              <div className="relative">
                <pre className="p-4 rounded-2xl bg-[#112217] text-[#DCEAE0] font-mono text-xs overflow-x-auto max-h-60 border border-[#233C2C]">
                  {generateConfigFileText()}
                </pre>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopyToClipboard}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#235E37] text-white font-semibold text-xs hover:bg-[#1A482A] transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy site-config.js'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#235E37] text-[#235E37] font-semibold text-xs hover:bg-[#EFE9DC] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download site-config.js</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#EAE3D4] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 text-xs text-[#7A4035] hover:underline font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Values</span>
          </button>

          <div className="flex items-center gap-3">
            {savedLocallyToast && (
              <span className="text-xs text-[#176633] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Preview Saved Locally!
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveLocally}
              className="px-5 py-2 rounded-xl bg-[#1C8A4E] text-white text-xs sm:text-sm font-semibold hover:bg-[#167440] transition-colors shadow-xs"
            >
              Save &amp; Preview Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-[#D5CDC0] text-[#34483B] text-xs font-semibold hover:bg-[#EFE9DC]"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
