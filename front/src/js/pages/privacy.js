import { getCMSPage } from "../services/cmsService.js";

const titleEl = document.getElementById("page-title");
const contentEl = document.getElementById("cms-content");

document.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    // The loading skeleton is static HTML in the page.
    const page = await getCMSPage("privacy-policy");

    if (!page) {
      renderNotFound();
      return;
    }

    updateSEO(page);
    renderPage(page);
  } catch (error) {
    console.error(error);
    renderError();
  }
}

function renderPage(page) {
  titleEl.textContent = page.title;

  if (!page.sections?.length) {
    contentEl.innerHTML = `
      <p class="text-black/60 text-lg">
        No content available.
      </p>
    `;
    return;
  }

  contentEl.innerHTML = page.sections
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map(
      (section) => `
        <section class="mb-10">
          ${
            section.title
              ? `
            <h2 class="mb-3 text-[1.1rem] font-medium text-black">
              ${section.title}
            </h2>
          `
              : ""
          }

          <div class="prose prose-neutral max-w-none leading-relaxed text-black/70">
            ${section.content || ""}
          </div>
        </section>
      `
    )
    .join("");
}

function updateSEO(page) {
  document.title =
    page.seo?.metaTitle || `${page.title} | Gemora`;

  updateMeta("description", page.seo?.metaDescription);

  updateMeta(
    "keywords",
    Array.isArray(page.seo?.keywords)
      ? page.seo.keywords.join(", ")
      : page.seo?.keywords
  );

  updateProperty(
    "og:title",
    page.seo?.metaTitle || `${page.title} | Gemora`
  );

  updateProperty(
    "og:description",
    page.seo?.metaDescription
  );

  updateProperty(
    "twitter:title",
    page.seo?.metaTitle || `${page.title} | Gemora`
  );

  updateProperty(
    "twitter:description",
    page.seo?.metaDescription
  );
}

function updateMeta(name, value) {
  if (!value) return;

  const tag = document.querySelector(`meta[name="${name}"]`);

  if (tag) {
    tag.setAttribute("content", value);
  }
}

function updateProperty(property, value) {
  if (!value) return;

  const tag = document.querySelector(`meta[property="${property}"]`);

  if (tag) {
    tag.setAttribute("content", value);
  }
}

function renderError() {
  titleEl.textContent = "Privacy Policy";

  contentEl.innerHTML = `
    <div class="rounded-2xl border border-red-100 bg-red-50 p-6">
      <h2 class="mb-2 text-lg font-semibold text-red-700">
        Unable to load page
      </h2>

      <p class="text-red-600">
        Please try again later.
      </p>
    </div>
  `;
}

function renderNotFound() {
  titleEl.textContent = "Privacy Policy";

  contentEl.innerHTML = `
    <div class="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 class="mb-2 text-lg font-semibold">
        Page Not Found
      </h2>

      <p class="text-black/60">
        This page is currently unavailable.
      </p>
    </div>
  `;
}
