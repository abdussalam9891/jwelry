// Keeps <title>, description, canonical, Open Graph / Twitter tags and
// JSON-LD in sync for pages whose content is loaded by JS.

export const SITE_URL = "https://gemora-jwelry.vercel.app";
export const SITE_NAME = "Gemora";

function setMeta(attr, key, value) {
  if (!value) return;

  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", value);
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = url;
}

function absoluteUrl(url) {
  if (!url) return "";
  return new URL(url, SITE_URL).href;
}

export function updateSeo({ title, description, path, image }) {
  if (title) {
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;
    setMeta("property", "og:title", fullTitle);
    setMeta("name", "twitter:title", fullTitle);
  }

  if (description) {
    const text = description.replace(/\s+/g, " ").trim().slice(0, 160);
    setMeta("name", "description", text);
    setMeta("property", "og:description", text);
    setMeta("name", "twitter:description", text);
  }

  if (path) {
    const url = absoluteUrl(path);
    setCanonical(url);
    setMeta("property", "og:url", url);
  }

  if (image) {
    const src = absoluteUrl(image);
    setMeta("property", "og:image", src);
    setMeta("name", "twitter:image", src);
  }
}

export function setJsonLd(id, data) {
  let script = document.getElementById(id);

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}
