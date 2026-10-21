import {
  getShareText,
  getWhatsAppShareUrl,
  getFacebookShareUrl,
  getTwitterShareUrl,
  getEmailShareUrl,
  getTelegramShareUrl,
  getPinterestShareUrl,
} from "./sharePlatforms.js";

export function openShareLink(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function copyProductLink(url) {
  try {
    await navigator.clipboard.writeText(url);

    return {
      success: true,
      message: "Link copied successfully!",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to copy the link.",
    };
  }
}

export async function nativeShare(shareData) {
  if (!navigator.share) return false;

  try {
    await navigator.share({
      title: shareData.title,
      text: getShareText(shareData),
      url: shareData.url,
    });

    return true;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error);
    }

    return true;
  }
}

export function shareToPlatform(platform, shareData) {
  switch (platform) {
    case "whatsapp":
      return openShareLink(getWhatsAppShareUrl(shareData));

    case "facebook":
      return openShareLink(getFacebookShareUrl(shareData));

    case "twitter":
      return openShareLink(getTwitterShareUrl(shareData));

    case "email":
      window.location.href = getEmailShareUrl(shareData);
      return;

    case "telegram":
      return openShareLink(getTelegramShareUrl(shareData));

    case "pinterest":
      return openShareLink(getPinterestShareUrl(shareData));

    default:
      console.warn(`Unknown share platform: ${platform}`);
  }
}

export async function shareProduct(shareData) {
  return await nativeShare(shareData);
}
