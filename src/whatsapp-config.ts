/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * =============================================================================
 * CENTRAL WHATSAPP BUSINESS CONFIGURATION
 * =============================================================================
 * Update phone numbers, country code, and default message templates in this single file.
 * All product "Order on WhatsApp" and "Buy Now" buttons reference this configuration.
 * =============================================================================
 */

export const WHATSAPP_BUSINESS = {
  country: 'India',
  countryCode: '+91',
  rawNumber: '9131138853',
  fullNumber: '919131138853',
  clickToChatBaseUrl: 'https://wa.me/919131138853',
  brandTeamName: 'DAAD FREE Team',
  companyName: 'KOSTAK Healthcare',
};

export interface OrderMessageParams {
  productName: string;
  size: string; // '15g' or '25g'
  pack: string; // 'Single', 'Pack of 2', 'Pack of 4'
  quantity: number;
  unitPrice?: number | null;
  totalAmount?: number | null;
  currencySymbol?: string;
  customWhatsAppNumber?: string;
}

/**
 * Formats clean size string (e.g., ensures '15g' or '25g')
 */
export function formatSizeDisplay(size: string): string {
  if (!size) return '25g';
  const clean = size.toLowerCase();
  if (clean.includes('15')) return '15g';
  if (clean.includes('25')) return '25g';
  return size;
}

/**
 * Formats pack display (e.g., 'Single', 'Pack of 2', 'Pack of 4')
 */
export function formatPackDisplay(pack: string): string {
  if (!pack) return 'Single';
  const clean = pack.toLowerCase();
  if (clean.includes('4')) return 'Pack of 4';
  if (clean.includes('2')) return 'Pack of 2';
  return 'Single';
}

/**
 * Generates the standardized customer order message as required:
 *
 * Hello DAAD FREE Team,
 * I want to place an order.
 * 
 * Product: [Product Name]
 * Size: [Size]
 * Pack: [Pack]
 * Quantity: [Quantity]
 * Total Amount: [Amount]
 * 
 * Please confirm my order and delivery details.
 */
export function generateOrderMessage(params: OrderMessageParams): string {
  const currency = params.currencySymbol || '₹';
  const sizeText = formatSizeDisplay(params.size);
  const packText = formatPackDisplay(params.pack);
  
  let amountText = 'Contact for price';
  if (params.totalAmount != null && !isNaN(params.totalAmount)) {
    amountText = `${currency}${params.totalAmount}`;
  } else if (params.unitPrice != null && !isNaN(params.unitPrice)) {
    amountText = `${currency}${params.unitPrice * params.quantity}`;
  }

  const lines = [
    `Hello ${WHATSAPP_BUSINESS.brandTeamName},`,
    `I want to place an order.`,
    ``,
    `Product: ${params.productName}`,
    `Size: ${sizeText}`,
    `Pack: ${packText}`,
    `Quantity: ${params.quantity}`,
    `Total Amount: ${amountText}`,
    ``,
    `Please confirm my order and delivery details.`
  ];

  return lines.join('\n');
}

/**
 * Generates cross-platform WhatsApp Click-to-Chat URL
 * Works on:
 * - Android (opens WhatsApp native app)
 * - iPhone / iOS (opens WhatsApp native app via Universal Links)
 * - Desktop Chrome / Edge / Safari / Firefox (opens WhatsApp Web or Desktop application)
 */
export function generateWhatsAppOrderUrl(params: OrderMessageParams): string {
  const targetNumber = (params.customWhatsAppNumber || WHATSAPP_BUSINESS.fullNumber).replace(/[^\d]/g, '');
  const message = generateOrderMessage(params);
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
}
