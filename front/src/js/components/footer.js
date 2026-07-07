// function loadFooter() {
//   const footerHTML = `
//       <footer class="bg-[#5A1E2A] text-white pt-20 pb-10  ">
//       <div class="container-main">
//         <!-- Top Divider -->
//         <div
//           class="h-[1px] bg-gradient-to-r from-transparent via-[#C6A96A] to-transparent mb-16"
//         ></div>

//         <!-- Grid -->
//         <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
//           <!-- Brand -->
//           <div>
//             <h3 class="text-[1.6rem] font-light mb-4 tracking-wide">GEMORA</h3>
//             <p class="text-sm text-white/70 leading-relaxed max-w-xs">
//               Timeless jewellery crafted to celebrate every moment — blending
//               tradition with modern elegance.
//             </p>
//           </div>

//           <!-- Shop -->
//           <div>
//             <h4 class="text-sm tracking-wide uppercase mb-5 text-white/90">
//               Shop
//             </h4>
//             <ul class="space-y-3 text-sm text-white/70">
//               <li><a href="/pages/products.html?category=rings" class="hover:text-white transition">Rings</a></li>
//               <li>
//                 <a href="/pages/products.html?category=neckwears" class="hover:text-white transition">Neckwears</a>
//               </li>
//               <li>
//                 <a href="/pages/products.html?category=earrings" class="hover:text-white transition">Earrings</a>
//               </li>
//               <li>
//                 <a href="/pages/products.html?category=bracelets" class="hover:text-white transition">Bracelets</a>
//               </li>
//             </ul>
//           </div>

//           <!-- Info -->
//           <div>
//             <h4 class="text-sm tracking-wide uppercase mb-5 text-white/90">
//               Information
//             </h4>
//             <ul class="space-y-3 text-sm text-white/70">
//               <li>
//                 <a href="/pages/about.html" class="hover:text-white transition">About Us</a>
//               </li>
//               <li>
//                 <a href="/pages/contact.html" class="hover:text-white transition">Contact</a>
//               </li>
//               <li>
//                 <a href="/pages/shipping.html" class="hover:text-white transition">Shipping</a>
//               </li>
//               <li>
//                 <a href="/pages/returns.html" class="hover:text-white transition">Returns</a>
//               </li>
//                <li>
//                 <a href="/pages/warranty.html" class="hover:text-white transition">Warranty</a>
//               </li>
//             </ul>
//           </div>

//           <!-- Contact -->
//           <div>
//             <h4 class="text-sm tracking-wide uppercase mb-5 text-white/90">
//               Contact
//             </h4>

//             <p class="text-sm text-white/70 mb-3">support@gemora.com</p>
//             <p class="text-sm text-white/70 mb-5">+91 98765 43210</p>

//             <!-- Social -->
//             <div class="flex gap-4">
//               <a href="https://www.instagram.com/gemorajewellry/"  target="_blank"
//   rel="noopener noreferrer"
//   aria-label="Visit Gemora on Instagram" class="hover:text-[#C6A96A] transition">
//                 <svg class="w-5 h-5" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
//                   <path
//                     d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
//                   />
//                 </svg>
//               </a>

//               <a href="https://pinterest.com/"   target="_blank"
//   rel="noopener noreferrer"
//   aria-label="Visit Gemora on Pinterest" class="hover:text-[#C6A96A] transition">
//                 <svg class="w-5 h-5" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
//                   <path
//                     d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"
//                   />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>

//         <!-- Bottom -->
//         <div
//           class="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60"
//         >
//           <p>© 2026 Gemora. All rights reserved.</p>

//           <div class="flex gap-6">
//             <a href="/pages/privacy.html" class="hover:text-white transition">Privacy Policy</a>
//             <a href="/pages/termsAndConditions.html" class="hover:text-white transition">Terms & Conditions</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   `;

//   document.getElementById("footer-container").innerHTML = footerHTML;
// }

// loadFooter();









// import {
//   jewelleryNavigation,
//   moreCategories,
//   collections,
// } from "./navbar/navbarNavigation.js"

// function loadFooter() {
//   const shopLinks = jewelleryNavigation
//     .map(
//       (cat) => `
//       <li>
//         <a href="/pages/products.html?category=${cat.category}" class="hover:text-white transition-colors">
//           ${cat.label}
//         </a>
//       </li>`
//     )
//     .join("");

