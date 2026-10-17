import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Shipping Information | Gemora",
  description:
    "Delivered with care - learn about Gemora's secure, insured and tracked shipping.",
  path: "/shipping",
  image: "/assets/images/shipping2.webp",
});

export default function ShippingPage() {
  return (
    <>
      <section className="bg-[#F9F6F2] pt-12 pb-8">
        <section className="bg-[#F9F6F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-center">
              {/* Content */}
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight font-light">
                  Delivered With Care,
                  <span className="block">From Our Studio To You</span>
                </h1>

                <p className="mt-8 text-lg text-black/60 max-w-lg leading-relaxed">
                  Every Gemora piece is prepared, inspected and packaged by hand
                  before dispatch. From secure shipping to real-time tracking,
                  we ensure your order arrives safely and beautifully presented.
                </p>

                <div className="mt-12 grid grid-cols-3 gap-8 border-t border-black/10 pt-8">
                  <div>
                    <p className="text-3xl font-light">100%</p>
                    <p className="text-sm text-black/60 mt-2">
                      Insured Shipping
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-light">24h</p>
                    <p className="text-sm text-black/60 mt-2">
                      Tracking Updates
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-light">Premium</p>
                    <p className="text-sm text-black/60 mt-2">
                      Protective Packaging
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <img
                  src="/assets/images/shipping2.webp"
                  alt="Gemora Shipping"
                  className="w-full h-[700px] object-cover rounded-[40px]"
                />

                {/* Floating card */}
                <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-xl">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6B1A2A] mb-1">
                    Tracked Delivery
                  </p>
                  <p className="text-sm">
                    Secure dispatch with end-to-end order tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading */}
            <div className="max-w-2xl mb-20">
              <h2 className="text-5xl md:text-6xl font-light leading-tight">
                From Craftsmanship
                <br />
                To Your Doorstep
              </h2>

              <p className="mt-6 text-lg text-black/60 leading-relaxed">
                Every order follows a carefully managed process to ensure your
                piece arrives beautifully presented and fully protected.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Line */}
              <div className="hidden lg:block absolute top-7 left-0 w-full h-px bg-black/10" />

              <div className="grid lg:grid-cols-4 gap-12">
                {/* Step 1 */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-[#6B1A2A] text-white flex items-center justify-center text-lg mb-8 relative z-10">
                    01
                  </div>

                  <h3 className="text-2xl mb-3">Order Confirmed</h3>

                  <p className="text-black/60 leading-relaxed">
                    Your order is received instantly and a confirmation email is
                    sent.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-[#6B1A2A] text-white flex items-center justify-center text-lg mb-8 relative z-10">
                    02
                  </div>

                  <h3 className="text-2xl mb-3">Prepared With Care</h3>

                  <p className="text-black/60 leading-relaxed">
                    Each piece undergoes inspection, polishing and premium
                    packaging.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-[#6B1A2A] text-white flex items-center justify-center text-lg mb-8 relative z-10">
                    03
                  </div>

                  <h3 className="text-2xl mb-3">Secure Dispatch</h3>

                  <p className="text-black/60 leading-relaxed">
                    Your order is shipped through trusted carriers with tracking
                    updates.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-[#6B1A2A] text-white flex items-center justify-center text-lg mb-8 relative z-10">
                    04
                  </div>

                  <h3 className="text-2xl mb-3">Delivered</h3>

                  <p className="text-black/60 leading-relaxed">
                    Arrives safely at your doorstep, ready to be cherished.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}

        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading */}
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-light leading-tight">
                Frequently Asked
                <br />
                Questions
              </h2>

              <p className="mt-6 text-lg text-black/60 max-w-2xl mx-auto">
                Everything you need to know about shipping, delivery, tracking
                and receiving your Gemora order.
              </p>
            </div>

            {/* FAQ List */}
            <div className="divide-y divide-black/10 border-y border-black/10">
              <details className="group py-8">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-xl">
                    {" "}
                    How long does delivery take?{" "}
                  </span>

                  <span className="text-2xl transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-5 text-black/60 leading-relaxed max-w-3xl">
                  Most orders arrive within 3–7 business days, depending on your
                  location and the shipping method selected.
                </p>
              </details>

              <details className="group py-8">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-xl"> Can I track my shipment? </span>

                  <span className="text-2xl transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-5 text-black/60 leading-relaxed max-w-3xl">
                  Yes. Once your order has been dispatched, you'll receive a
                  tracking link via email to monitor its journey.
                </p>
              </details>

              <details className="group py-8">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-xl">
                    Is my order insured during transit?
                  </span>

                  <span className="text-2xl transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-5 text-black/60 leading-relaxed max-w-3xl">
                  Every shipment is fully insured until it reaches the delivery
                  address provided at checkout.
                </p>
              </details>

              <details className="group py-8">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-xl">
                    Do you offer international shipping?
                  </span>

                  <span className="text-2xl transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-5 text-black/60 leading-relaxed max-w-3xl">
                  We currently ship to selected international destinations.
                  Shipping availability is shown during checkout.
                </p>
              </details>

              <details className="group py-8">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-xl">
                    What happens if my package is delayed?
                  </span>

                  <span className="text-2xl transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-5 text-black/60 leading-relaxed max-w-3xl">
                  If a delay occurs, our team will keep you informed and work
                  directly with the carrier to resolve the issue promptly.
                </p>
              </details>

              <details className="group py-8">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-xl">
                    Will my order require a signature on delivery?
                  </span>

                  <span className="text-2xl transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-5 text-black/60 leading-relaxed max-w-3xl">
                  Certain high-value orders may require a signature to ensure
                  secure and verified delivery.
                </p>
              </details>

              <details className="group py-8">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-xl">
                    Can I change my shipping address after ordering?
                  </span>

                  <span className="text-2xl transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-5 text-black/60 leading-relaxed max-w-3xl">
                  Address changes may be possible before dispatch. Please
                  contact our support team as soon as possible.
                </p>
              </details>

              <details className="group py-8">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-xl"> How is my jewelry packaged? </span>

                  <span className="text-2xl transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-5 text-black/60 leading-relaxed max-w-3xl">
                  Every piece is presented in our signature packaging, designed
                  to protect your jewelry while creating a memorable unboxing
                  experience.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white border border-black/10 rounded-[48px] px-8 md:px-16 py-20 text-center">
              {/* Heading */}
              <h2 className="text-5xl md:text-6xl font-light leading-tight max-w-4xl mx-auto">
                Questions About Your Delivery?
              </h2>

              {/* Description */}
              <p className="mt-6 text-black/60 max-w-2xl mx-auto text-lg leading-relaxed">
                Whether you're checking tracking updates, arranging delivery
                details or need assistance with an order, our team is here to
                help every step of the way.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#6B1A2A] text-white px-8 py-4 rounded-full hover:opacity-90 transition"
                >
                  Contact Our Team
                </Link>

                <a
                  href="https://wa.me/919006143335"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-black/10 px-8 py-4 rounded-full hover:bg-black/[0.03] transition"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
