/**
 * Returns the formatted share text.
 */
export function getShareText(shareData) {
  return `Check out this beautiful jewellery from Gemora!

${shareData.title}`;
}

/**
 * WhatsApp
 */
export function getWhatsAppShareUrl(shareData) {
  return `https://wa.me/?text=${encodeURIComponent(
    getShareText(shareData)
  )}`;
}

/**
 * Facebook
 */
export function getFacebookShareUrl(shareData) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareData.url
  )}`;
}

/**
 * X (Twitter)
 */
export function getTwitterShareUrl(shareData) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareData.title
  )}&url=${encodeURIComponent(shareData.url)}`;
}

/**
 * Email
 */
export function getEmailShareUrl(shareData) {
  return `mailto:?subject=${encodeURIComponent(
    shareData.title
  )}&body=${encodeURIComponent(getShareText(shareData))}`;
}

/**
 * Telegram
 */
export function getTelegramShareUrl(shareData) {
  return `https://t.me/share/url?url=${encodeURIComponent(
    shareData.url
  )}&text=${encodeURIComponent(shareData.title)}`;
}

/**
 * Pinterest
 */
export function getPinterestShareUrl(shareData) {
  return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
    shareData.url
  )}&media=${encodeURIComponent(
    shareData.image || ""
  )}&description=${encodeURIComponent(
    shareData.title
  )}`;
}