//   const collectionLinks = collections
//     .slice(0, 5)
//     .map(
//       (col) => `
//       <li>
//         <a href="/pages/collection.html?slug=${col.slug}" class="hover:text-white transition-colors">
//           ${col.name}
//         </a>
//       </li>`
//     )
//     .join("");

//   const moreLinks = moreCategories
//     .map(
//       (cat) => `
//       <li>
//         <a href="/pages/products.html?category=${cat.category}" class="hover:text-white transition-colors">
//           ${cat.label}
//         </a>
//       </li>`
//     )
//     .join("");

//   const year = new Date().getFullYear();

//   const footerHTML = `
//   <footer class="bg-[#5A1E2A] text-white pt-14 pb-8">
//     <div class="container-main">

//       <!-- Newsletter strip -->
//       <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-10 border-b border-white/10">
//         <div>
//           <p class="text-[0.95rem] font-light tracking-wide">Join the Gemora list</p>
//           <p class="text-xs text-white/50 mt-1">New arrivals, early access, no spam.</p>
//         </div>
//         <form class="flex w-full md:w-auto max-w-sm" onsubmit="return false;">
//           <input
//             type="email"
//             required
//             placeholder="Your email address"
//             class="flex-1 bg-transparent border border-white/20 focus:border-[#C6A96A] outline-none text-sm px-4 py-2.5 placeholder:text-white/40 transition-colors"
//           />
//           <button
//             type="submit"
//             class="border border-l-0 border-white/20 px-5 text-xs uppercase tracking-wide hover:bg-[#C6A96A] hover:border-[#C6A96A] hover:text-[#5A1E2A] transition-colors"
//           >
//             Join
//           </button>
//         </form>
//       </div>

//       <!-- Main grid -->
//       <div class="grid md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-8 py-10">

//         <!-- Brand -->
//         <div class="lg:col-span-3">
//           <h3 class="text-[1.4rem] font-light mb-3 tracking-wide">GEMORA</h3>
//           <p class="text-sm text-white/60 leading-relaxed max-w-xs mb-5">
//             Timeless jewellery crafted to celebrate every moment.
//           </p>
//           <div class="flex gap-4">
//             <a href="https://www.instagram.com/gemorajewellry/" target="_blank" rel="noopener noreferrer"
//               aria-label="Visit Gemora on Instagram" class="text-white/60 hover:text-[#C6A96A] transition-colors">
//               <svg class="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
//                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//               </svg>
//             </a>
//             <!-- TODO: replace with real Gemora Pinterest profile URL before launch -->
//             <a href="https://pinterest.com/gemorajewellry/" target="_blank" rel="noopener noreferrer"
//               aria-label="Visit Gemora on Pinterest" class="text-white/60 hover:text-[#C6A96A] transition-colors">
//               <svg class="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
//                 <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
//               </svg>
//             </a>
//           </div>
//         </div>

//         <!-- Shop -->
//         <div class="lg:col-span-2">
//           <details class="lg:pointer-events-none" open>
//             <summary class="text-xs tracking-[0.15em] uppercase text-white/80 mb-4 cursor-pointer lg:cursor-default list-none [&::-webkit-details-marker]:hidden flex justify-between lg:block">
//               Shop
//               <span class="lg:hidden text-white/40">+</span>
//             </summary>
//             <ul class="space-y-2.5 text-sm text-white/60 mt-3 lg:mt-0">
//               ${shopLinks}
//               <li>
//                 <a href="/pages/products.html" class="text-[#C6A96A] hover:text-white transition-colors">View All →</a>
//               </li>
//             </ul>
//           </details>
//         </div>

//         <!-- Collections -->
//         <div class="lg:col-span-2">
//           <details class="lg:pointer-events-none" open>
//             <summary class="text-xs tracking-[0.15em] uppercase text-white/80 mb-4 cursor-pointer lg:cursor-default list-none [&::-webkit-details-marker]:hidden flex justify-between lg:block">
//               Collections
//               <span class="lg:hidden text-white/40">+</span>
//             </summary>
//             <ul class="space-y-2.5 text-sm text-white/60 mt-3 lg:mt-0">
//               ${collectionLinks}
//             </ul>
//           </details>
//         </div>

