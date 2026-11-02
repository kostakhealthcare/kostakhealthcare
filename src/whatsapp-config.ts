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
  brandTeamName: 'DAAD FREE टीम',
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
 * Formats clean size string in Hindi (e.g., '25 ग्राम' or '15 ग्राम')
 */
export function formatSizeDisplay(size: string): string {
  if (!size) return '25 ग्राम';
  const clean = size.toLowerCase();
  if (clean.includes('15')) return '15 ग्राम';
  if (clean.includes('25')) return '25 ग्राम';
  return size;
}

/**
 * Formats pack display in Hindi (e.g., '1 जार (मानक)', '2 जार का पैक', '4 जार का पारिवारिक पैक')
 */
export function formatPackDisplay(pack: string): string {
  if (!pack) return '1 जार (मानक)';
  const clean = pack.toLowerCase();
  if (clean.includes('4') || clean.includes('चार')) return '4 जार का पारिवारिक बचत पैक';
  if (clean.includes('2') || clean.includes('दो')) return '2 जार का पैक';
  return '1 जार (मानक)';
}

/**
 * Generates the standardized Hindi customer order message:
 *
 * नमस्ते DAAD FREE टीम,
 * मैं ऑर्डर देना चाहता/चाहती हूँ:
 * 
 * उत्पाद: [Product Name]
 * साइज़: [Size]
 * पैक: [Pack]
 * मात्रा: [Quantity]
 * कुल राशि: [Amount]
 * 
 * कृपया मेरे ऑर्डर और डिलीवरी विवरण की पुष्टि करें। धन्यवाद!
 */
export function generateOrderMessage(params: OrderMessageParams): string {
  const currency = params.currencySymbol || '₹';
  const sizeText = formatSizeDisplay(params.size);
  const packText = formatPackDisplay(params.pack);
  
  let amountText = 'मूल्य हेतु संपर्क करें';
  if (params.totalAmount != null && !isNaN(params.totalAmount)) {
    amountText = `${currency}${params.totalAmount}`;
  } else if (params.unitPrice != null && !isNaN(params.unitPrice)) {
    amountText = `${currency}${params.unitPrice * params.quantity}`;
  }

  const lines = [
    `नमस्ते ${WHATSAPP_BUSINESS.brandTeamName},`,
    `मैं ऑर्डर देना चाहता/चाहती हूँ:`,
    ``,
    `उत्पाद: ${params.productName}`,
    `साइज़: ${sizeText}`,
    `पैक: ${packText}`,
    `मात्रा: ${params.quantity}`,
    `कुल राशि: ${amountText}`,
    ``,
    `कृपया मेरे ऑर्डर और डिलीवरी विवरण की पुष्टि करें। धन्यवाद!`
  ];

  return lines.join('\n');
}

/**
 * Generates cross-platform WhatsApp Click-to-Chat URL
 * Works on Android, iPhone / iOS, and Desktop Chrome / Edge / Safari / Firefox
 */
export function generateWhatsAppOrderUrl(params: OrderMessageParams): string {
  const targetNumber = (params.customWhatsAppNumber || WHATSAPP_BUSINESS.fullNumber).replace(/[^\d]/g, '');
  const message = generateOrderMessage(params);
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
}
