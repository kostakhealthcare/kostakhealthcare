/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, Truck, RotateCcw } from 'lucide-react';
import { SiteConfig } from '../config';

export type PolicyType = 'privacyPolicy' | 'termsAndConditions' | 'shippingPolicy' | 'cancellationAndRefundPolicy';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyType;
  config: SiteConfig;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacyPolicy',
  config,
}) => {
  const [activeTab, setActiveTab] = useState<PolicyType>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (!isOpen) return null;

  const policyTabs = [
    { key: 'privacyPolicy', label: 'Privacy Policy', icon: Shield },
    { key: 'termsAndConditions', label: 'Terms & Conditions', icon: FileText },
    { key: 'shippingPolicy', label: 'Shipping Policy', icon: Truck },
    { key: 'cancellationAndRefundPolicy', label: 'Return & Refund Policy', icon: RotateCcw },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E2DDD0] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAE3D4] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#235E37]">
              Legal Documentation & Terms
            </span>
            <h3 className="text-lg font-bold text-[#14291B] font-serif-title">
              {config.brandName} Policies
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EFE9DD] text-[#4F6255] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#EAE3D4] bg-[#F7F4EC] overflow-x-auto p-1.5 gap-1 shrink-0">
          {policyTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as PolicyType)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-white text-[#112418] shadow-xs'
                    : 'text-[#4F6355] hover:text-[#112418] hover:bg-white/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#235E37]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#384A3E] leading-relaxed whitespace-pre-line">
          {config.policies[activeTab]}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#EAE3D4] bg-[#FAF8F5] flex justify-between items-center text-xs text-[#5D7063]">
          <span>Applies to {config.productName} ({config.packSize})</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#235E37] text-white font-medium hover:bg-[#18482A] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
