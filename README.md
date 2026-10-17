# Gemora — Premium Jewellery Store

Gemora is a full-featured e-commerce frontend for a premium jewellery brand — rings, necklaces, earrings, bracelets and more. It's a Next.js (App Router, plain JavaScript) storefront that talks to a REST API backend for products, auth, orders and payments.

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
- 📱 Responsive, mobile-first UI built with React and Tailwind CSS

## Tech Stack

| Layer          | Technology                                                          |
| -------------- | ------------------------------------------------------------------- |
| Framework      | [Next.js](https://nextjs.org/) (App Router), React, JavaScript (no TypeScript) |
| Styling        | [Tailwind CSS](https://tailwindcss.com/) v3 (PostCSS), global CSS in `src/app/globals.css` |
| Carousels      | [Swiper](https://swiperjs.com/)                                     |
| Auth           | Firebase phone OTP, email/password and Google OAuth against the API |
| Payments       | [Razorpay](https://razorpay.com/)                                   |
| Media          | [Cloudinary](https://cloudinary.com/) (product & CMS images)        |
| Backend API    | Separate REST service — see `src/lib/config.js`                    |
| Hosting        | [Vercel](https://vercel.com/)                                       |

## Project Structure

```
public/assets/            # Static images, icons, video
src/
├── app/
│   ├── layout.js         # Root layout: fonts, global CSS, providers, default SEO
│   ├── (store)/          # Pages with navbar + footer (home, products, cart, ...)
│   └── (standalone)/     # Full-screen pages (login, register, auth callback, ...)
├── components/           # UI, grouped by area (layout, product, cart, account, ...)
├── context/              # Auth, cart, wishlist and toast state (React context)
├── hooks/                # Reusable hooks (product listing, phone OTP, scroll lock)
├── data/                 # Static navigation, banner and size-guide data
└── lib/                  # API client, services per resource, helpers
```

### Routes

| Route                          | Old URL                                   |
| ------------------------------ | ----------------------------------------- |
| `/products`, `/products/[slug]` | `/pages/products.html`, `/pages/productDetails.html?slug=` |
| `/collections/[slug]`          | `/pages/collection.html?slug=`            |
| `/orders`, `/orders/[id]`      | `/pages/orders.html`, `/pages/orderDetails.html?id=` |
| `/terms`, `/reset-password`    | `/pages/termsAndConditions.html`, `/pages/resetPassword.html` |
| `/cart`, `/checkout`, `/login`, … | `/pages/<name>.html`                     |

Every old `/pages/*.html` URL permanently redirects to its new route (see `next.config.mjs`), so emails, OAuth callbacks and existing links keep working.

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

On `localhost` the app calls `http://localhost:5000/api`; elsewhere it calls the production API. Override with `NEXT_PUBLIC_API_BASE` (see `.env.example`).

To develop against the deployed API (its CORS policy only allows the production site), proxy it through Next.js by creating `.env.local`:

```
API_PROXY_TARGET=https://jwelry-backend.onrender.com/api
NEXT_PUBLIC_API_BASE=/api
```

## Deployment

Deployed on **Vercel**. The project root is the repository root and the framework preset is **Next.js** (the old setup served `front/` as static files).

## Contributing

This is a personal/commercial project. If you'd like to propose a change, please open an issue or pull request describing the fix or feature.
