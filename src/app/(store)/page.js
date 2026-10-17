import Link from "next/link";

import HeroSlider from "@/components/home/HeroSlider";
import ShopByStyle from "@/components/home/ShopByStyle";
import Testimonials from "@/components/home/Testimonials";
import {
  collections,
  jewelleryNavigation,
  moreCategories,
} from "@/data/navigation";
import { collectionUrl, productsUrl } from "@/lib/routes";

const homepageCategories = [...jewelleryNavigation, ...moreCategories];

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Category */}
      <section className="section-sm bg-[#F9F6F2]/80 py-10 md:py-12 lg:py-14">
        <div className="container-main">
          {/* Section heading */}
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-14 px-4 reveal">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-3">
              Explore Our Collections
            </h2>

            <p className="text-sm sm:text-base text-black/60 leading-6 sm:leading-7 max-w-xl mx-auto">
              Timeless pieces crafted for every moment.
            </p>
          </div>

          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8"
            data-reveal-group
          >
            {homepageCategories.map((category) => (
              <div key={category.category} className="text-center">
                <Link
                  href={productsUrl({ category: category.category })}
                  className="block group"
                >
                  <div className="overflow-hidden rounded-xl mb-3">
                    <img
                      src={category.image}
                      alt={category.label}
                      className="w-full aspect-[5/4] object-cover transition duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-[#1A1A1A] transition duration-300 group-hover:text-[#6B1A2A]">
                    {category.label}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm bg-[#F9F6F2]/80 py-14">
        <div className="container-main">
          <div
            className="grid md:grid-cols-2 items-center gap-16"
            data-reveal-group
          >
            {/* Image */}
            <div>
              <img
                src="/assets/images/gemoraCollection.webp"
                alt="Gemora Craftsmanship"
                className="w-full aspect-[4/3] md:h-[420px] md:aspect-auto object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Content */}
            <div className="max-w-lg">
              {/* Heading */}
              <h2 className="text-[2.2rem] md:text-[2.8rem] font-light text-[#1A1A1A] mb-6 leading-tight">
                Crafted in Tradition, <br />
                Designed for Today
              </h2>

              {/* Description */}
              <p className="text-[1rem] md:text-[1.05rem] text-black/60 leading-relaxed mb-8">
                At Gemora, every piece carries the essence of timeless Indian
                craftsmanship blended with contemporary elegance. From festive
                celebrations to everyday moments, our jewellery is created to be
                a part of your story — rooted in tradition, yet made for the
                modern world.
              </p>

              {/* CTA */}
              <Link
                href="/products?category=neckwears"
                className="group inline-flex items-center gap-3 text-[#6B1A2A] font-medium tracking-wide"
              >
                Discover Collection
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ShopByStyle />

      {/* collection */}

      <section
        id="collections"
        className="py-10 md:py-14 lg:py-16 bg-[#F9F6F2]"
      >
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16 px-4 reveal">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-3 md:mb-5">
              Jewellery For Every Moment
            </h2>

            <p className="text-sm sm:text-base text-black/60 leading-6 sm:leading-8 max-w-xl mx-auto">
              Discover handcrafted collections designed for weddings,
              celebrations, everyday elegance and timeless luxury.
            </p>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-5"
            data-reveal-group
          >
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={collectionUrl(collection.slug)}
                className="group relative aspect-[5/4] overflow-hidden rounded-xl"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-white">
                  <p className="uppercase tracking-[0.25em] text-[10px] sm:text-xs mb-1">
                    {collection.name}
                  </p>
                  <h3 className="text-base sm:text-xl lg:text-2xl font-light leading-tight">
                    {collection.name} Collection
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* video section */}

      <section className="relative w-full h-[75vh] min-h-[240px] sm:h-[300px] lg:h-[380px] overflow-hidden py-14">
        {/* VIDEO */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/images/video.webm" type="video/webm" />
        </video>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-xl reveal">
            {/* Label */}
            <p className="text-[0.8rem] tracking-[0.3em] uppercase text-white/70 mb-4">
              Crafted in Motion
            </p>

            {/* Heading */}
            <h2 className="text-white text-[2.2rem] md:text-[3rem] font-light leading-tight mb-6">
              Designed to Shine With You
            </h2>

            {/* CTA */}
            <Link
              href="/products?category=earrings"
              className="inline-block px-6 py-3 border border-white text-white text-[0.95rem] tracking-wide hover:bg-white hover:text-black transition-all duration-300"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* shop by gender */}
      <section className="section-sm py-14 bg-[#F9F6F2]">
        <div className="container-main">
          {/* Heading */}
          <div className="text-center mb-14 section-heading">
            <h2 className="section-title text-[2rem] md:text-[2.5rem] font-light mb-2">
              Curated For You
            </h2>
            <p className="section-label text-sm text-black/60 tracking-wide">
              For Every Occasion
            </p>
          </div>

          {/* Grid */}
          <div
            className="grid md:grid-cols-3 gap-4 md:gap-4 md:gap-8"
            data-reveal-group
          >
            {/* Card */}
            <Link href="/products?gender=her" className="group block">
              <div className="relative overflow-hidden rounded-xl">
                {/* Image */}
                <img
                  alt=""
                  src="/assets/images/female.webp"
                  className="w-full h-[240px] sm:h-[300px] lg:h-[380px] object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
              </div>

              {/* Label */}
              <h3 className="text-center mt-4 text-[1.1rem] font-medium">
                For Her
              </h3>
            </Link>

            {/* Card */}
            <Link href="/products?gender=him" className="group block">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  alt=""
                  src="/assets/images/men.webp"
                  className="w-full h-[240px] sm:h-[300px] lg:h-[380px] object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
              </div>

              <h3 className="text-center mt-4 text-[1.1rem] font-medium">
                For Him
              </h3>
            </Link>

            {/* Card */}
            <Link href="/products?gender=kids" className="group block">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  alt=""
                  src="/assets/images/kid.webp"
                  className="w-full h-[240px] sm:h-[300px] lg:h-[380px] object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
              </div>

              <h3 className="text-center mt-4 text-[1.1rem] font-medium">
                For Little Ones
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}

      <section className="py-10 lg:py-28 bg-[#F9F6F2] reveal">
        <div className="container-main grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          {/* LEFT */}

          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#111111] leading-tight mb-6">
              Need Help Choosing
              <span className="italic"> The Perfect Piece? </span>
            </h2>

            <p className="text-black/60 leading-8 text-lg max-w-2xl mb-8">
              Whether you're searching for bridal jewellery, a meaningful gift,
              or a timeless investment piece, our jewellery specialists are here
              to guide you with personalised recommendations.
            </p>

            {/* BENEFITS */}

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {/* CARD */}

              <div className="bg-white rounded-2xl px-5 py-4 border border-black/5 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#F6EEF0] flex items-center justify-center shrink-0">
                  {/* Sparkles */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-[#6B1A2A]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904 9 18l-.813-2.096a4.5 4.5 0 0 0-2.291-2.291L3.75 12l2.146-.813a4.5 4.5 0 0 0 2.291-2.291L9 6.75l.813 2.146a4.5 4.5 0 0 0 2.291 2.291L14.25 12l-2.146.813a4.5 4.5 0 0 0-2.291 2.291Z"
                    />
                  </svg>
                </div>

                <span className="font-medium text-[#1A1A1A]">
                  {" "}
                  Expert Guidance{" "}
                </span>
              </div>

              {/* CARD */}

              <div className="bg-white rounded-2xl px-5 py-4 border border-black/5 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#F6EEF0] flex items-center justify-center shrink-0">
                  {/* Heart */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-[#6B1A2A]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.435 6.582a5.94 5.94 0 0 0-8.388 0L12 7.629l-1.047-1.047a5.94 5.94 0 1 0-8.388 8.388L12 21.75l9.435-9.03a5.94 5.94 0 0 0 0-8.388Z"
                    />
                  </svg>
                </div>

                <span className="font-medium text-[#1A1A1A]">
                  Bridal Specialists
                </span>
              </div>

              {/* CARD */}

              <div className="bg-white rounded-2xl px-5 py-4 border border-black/5 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#F6EEF0] flex items-center justify-center shrink-0">
                  {/* Diamond */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-[#6B1A2A]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3.75h10.5l3 4.5-8.25 12-8.25-12 3-4.5Z"
                    />
                  </svg>
                </div>

                <span className="font-medium text-[#1A1A1A]">
                  Custom Jewellery Advice
                </span>
              </div>

              {/* CARD */}

              <div className="bg-white rounded-2xl px-5 py-4 border border-black/5 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#F6EEF0] flex items-center justify-center shrink-0">
                  {/* Shield */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-[#6B1A2A]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m6 2.25c0 5.523-3.84 10.29-9 11.622C6.84 22.29 3 17.523 3 12V5.378c0-.478.214-.928.584-1.226A17.37 17.37 0 0 1 12 1.5c2.928 0 5.68.746 8.416 2.652.37.298.584.748.584 1.226V12Z"
                    />
                  </svg>
                </div>

                <span className="font-medium text-[#1A1A1A]">
                  Trusted Assistance
                </span>
              </div>
            </div>

            {/* CTA */}

            <a
              href="https://wa.me/919006143335?text=Hello%20Gemora,%20I%20need%20help%20choosing%20jewellery."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#6B1A2A] hover:bg-[#571423] text-white uppercase tracking-[0.15em] text-xs font-medium transition-all duration-300"
            >
              Talk To A Jewellery Expert
            </a>

            <p className="mt-5 text-sm text-black/45">
              Average response time under 10 minutes.
            </p>
          </div>

          {/* RIGHT */}

          <div className="relative">
            <img
              alt=""
              src="/assets/images/jwelry-consultation.webp"
              className="w-full h-[550px] object-cover rounded-[32px]"
            />

            {/* FLOATING CARD */}

            <div className="absolute bottom-6 left-6 bg-white rounded-3xl p-5 shadow-xl max-w-[250px]">
              <p className="text-xl mb-2">★★★★★</p>

              <p className="text-sm text-black/70 leading-relaxed">
                "The team helped me choose the perfect engagement ring and made
                the process effortless."
              </p>

              <p className="mt-3 text-xs uppercase tracking-[0.15em] text-black/40">
                Verified Customer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* right scrollable left sticky */}
      <section className="bg-[#F9F6F2] py-14">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* LEFT (STICKY IMAGE) */}
            <div className="h-fit md:sticky md:top-[120px]">
              <div className="relative overflow-hidden rounded-[12px]">
                <img
                  alt=""
                  src="/assets/images/leftWhyUs.webp"
                  className="w-full h-[500px] object-cover"
                />

                {/* Optional overlay text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-lg text-center max-w-xs">
                    Fine jewelry designed to be worthy of those who wear it
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT (SCROLL CONTENT) */}
            <div className="flex flex-col gap-24">
              {/* Block 1 */}
              <div className="reveal">
                <img
                  alt=""
                  src="/assets/images/highestQuality.webp"
                  className="w-full mb-6 rounded-[12px]"
                />
                <h3 className="text-xl tracking-wide mb-3">HIGHEST QUALITY</h3>
                <p className="text-[1rem] text-black/60 leading-relaxed">
                  Every piece is crafted with precision using responsibly
                  sourced materials and expert finishing. From design to final
                  polish, our jewellery is made to meet the highest standards of
                  durability, shine, and comfort.
                </p>
              </div>

              {/* Block 2 */}
              <div className="reveal">
                <img
                  alt=""
                  src="/assets/images/fairestPrice.webp"
                  className="w-full mb-6 rounded-[12px]"
                />
                <h3 className="text-xl tracking-wide mb-3">FAIR PRICING</h3>
                <p className="text-[1rem] text-black/60 leading-relaxed">
                  Luxury should feel honest. By streamlining our process and
                  working directly with skilled artisans, we eliminate
                  unnecessary markups—so you get exceptional jewellery at a
                  price that truly reflects its value.
                </p>
              </div>

              {/* Block 3 */}
              <div className="reveal">
                <img
                  alt=""
                  src="/assets/images/longestLife.webp"
                  className="w-full mb-6 rounded-[12px]"
                />
                <h3 className="text-xl tracking-wide mb-3">CRAFTED TO LAST</h3>
                <p className="text-[1rem] text-black/60 leading-relaxed">
                  Designed for everyday elegance and special moments alike, each
                  piece is built to last beyond trends. Timeless forms, strong
                  settings, and careful detailing ensure your jewellery stays
                  with you for years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="bg-[#F9F6F2]/80 py-24">
        <div className="container-main">
          {/* Heading */}
          <div className="reveal">
            <h2 className="text-center text-[2rem] md:text-[2.6rem] font-light text-[#1A1A1A]">
              Stories Behind Every Sparkle
            </h2>

            {/* Subheading */}
            <p className="max-w-2xl mx-auto text-center text-black/55 mt-5 mb-16 leading-relaxed">
              Thousands of customers have chosen Gemora to celebrate life's most
              meaningful moments.
            </p>
          </div>

          {/* Testimonials */}
          <Testimonials />
        </div>
      </section>

      {/* Trust Section */}

      <section className="bg-[#F9F6F2]/80 py-10">
        <div className="container-main">
          {/* Section heading */}
          <div className="text-center max-w-xl mx-auto mb-14 reveal">
            <p className="text-[0.8rem] tracking-[0.25em] text-[#6B1A2A]/80 uppercase mb-4">
              Why Choose Gemora
            </p>
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-light text-[#1A1A1A]">
              Quality, Trust & Timeless Elegance
            </h2>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 text-center"
            data-reveal-group
          >
            {/* Item */}
            <div className="group flex flex-col items-center gap-4 transition duration-300 hover:-translate-y-1">
              <svg
                className="w-8 h-8 text-[#6B1A2A] transition duration-300 group-hover:scale-110 group-hover:text-[#8B2C3C] group-hover:drop-shadow-[0_4px_10px_rgba(107,26,42,0.2)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="9" />
              </svg>

              <p className="text-[0.95rem] text-black/70 transition group-hover:text-black">
                10+ Years Legacy
              </p>
            </div>

            {/* Item */}
            <div className="group flex flex-col items-center gap-4 transition duration-300 hover:-translate-y-1">
              <svg
                className="w-8 h-8 text-[#6B1A2A] transition duration-300 group-hover:scale-110 group-hover:text-[#8B2C3C] group-hover:drop-shadow-[0_4px_10px_rgba(107,26,42,0.2)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 3l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V7l7-4z" />
              </svg>

              <p className="text-[0.95rem] text-black/70 transition group-hover:text-black">
                Certified Jewellery
              </p>
            </div>

            {/* Item */}
            <div className="group flex flex-col items-center gap-4 transition duration-300 hover:-translate-y-1">
              <svg
                className="w-8 h-8 text-[#6B1A2A] transition duration-300 group-hover:scale-110 group-hover:text-[#8B2C3C] group-hover:drop-shadow-[0_4px_10px_rgba(107,26,42,0.2)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3 12h18" />
                <path d="M7 8l-4 4 4 4" />
              </svg>

              <p className="text-[0.95rem] text-black/70 transition group-hover:text-black">
                Easy Returns
              </p>
            </div>

            {/* Item */}
            <div className="group flex flex-col items-center gap-4 transition duration-300 hover:-translate-y-1">
              <svg
                className="w-8 h-8 text-[#6B1A2A] transition duration-300 group-hover:scale-110 group-hover:text-[#8B2C3C] group-hover:drop-shadow-[0_4px_10px_rgba(107,26,42,0.2)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
              </svg>

              <p className="text-[0.95rem] text-black/70 transition group-hover:text-black">
                Lifetime Warranty
              </p>
            </div>

            {/* Item */}
            <div className="group flex flex-col items-center gap-4 transition duration-300 hover:-translate-y-1">
              <svg
                className="w-8 h-8 text-[#6B1A2A] transition duration-300 group-hover:scale-110 group-hover:text-[#8B2C3C] group-hover:drop-shadow-[0_4px_10px_rgba(107,26,42,0.2)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3 7h13v10H3z" />
                <path d="M16 10h4l2 3v4h-6z" />
              </svg>

              <p className="text-[0.95rem] text-black/70 transition group-hover:text-black">
                Free Shipping
              </p>
            </div>

            {/* Item */}
            <div className="group flex flex-col items-center gap-4 transition duration-300 hover:-translate-y-1">
              <svg
                className="w-8 h-8 text-[#6B1A2A] transition duration-300 group-hover:scale-110 group-hover:text-[#8B2C3C] group-hover:drop-shadow-[0_4px_10px_rgba(107,26,42,0.2)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18 10c0 4-3 7-6 7s-6-3-6-7 3-7 6-7 6 3 6 7z" />
                <path d="M12 17v4" />
              </svg>

              <p className="text-[0.95rem] text-black/70 transition group-hover:text-black">
                24/7 Support
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
