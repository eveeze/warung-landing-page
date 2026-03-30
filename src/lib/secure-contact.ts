/**
 * Secure Contact Utility
 * 
 * Utility untuk mengobfuscate nomor WhatsApp dari scraping otomatis.
 * Menggunakan Base64 encoding untuk menyembunyikan nomor di source code.
 */

// Nomor WA di-encode untuk menghindari scraping langsung
// Original: 62882006706334
const OBFUSCATED_WA_NUMBER = 'NjI4ODIwMDY3MDYzMzQ=';

/**
 * Decode dan return nomor WhatsApp
 * @returns {string} Nomor WhatsApp dalam format internasional (tanpa +)
 */
export function getWhatsAppNumber(): string {
  try {
    // Decode dari Base64
    const decoded = atob(OBFUSCATED_WA_NUMBER);
    return decoded;
  } catch (error) {
    // Fallback jika terjadi error decoding
    console.error('Failed to decode WhatsApp number:', error);
    // Return empty string agar tidak crash app
    return '';
  }
}

/**
 * Generate WhatsApp URL dengan nomor yang sudah di-decode
 * @param {string} message - Message yang akan dikirim (pre-encoded)
 * @returns {string} Complete WhatsApp URL
 */
export function getWhatsAppURL(message: string = ''): string {
  const number = getWhatsAppNumber();
  if (!number) return '#';
  
  const baseURL = 'https://api.whatsapp.com/send';
  const params = new URLSearchParams({
    phone: number,
    ...(message && { text: message }),
  });
  
  return `${baseURL}?${params.toString()}`;
}

/**
 * Generate direct WhatsApp link (for wa.me format)
 * @returns {string} wa.me URL
 */
export function getWhatsAppDirectLink(): string {
  const number = getWhatsAppNumber();
  if (!number) return '#';
  
  return `https://wa.me/${number}`;
}

/**
 * Utility untuk encode nomor baru (untuk maintenance/update)
 * Tidak diexport karena hanya untuk development reference
 * 
 * @example
 * encodeWhatsAppNumber('62882006706334') // Returns: 'NjI4ODIwMDY3MDYzMzQ='
 */
// function encodeWhatsAppNumber(number: string): string {
//   return btoa(number);
// }