//         <!-- More Categories -->
//         <div class="lg:col-span-2">
//           <details class="lg:pointer-events-none" open>
//             <summary class="text-xs tracking-[0.15em] uppercase text-white/80 mb-4 cursor-pointer lg:cursor-default list-none [&::-webkit-details-marker]:hidden flex justify-between lg:block">
//               Explore
//               <span class="lg:hidden text-white/40">+</span>
//             </summary>
//             <ul class="space-y-2.5 text-sm text-white/60 mt-3 lg:mt-0">
//               ${moreLinks}
//             </ul>
//           </details>
//         </div>

//         <!-- Company + Contact -->
//         <div class="lg:col-span-3">
//           <details class="lg:pointer-events-none" open>
//             <summary class="text-xs tracking-[0.15em] uppercase text-white/80 mb-4 cursor-pointer lg:cursor-default list-none [&::-webkit-details-marker]:hidden flex justify-between lg:block">
//               Company
//               <span class="lg:hidden text-white/40">+</span>
//             </summary>
//             <ul class="space-y-2.5 text-sm text-white/60 mt-3 lg:mt-0">
//               <li><a href="/pages/about.html" class="hover:text-white transition-colors">About Us</a></li>
//               <li><a href="/pages/contact.html" class="hover:text-white transition-colors">Contact</a></li>
//               <li><a href="/pages/shipping.html" class="hover:text-white transition-colors">Shipping</a></li>
//               <li><a href="/pages/returns.html" class="hover:text-white transition-colors">Returns</a></li>
//               <li><a href="/pages/warranty.html" class="hover:text-white transition-colors">Warranty</a></li>
//             </ul>
//           </details>
//           <div class="mt-5 pt-5 border-t border-white/10 lg:border-none lg:pt-0 lg:mt-6 text-sm text-white/60 space-y-1.5">
//             <p>support@gemora.com</p>
//             <p>+91 98765 43210</p>
//           </div>
//         </div>
//       </div>

//       <!-- Trust strip -->
//       <div class="flex flex-wrap gap-x-8 gap-y-3 py-6 border-y border-white/10 text-[0.7rem] tracking-wide uppercase text-white/50">
//         <span>BIS Hallmarked Jewellery</span>
//         <span>Secure Payments via Razorpay</span>
//         <span>Free Insured Shipping</span>
//         <span>15-Day Easy Returns</span>
//       </div>

//       <!-- Bottom bar -->
//       <div class="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
//         <p>© ${year} Gemora. All rights reserved.</p>
//         <div class="flex gap-6">
//           <a href="/pages/privacy.html" class="hover:text-white transition-colors">Privacy Policy</a>
//           <a href="/pages/termsAndConditions.html" class="hover:text-white transition-colors">Terms &amp; Conditions</a>
//         </div>
//       </div>
//     </div>
//   </footer>
//   `;

//   document.getElementById("footer-container").innerHTML = footerHTML;
// }

// loadFooter();




// import {
//   jewelleryNavigation,
//   moreCategories,
//   collections,
// } from "./navbar/navbarNavigation.js";

// function loadFooter() {
//   const shopLinks = jewelleryNavigation
//     .map(
//       (cat) => `
//       <li>
//         <a href="/pages/products.html?category=${cat.category}" class="hover:text-white transition-colors">
//           ${cat.label}
//         </a>
//       </li>`
//     )
//     .join("");

//   const collectionLinks = collections
//     .slice(0, 5)
//     .map(
//       (col) => `
//       <li>
//         <a href="/pages/collection.html?slug=${col.slug}" class="hover:text-white transition-colors">
//           ${col.name}
//         </a>
//       </li>`
//     )
//     .join("");

//   const moreLinks = moreCategories
//     .map(
//       (cat) => `
//       <li>
//         <a href="/pages/products.html?category=${cat.category}" class="hover:text-white transition-colors">
//           ${cat.label}
//         </a>
//       </li>`
//     )
//     .join("");

//   const year = new Date().getFullYear();

//   const footerHTML = `
//   <footer class="bg-[#5A1E2A] text-white pt-14 pb-8">
//     <div class="container-main">

