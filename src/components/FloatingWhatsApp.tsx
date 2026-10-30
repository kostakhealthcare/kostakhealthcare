/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { SiteConfig } from '../config';

interface FloatingWhatsAppProps {
  config: SiteConfig;
  quantity: number;
  onOrderWhatsApp: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  config,
  quantity,
  onOrderWhatsApp,
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip bubble on desktop */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 mb-2 px-3.5 py-2 bg-white text-[#14291B] text-xs font-semibold rounded-2xl shadow-lg border border-[#E2DDD0] animate-bounce-subtle">
          <span>Need quick order? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#889B8E] hover:text-[#14291B] p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={onOrderWhatsApp}
        className="group relative flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 bg-[#25D366] hover:bg-[#20BA5A] active:scale-95 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        aria-label="Order DAAD FREE directly on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#128C7E] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#128C7E]" />
        </span>
        <MessageSquare className="w-5 h-5 fill-white text-white" />
        <span className="text-xs sm:text-sm font-bold tracking-wide">
          Order on WhatsApp
        </span>
      </button>
    </div>
  );
};
