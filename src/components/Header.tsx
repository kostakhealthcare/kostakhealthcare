/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquare, Sliders, Menu, X, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../config';

interface HeaderProps {
  config: SiteConfig;
  onOpenOwnerConfig: () => void;
  onOrderWhatsApp: () => void;
  onOpenPolicy: (policyKey: 'privacyPolicy' | 'termsAndConditions' | 'shippingPolicy' | 'cancellationAndRefundPolicy') => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onOpenOwnerConfig,
  onOrderWhatsApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Product', href: '#product' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Directions & FAQ', href: '#faq' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E2D6] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#132B1E] text-[#E3EDE6] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-[#88C498]" />
        <span>Authentic Ayurvedic Topical Care &bull; Direct WhatsApp Dispatch from {config.brandName}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#1A3A2A] text-[#E8D4B0] flex items-center justify-center shadow-sm border border-[#2D5A42]">
              <span className="font-serif font-bold text-xl tracking-tight">K</span>
            </div>
            <div>
              <span className="font-brand font-bold text-lg tracking-wider text-[#132B1E] block uppercase group-hover:text-[#235E37] transition-colors">
                {config.brandName}
              </span>
              <span className="text-[10px] tracking-widest text-[#5C6E62] block uppercase font-medium">
                Ayurvedic Wellness & Skincare
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-[#38483D]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#184628] transition-colors py-1 relative hover:after:w-full after:transition-all after:duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#235E37]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Owner settings gear */}
            <button
              onClick={onOpenOwnerConfig}
              title="Store Owner Settings & Config Generator"
              className="p-2.5 rounded-full text-[#4B6353] hover:text-[#132B1E] hover:bg-[#EFE9DD] transition-colors border border-transparent hover:border-[#DCD5C5]"
            >
              <Sliders className="w-4 h-4" />
              <span className="sr-only">Owner Settings</span>
            </button>

            {/* WhatsApp Order Button */}
            <button
              onClick={onOrderWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C8A4E] hover:bg-[#167440] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Order on WhatsApp</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onOpenOwnerConfig}
              title="Store Settings"
              className="p-2 text-[#4B6353] hover:text-[#132B1E]"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#132B1E] hover:bg-[#EFE9DD] rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7E2D6] bg-[#FAF8F5] px-4 pt-4 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-base font-medium text-[#293B30]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-md hover:bg-[#EFE9DD] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#E7E2D6] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1C8A4E] text-white font-semibold text-sm shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Buy Now on WhatsApp</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOwnerConfig();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs text-[#526859] hover:bg-[#EFE9DD] border border-[#DDD5C3]"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Owner Config & Settings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