//       <!-- Newsletter strip -->
//       <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-10 border-b border-white/10">
//         <div>
//           <p class="text-[0.95rem] font-light tracking-wide">Join the Gemora list</p>
//           <p class="text-xs text-white/50 mt-1">New arrivals, early access, no spam.</p>
//         </div>
//         <form class="flex w-full md:w-auto max-w-sm" onsubmit="return false;">
//           <input
//             type="email"
//             required
//             placeholder="Your email address"
//             class="flex-1 bg-transparent border border-white/20 focus:border-[#C6A96A] outline-none text-sm px-4 py-2.5 placeholder:text-white/40 transition-colors"
//           />
//           <button
//             type="submit"
//             class="border border-l-0 border-white/20 px-5 text-xs uppercase tracking-wide hover:bg-[#C6A96A] hover:border-[#C6A96A] hover:text-[#5A1E2A] transition-colors"
//           >
//             Join
//           </button>
//         </form>
//       </div>

//       <!-- Main grid -->
//       <div class="grid md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-8 py-10">

//         <!-- Brand -->
//         <div class="lg:col-span-3">
//           <h3 class="text-[1.4rem] font-light mb-3 tracking-wide">GEMORA</h3>
//           <p class="text-sm text-white/60 leading-relaxed max-w-xs mb-5">
//             Timeless jewellery crafted to celebrate every moment.
//           </p>
//           <div class="flex gap-4">
//             <a href="https://www.instagram.com/gemorajewellry/" target="_blank" rel="noopener noreferrer"
//               aria-label="Visit Gemora on Instagram" class="text-white/60 hover:text-[#C6A96A] transition-colors">
//               <svg class="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
//                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//               </svg>
//             </a>
//             <!-- TODO: replace with real Gemora Pinterest profile URL before launch -->
//             <a href="https://pinterest.com/gemorajewellry/" target="_blank" rel="noopener noreferrer"
//               aria-label="Visit Gemora on Pinterest" class="text-white/60 hover:text-[#C6A96A] transition-colors">
//               <svg class="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
//                 <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
//               </svg>
//             </a>
//           </div>
//         </div>

//         <!-- Shop -->
//         <div class="lg:col-span-2">
//           <details open>
//             <summary class="text-xs tracking-[0.15em] uppercase text-white/80 mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden flex justify-between lg:block">
//               Shop
//               <span class="lg:hidden text-white/40">+</span>
//             </summary>
//             <ul class="space-y-2.5 text-sm text-white/60 mt-3 lg:mt-0 lg:pointer-events-auto">
//               ${shopLinks}
//               <li>
//                 <a href="/pages/products.html" class="text-[#C6A96A] hover:text-white transition-colors">View All →</a>
//               </li>
//             </ul>
//           </details>
//         </div>

//         <!-- Collections -->
//         <div class="lg:col-span-2">
//           <details open>
//             <summary class="text-xs tracking-[0.15em] uppercase text-white/80 mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden flex justify-between lg:block">
//               Collections
//               <span class="lg:hidden text-white/40">+</span>
//             </summary>
//             <ul class="space-y-2.5 text-sm text-white/60 mt-3 lg:mt-0 lg:pointer-events-auto">
//               ${collectionLinks}
//             </ul>
//           </details>
//         </div>

//         <!-- More Categories -->
//         <div class="lg:col-span-2">
//           <details open>
//             <summary class="text-xs tracking-[0.15em] uppercase text-white/80 mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden flex justify-between lg:block">
//               Explore
//               <span class="lg:hidden text-white/40">+</span>
//             </summary>
//             <ul class="space-y-2.5 text-sm text-white/60 mt-3 lg:mt-0 lg:pointer-events-auto">
//               ${moreLinks}
//             </ul>
//           </details>
//         </div>

//         <!-- Company + Contact -->
//         <div class="lg:col-span-3">
//           <details open>
//             <summary class="text-xs tracking-[0.15em] uppercase text-white/80 mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden flex justify-between lg:block">
//               Company
//               <span class="lg:hidden text-white/40">+</span>
//             </summary>
//             <ul class="space-y-2.5 text-sm text-white/60 mt-3 lg:mt-0 lg:pointer-events-auto">
//               <li><a href="/pages/about.html" class="hover:text-white transition-colors">About Us</a></li>
//               <li><a href="/pages/contact.html" class="hover:text-white transition-colors">Contact</a></li>
//               <li><a href="/pages/shipping.html" class="hover:text-white transition-colors">Shipping</a></li>
//               <li><a href="/pages/returns.html" class="hover:text-white transition-colors">Returns</a></li>
//               <li><a href="/pages/warranty.html" class="hover:text-white transition-colors">Warranty</a></li>
//             </ul>
//           </details>
//           <div class="mt-5 pt-5 border-t border-white/10 lg:border-none lg:pt-0 lg:mt-6 text-sm text-white/60 space-y-1.5">
//             <p>support@gemora.com</p>
//             <p>+91 98765 43210</p>
//           </div>
//         </div>
//       </div>

