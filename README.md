# Gemora — Premium Jewellery Store

Gemora is a full-featured e-commerce frontend for a premium jewellery brand — rings, necklaces, earrings, bracelets and more. It's a fast, static, vanilla-JavaScript storefront (no framework, no build step) that talks to a REST API backend for products, auth, orders and payments.

**Live site:** https://gemora-jwelry.vercel.app/

## Features

- 🛍️ **Storefront** — home page, category/collection browsing, product listing with filters, and rich product detail pages
- 🔐 **Authentication** — email/password login & registration, Firebase OTP verification, password reset
- 🛒 **Cart & Checkout** — persistent cart, coupon codes, delivery/pincode checking, and Razorpay payment integration
- 📦 **Order management** — order history, order details, order confirmation
- ❤️ **Wishlist** and **recently viewed products**
- 👤 **Profile management** — saved addresses, account details
- 📣 **CMS-driven content** — announcement bar, hero banners, testimonials, contact form, privacy/terms/shipping/returns/warranty pages
- 🔎 **SEO & social sharing** — per-page Open Graph / Twitter meta tags with thumbnail images for rich link previews (WhatsApp, Facebook, Twitter, etc.)
- 📱 Responsive, mobile-first UI built with Tailwind CSS

## Tech Stack

| Layer            | Technology                                      |
| ----------------- | ------------------------------------------------ |
| Markup/Styling    | HTML5, [Tailwind CSS](https://tailwindcss.com/) (CDN), custom CSS |
| Client logic      | Vanilla JavaScript (ES Modules) — no framework, no bundler |
| Carousels/UI      | [Swiper](https://swiperjs.com/)                   |
| Auth              | Firebase (OTP), custom email/password auth against the API |
| Payments          | [Razorpay](https://razorpay.com/)                 |
| Media             | [Cloudinary](https://cloudinary.com/) (product & CMS images) |
| Backend API       | REST API — see `front/src/js/config.js` (separate service) |
| Hosting           | [Vercel](https://vercel.com/)                     |

This project intentionally ships with **no package manager, bundler, or framework** — it's plain HTML/CSS/JS served as static files, which keeps the site fast and the setup trivial.

## Project Structure

```
front/
├── index.html                  # Home page
├── pages/                      # All other routes (one .html file per page)
│   ├── products.html
│   ├── productDetails.html
│   ├── collection.html
│   ├── cart.html
│   ├── checkout.html
│   ├── orders.html / orderDetails.html / orderSuccess.html
│   ├── wishlist.html / profile.html
│   ├── login.html / register.html / auth.html / resetPassword.html
│   ├── contact.html / about.html
│   └── privacy.html / termsAndConditions.html / shipping.html / returns.html / warranty.html
└── src/
    ├── assets/
    │   ├── icon/                # Logo & brand icons
    │   └── images/              # Static imagery (banners, OG image, etc.)
    ├── css/                     # Hand-written stylesheets
    ├── htmlComponents/          # Reusable HTML partials (e.g. auth modal)
    └── js/
        ├── config.js            # Environment-aware API base URL
        ├── main.js              # App entry point
        ├── core/                # Auth state, API client, cart/wishlist counters
        ├── services/            # One module per API resource (products, orders, cart, …)
        ├── features/            # Feature logic (cart, checkout, wishlist, filters, …)
        ├── components/          # Reusable UI components (navbar, footer, cards, …)
        ├── pages/                # Per-page controllers, one per HTML page
        └── utils/                # Small helpers (e.g. Razorpay wrapper)
```

## Getting Started

### Prerequisites

- Any static file server (e.g. the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension, or `npx serve`)
- A running instance of the [Gemora backend API](front/src/js/config.js) (or point `CONFIG.API_BASE` at a hosted instance)

### Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/abdussalam9891/jwelry.git
   cd jwelry
   ```

2. Serve the `front/` directory as a static site.

   - **VS Code Live Server** — this repo ships a `.vscode/settings.json` that roots Live Server at `/front`; just click "Go Live".
   - **Or, with Node:**

     ```bash
     npx serve front
     ```

3. Open the site in your browser (Live Server defaults to `http://127.0.0.1:5500`).

By default, the app talks to `http://localhost:5000/api` when running on `localhost`/`127.0.0.1`/`file:`, and falls back to the production API otherwise (see `front/src/js/config.js`). Run the backend locally on port `5000`, or edit `CONFIG.API_BASE` to point elsewhere.

## Deployment

The site is deployed on **Vercel** with the project root set to `front/`. Any push to `main` redeploys automatically. No build command is required — it's served as-is.

## Contributing

This is a personal/commercial project. If you'd like to propose a change, please open an issue or pull request describing the fix or feature.
