/**
 * Security & Input Sanitization Utilities
 * Prevents NoSQL Injection, XSS, ReDoS (Regular Expression Denial of Service), and Parameter Pollution
 */

/**
 * Escapes all regular expression special characters to prevent ReDoS attacks and regex injection
 */
export const escapeRegex = (text: string): string => {
  if (typeof text !== 'string') return '';
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Strips dangerous HTML tags and encodes special characters to prevent stored XSS attacks
 */
export const sanitizeHtmlString = (text: string): string => {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Safely sanitizes general string input with length boundary enforcement
 */
export const sanitizeString = (text: any, maxLength = 2000): string => {
  if (text === null || text === undefined) return '';
  const str = String(text).trim();
  return str.slice(0, maxLength);
};