//       <!-- Trust strip -->
//       <div class="flex flex-wrap gap-x-8 gap-y-3 py-6 border-y border-white/10 text-[0.7rem] tracking-wide uppercase text-white/50">
//         <span>BIS Hallmarked Jewellery</span>
//         <span>Secure Payments via Razorpay</span>
//         <span>Free Insured Shipping</span>
//         <span>15-Day Easy Returns</span>
//       </div>

//       <!-- Bottom bar -->
//       <div class="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
//         <p>© ${year} Gemora. All rights reserved.</p>
//         <div class="flex gap-6">
//           <a href="/pages/privacy.html" class="hover:text-white transition-colors">Privacy Policy</a>
//           <a href="/pages/termsAndConditions.html" class="hover:text-white transition-colors">Terms &amp; Conditions</a>
//         </div>
//       </div>
//     </div>
//   </footer>
//   `;

//   document.getElementById("footer-container").innerHTML = footerHTML;
// }

// loadFooter();





// ⚠️ Adjust this import path to match your actual project structure
// import {
//   jewelleryNavigation,
//   moreCategories,
//   collections,
// } from "./navbar/navbarNavigation.js";

// function loadFooter() {
//   const shopLinks = jewelleryNavigation
//     .map(
//       (cat) => `
//       <li>
//         <a href="/pages/products.html?category=${cat.category}" class="hover:text-[#5A1E2A] transition-colors">
//           ${cat.label}
//         </a>
//       </li>`
//     )
//     .join("");

//   const collectionLinks = collections
//     .slice(0, 5)
//     .map(
//       (col) => `
//       <li>
//         <a href="/pages/collection.html?slug=${col.slug}" class="hover:text-[#5A1E2A] transition-colors">
//           ${col.name}
//         </a>
//       </li>`
//     )
//     .join("");

//   const moreLinks = moreCategories
//     .map(
//       (cat) => `
//       <li>
//         <a href="/pages/products.html?category=${cat.category}" class="hover:text-[#5A1E2A] transition-colors">
//           ${cat.label}
//         </a>
//       </li>`
//     )
//     .join("");

//   const year = new Date().getFullYear();

//   const footerHTML = `
//   <footer class="bg-[#FAF7F2] text-[#3A2B2E] pt-14 pb-8 border-t border-[#5A1E2A]/10">
//     <div class="container-main">

//       <!-- Newsletter strip -->
//       <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-10 border-b border-[#5A1E2A]/10">
//         <div>
//           <p class="text-[0.95rem] font-light tracking-wide text-[#5A1E2A]">Join the Gemora list</p>
//           <p class="text-xs text-[#3A2B2E]/50 mt-1">New arrivals, early access, no spam.</p>
//         </div>
//         <form class="flex w-full md:w-auto max-w-sm" onsubmit="return false;">
//           <input
//             type="email"
//             required
//             placeholder="Your email address"
//             class="flex-1 bg-white border border-[#5A1E2A]/15 focus:border-[#C6A96A] outline-none text-sm px-4 py-2.5 placeholder:text-[#3A2B2E]/40 transition-colors"
//           />
//           <button
//             type="submit"
//             class="bg-[#5A1E2A] text-white border border-l-0 border-[#5A1E2A] px-5 text-xs uppercase tracking-wide hover:bg-[#C6A96A] hover:border-[#C6A96A] hover:text-[#3A2B2E] transition-colors"
//           >
//             Join
//           </button>
//         </form>
//       </div>

//       <!-- Main grid -->
//       <div class="grid md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-8 py-10">

