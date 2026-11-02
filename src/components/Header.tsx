/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquare, Menu, X, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../config';

interface HeaderProps {
  config: SiteConfig;
  onOrderWhatsApp: () => void;
  onOpenPolicy: (policyKey: 'privacyPolicy' | 'termsAndConditions' | 'shippingPolicy' | 'cancellationAndRefundPolicy') => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onOrderWhatsApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'मुख्य पृष्ठ', href: '#home' },
    { label: 'उत्पाद विवरण', href: '#product' },
    { label: 'आयुर्वेदिक लाभ', href: '#benefits' },
    { label: 'उपयोग विधि', href: '#usage' },
    { label: 'महत्वपूर्ण जानकारी', href: '#info' },
    { label: 'सवाल-जवाब', href: '#faq' },
    { label: 'संपर्क', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E3EDE6] transition-all">
      {/* Top Announcement Bar in Forest Green */}
      <div className="bg-[#0F281B] text-[#E3EDE6] text-[11px] sm:text-xs py-1.5 px-3 text-center font-medium tracking-wide flex items-center justify-center gap-2 leading-tight">
        <ShieldCheck className="w-3.5 h-3.5 text-[#88C498] shrink-0" />
        <span className="truncate sm:whitespace-normal">
          प्रामाणिक आयुर्वेदिक औषधि &bull; {config.brandName} द्वारा सीधे WhatsApp पर तेज़ डिलीवरी
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 sm:gap-8">
          
          {/* Zone 1: Brand Wordmark (Single element, no messy pills) */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0F281B] text-[#E8D4B0] flex items-center justify-center shadow-xs border border-[#1E4D34] shrink-0">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight">K</span>
            </div>
            <div className="min-w-0">
              <span className="font-brand font-bold text-base sm:text-lg tracking-wider text-[#0F281B] block uppercase group-hover:text-[#1C8A4E] transition-colors truncate">
                {config.brandName}
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-wide text-[#4E6255] block font-medium truncate">
                DAAD FREE Ayurvedic Care
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Clean single-line text links with subtle hover underlines) */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-[#293B30] shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#0F281B] transition-colors py-1 relative whitespace-nowrap shrink-0 hover:after:w-full after:transition-all after:duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1C8A4E]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop WhatsApp Order CTA Button */}
            <button
              onClick={onOrderWhatsApp}
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#0F281B] hover:bg-[#143524] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-[#88C498] fill-[#88C498]" />
              <span>WhatsApp पर ऑर्डर करें</span>
            </button>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#0F281B] hover:bg-[#EAE4D7] rounded-xl transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E3EDE6] bg-[#FAF8F5] px-4 pt-3 pb-5 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1 text-sm font-medium text-[#293B30]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-2.5 rounded-xl hover:bg-[#EAE4D7] transition-colors active:bg-[#DFD7C7]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#E3EDE6]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F281B] hover:bg-[#143524] active:scale-[0.99] text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#88C498] fill-[#88C498] shrink-0" />
              <span>WhatsApp पर अभी ऑर्डर करें</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
