let announcementInterval;

export function initAnnouncementBar() {
  const messages = [
    "Free Shipping Across India",
    "BIS Hallmarked Jewellery",
    "Easy 7-Day Returns",
    "100% Secure Payments",
  ];

  const text =
    document.getElementById(
      "announcementText"
    );

  if (!text) return;

  let index = 0;

  if (announcementInterval) {
    clearInterval(
      announcementInterval
    );
  }

  announcementInterval =
    setInterval(() => {
      index =
        (index + 1) %
        messages.length;

      text.textContent =
        messages[index];
    }, 3500);
}