//         <!-- Brand -->
//         <div class="lg:col-span-3">
//           <h3 class="text-[1.4rem] font-light mb-3 tracking-wide text-[#5A1E2A]">GEMORA</h3>
//           <p class="text-sm text-[#3A2B2E]/60 leading-relaxed max-w-xs mb-5">
//             Timeless jewellery crafted to celebrate every moment.
//           </p>
//           <div class="flex gap-4">
//             <a href="https://www.instagram.com/gemorajewellry/" target="_blank" rel="noopener noreferrer"
//               aria-label="Visit Gemora on Instagram" class="text-[#3A2B2E]/50 hover:text-[#5A1E2A] transition-colors">
//               <svg class="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
//                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//               </svg>
//             </a>
//             <!-- TODO: replace with real Gemora Pinterest profile URL before launch -->
//             <a href="https://pinterest.com/gemorajewellry/" target="_blank" rel="noopener noreferrer"
//               aria-label="Visit Gemora on Pinterest" class="text-[#3A2B2E]/50 hover:text-[#5A1E2A] transition-colors">
//               <svg class="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
//                 <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
//               </svg>
//             </a>
//           </div>
//         </div>

//         <!-- Shop -->
//         <div class="lg:col-span-2">
//           <details open>
//             <summary class="text-xs tracking-[0.15em] uppercase text-[#3A2B2E]/70 mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden flex justify-between lg:block">
//               Shop
//               <span class="lg:hidden text-[#3A2B2E]/30">+</span>
//             </summary>
//             <ul class="space-y-2.5 text-sm text-[#3A2B2E]/60 mt-3 lg:mt-0 lg:pointer-events-auto">
//               ${shopLinks}
//               <li>
//                 <a href="/pages/products.html" class="text-[#5A1E2A] font-medium hover:text-[#C6A96A] transition-colors">View All →</a>
//               </li>
//             </ul>
//           </details>
//         </div>

//         <!-- Collections -->
//         <div class="lg:col-span-2">
//           <details open>
//             <summary class="text-xs tracking-[0.15em] uppercase text-[#3A2B2E]/70 mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden flex justify-between lg:block">
//               Collections
//               <span class="lg:hidden text-[#3A2B2E]/30">+</span>
//             </summary>
//             <ul class="space-y-2.5 text-sm text-[#3A2B2E]/60 mt-3 lg:mt-0 lg:pointer-events-auto">
//               ${collectionLinks}
//             </ul>
//           </details>
//         </div>

//         <!-- More Categories -->
//         <div class="lg:col-span-2">
//           <details open>
//             <summary class="text-xs tracking-[0.15em] uppercase text-[#3A2B2E]/70 mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden flex justify-between lg:block">
//               Explore
//               <span class="lg:hidden text-[#3A2B2E]/30">+</span>
//             </summary>
//             <ul class="space-y-2.5 text-sm text-[#3A2B2E]/60 mt-3 lg:mt-0 lg:pointer-events-auto">
//               ${moreLinks}
//             </ul>
//           </details>
//         </div>

//         <!-- Company + Contact -->
//         <div class="lg:col-span-3">
//           <details open>
//             <summary class="text-xs tracking-[0.15em] uppercase text-[#3A2B2E]/70 mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden flex justify-between lg:block">
//               Company
//               <span class="lg:hidden text-[#3A2B2E]/30">+</span>
//             </summary>
//             <ul class="space-y-2.5 text-sm text-[#3A2B2E]/60 mt-3 lg:mt-0 lg:pointer-events-auto">
//               <li><a href="/pages/about.html" class="hover:text-[#5A1E2A] transition-colors">About Us</a></li>
//               <li><a href="/pages/contact.html" class="hover:text-[#5A1E2A] transition-colors">Contact</a></li>
//               <li><a href="/pages/shipping.html" class="hover:text-[#5A1E2A] transition-colors">Shipping</a></li>
//               <li><a href="/pages/returns.html" class="hover:text-[#5A1E2A] transition-colors">Returns</a></li>
//               <li><a href="/pages/warranty.html" class="hover:text-[#5A1E2A] transition-colors">Warranty</a></li>
//             </ul>
//           </details>
//           <div class="mt-5 pt-5 border-t border-[#5A1E2A]/10 lg:border-none lg:pt-0 lg:mt-6 text-sm text-[#3A2B2E]/60 space-y-1.5">
//             <p>support@gemora.com</p>
//             <p>+91 98765 43210</p>
//           </div>
//         </div>
//       </div>

//       <!-- Trust strip -->
//       <div class="flex flex-wrap gap-x-8 gap-y-3 py-6 border-y border-[#5A1E2A]/10 text-[0.7rem] tracking-wide uppercase text-[#3A2B2E]/45">
//         <span>BIS Hallmarked Jewellery</span>
//         <span>Secure Payments via Razorpay</span>
//         <span>Free Insured Shipping</span>
//         <span>15-Day Easy Returns</span>
//       </div>

