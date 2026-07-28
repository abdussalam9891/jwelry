/**
 * Returns true if the device is a phone or tablet.
 */
export function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768
  );
}

/**
 * Returns true if browser supports
 * the Native Share API.
 */
export function supportsNativeShare() {
  return typeof navigator.share === "function";
}

/**
 * Should we use the native share sheet?
 */
export function shouldUseNativeShare() {
  return (
    isMobileDevice() &&
    supportsNativeShare()
  );
}
