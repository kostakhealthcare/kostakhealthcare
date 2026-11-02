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
    { key: 'privacyPolicy', label: 'गोपनीयता नीति', icon: Shield },
    { key: 'termsAndConditions', label: 'नियम व शर्तें', icon: FileText },
    { key: 'shippingPolicy', label: 'शिपिंग नीति', icon: Truck },
    { key: 'cancellationAndRefundPolicy', label: 'वापसी व रिफंड', icon: RotateCcw },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E2DDD0] overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header in Hindi */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#EAE3D4] flex items-center justify-between bg-[#FAF8F5]">
          <div className="min-w-0 pr-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#235E37] block truncate">
              वैधानिक नियम एवं नीतियां
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#14291B] font-serif-title truncate">
              {config.brandName} आधिकारिक नीतियां
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full hover:bg-[#EFE9DD] text-[#4F6255] transition-colors cursor-pointer shrink-0"
            aria-label="पॉपअप बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector with touch scroll */}
        <div className="flex border-b border-[#EAE3D4] bg-[#F7F4EC] overflow-x-auto p-1.5 gap-1 shrink-0 touch-scroll-x">
          {policyTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.key;
            return (
              <button
                type="button"
                key={tab.key}
                onClick={() => setActiveTab(tab.key as PolicyType)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#112418] shadow-xs'
                    : 'text-[#4F6355] hover:text-[#112418] hover:bg-white/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#235E37] shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-3 sm:space-y-4 text-xs sm:text-sm text-[#384A3E] leading-relaxed whitespace-pre-line break-words">
          {config.policies[activeTab]}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-t border-[#EAE3D4] bg-[#FAF8F5] flex flex-col xs:flex-row justify-between items-center text-xs text-[#5D7063] gap-2">
          <span className="text-[11px] truncate text-center xs:text-left">लागू: {config.productName}</span>
          <button
            type="button"
            onClick={onClose}
            className="w-full xs:w-auto px-4 py-1.5 rounded-lg bg-[#235E37] text-white font-medium hover:bg-[#18482A] transition-colors cursor-pointer text-center"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};