//       <!-- Bottom bar -->
//       <div class="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#3A2B2E]/45">
//         <p>© ${year} Gemora. All rights reserved.</p>
//         <div class="flex gap-6">
//           <a href="/pages/privacy.html" class="hover:text-[#5A1E2A] transition-colors">Privacy Policy</a>
//           <a href="/pages/termsAndConditions.html" class="hover:text-[#5A1E2A] transition-colors">Terms &amp; Conditions</a>
//         </div>
//       </div>
//     </div>
//   </footer>
//   `;

//   document.getElementById("footer-container").innerHTML = footerHTML;
// }

// loadFooter();










import {
  jewelleryNavigation,
  moreCategories,
  collections,
  jewelleryStyles,
} from "./navbar/navbarNavigation.js";

import { initNewsletter } from "../features/newsLetter.js";

function loadFooter() {
  const shopLinks = jewelleryNavigation
    .map(
      (cat) => `
      <li>
        <a href="/pages/products.html?category=${cat.category}" class="hover:text-[#C6A96A] transition-colors">
          ${cat.label}
        </a>
      </li>`
    )
    .join("");

  const collectionLinks = collections
    .slice(0, 5)
    .map(
      (col) => `
      <li>
        <a href="/pages/collection.html?slug=${col.slug}" class="hover:text-[#C6A96A] transition-colors">
          ${col.name}
        </a>
      </li>`
    )
    .join("");

  const moreLinks = moreCategories
    .map(
      (cat) => `
      <li>
        <a href="/pages/products.html?category=${cat.category}" class="hover:text-[#C6A96A] transition-colors">
          ${cat.label}
        </a>
      </li>`
    )
    .join("");

  // Popular Searches — built from REAL data (category x style combos).
  // Not "Gold Rings" etc. because there is no metal/material field in
  // categories.js yet. Add one there first if you want that version.
  const popularSearchStyles = jewelleryStyles.slice(0, 3); // Bridal, Luxury, Minimal
  const popularSearches = jewelleryNavigation
    .flatMap((cat) =>
      popularSearchStyles.map(
        (style) => `
      <a href="/pages/products.html?category=${cat.category}&style=${style.value}"
        class="text-white/50 hover:text-[#C6A96A] transition-colors">
        ${style.label} ${cat.label}
      </a>`
      )
    )
    .join("");

  const year = new Date().getFullYear();

  const footerHTML = `
  <footer class="bg-[#5A1E2A] text-white pt-14 pb-8">
    <div class="container-main">

      <!-- Newsletter strip -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-10 border-b border-white/15">
        <div>
          <p class="text-base font-medium tracking-wide">Join the Gemora list</p>
          <p class="text-sm text-white/60 mt-1">New arrivals, early access, no spam.</p>
        </div>
       <form
  id="newsletterForm"
  class="flex w-full md:w-auto max-w-sm"
>

          <input
          id="newsletterEmail"
          maxlength="254"
          autocomplete="email"
          spellcheck="false"
          type="email"
            required
            placeholder="Your email address"
            class="flex-1 bg-white/5 border border-white/25 focus:border-[#C6A96A] outline-none text-sm px-4 py-2.5 placeholder:text-white/40 transition-colors"
          />
          <button
          id="newsletterBtn"
            type="submit"
            class="border border-l-0 border-white/25 px-5 text-xs font-semibold uppercase tracking-wide hover:bg-[#C6A96A] hover:border-[#C6A96A] hover:text-[#5A1E2A] transition-colors"
          >
            Join
          </button>
        </form>
      </div>

      <!-- Main grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-9 py-10">

        <!-- Brand -->
        <div class="lg:col-span-3">
          <h3 class="text-2xl font-light mb-3 tracking-wide">GEMORA</h3>
          <p class="text-sm text-white/65 leading-relaxed max-w-xs mb-5">
            Timeless jewellery crafted to celebrate every moment.
          </p>
          <div class="flex gap-4">
            <a href="https://www.instagram.com/gemorajewellry/" target="_blank" rel="noopener noreferrer"
              aria-label="Visit Gemora on Instagram" class="text-white/70 hover:text-[#C6A96A] transition-colors">
              <svg class="w-5 h-5" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a href="https://pinterest.com/gemorajewellry/" target="_blank" rel="noopener noreferrer"
              aria-label="Visit Gemora on Pinterest" class="text-white/70 hover:text-[#C6A96A] transition-colors">
              <svg class="w-5 h-5" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Shop -->
        <div class="lg:col-span-2">
          <details open class="group">
           <summary
  class="flex items-center justify-between text-sm font-semibold tracking-[0.1em] uppercase text-white mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden"
>
  <span>Shop</span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-4 h-4 text-white/50 transition-transform duration-300 group-open:rotate-180 lg:hidden"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.8"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19 9-7 7-7-7"
    />
  </svg>
</summary>
            <ul class="space-y-2.5 text-sm text-white/70 mt-3 lg:mt-0 lg:pointer-events-auto">
              ${shopLinks}
              <li>
                <a href="/pages/products.html" class="text-[#C6A96A] font-medium hover:text-white transition-colors">View All →</a>
              </li>
            </ul>
          </details>
        </div>

        <!-- Collections -->
        <div class="lg:col-span-2">
          <details open class="group">
           <summary
  class="flex items-center justify-between text-sm font-semibold tracking-[0.1em] uppercase text-white mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden"
>
  <span>Collections</span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-4 h-4 text-white/50 transition-transform duration-300 group-open:rotate-180 lg:hidden"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.8"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19 9-7 7-7-7"
    />
  </svg>
</summary>
            <ul class="space-y-2.5 text-sm text-white/70 mt-3 lg:mt-0 lg:pointer-events-auto">
              ${collectionLinks}
            </ul>
          </details>
        </div>

        <!-- More Categories -->
        <div class="lg:col-span-2">
          <details open class="group">
<summary
  class="flex items-center justify-between text-sm font-semibold tracking-[0.1em] uppercase text-white mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden"
>
  <span>Explore</span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-4 h-4 text-white/50 transition-transform duration-300 group-open:rotate-180 lg:hidden"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.8"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19 9-7 7-7-7"
    />
  </svg>
</summary>
            <ul class="space-y-2.5 text-sm text-white/70 mt-3 lg:mt-0 lg:pointer-events-auto">
              ${moreLinks}
            </ul>
          </details>
        </div>

        <!-- Company + Contact -->
        <div class="lg:col-span-3">
          <details open class="group">
           <summary
  class="flex items-center justify-between text-sm font-semibold tracking-[0.1em] uppercase text-white mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden"
>
  <span>Company</span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-4 h-4 text-white/50 transition-transform duration-300 group-open:rotate-180 lg:hidden"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.8"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19 9-7 7-7-7"
    />
  </svg>
</summary>
            <ul class="space-y-2.5 text-sm text-white/70 mt-3 lg:mt-0 lg:pointer-events-auto">
              <li><a href="/pages/about.html" class="hover:text-[#C6A96A] transition-colors">About Us</a></li>
              <li><a href="/pages/contact.html" class="hover:text-[#C6A96A] transition-colors">Contact</a></li>
              <li><a href="/pages/shipping.html" class="hover:text-[#C6A96A] transition-colors">Shipping</a></li>
              <li><a href="/pages/returns.html" class="hover:text-[#C6A96A] transition-colors">Returns</a></li>
              <li><a href="/pages/warranty.html" class="hover:text-[#C6A96A] transition-colors">Warranty</a></li>
            </ul>
          </details>
          <div class="mt-5 pt-5 border-t border-white/15 lg:border-none lg:pt-0 lg:mt-6 text-sm text-white/70 space-y-1.5">
            <p>support@gemora.com</p>
            <p>+91 98765 43210</p>
          </div>
        </div>
      </div>

      <!-- Popular Searches  -->
      <div class="py-6 border-t border-white/15">
        <p class="text-xs font-semibold tracking-[0.1em] uppercase text-white/50 mb-3">Popular Searches</p>
        <div class="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          ${popularSearches}
        </div>
      </div>

    


      <!-- Bottom bar -->
      <div class="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/55">
        <p>© ${year} Gemora. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="/pages/privacy.html" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/pages/termsAndConditions.html" class="hover:text-white transition-colors">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  </footer>
  `;

  document.getElementById("footer-container").innerHTML = footerHTML;
}

loadFooter();
initNewsletter();
