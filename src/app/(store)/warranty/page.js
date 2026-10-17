import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Warranty & Care | Gemora",
  description:
    "Learn what Gemora's warranty covers and how to care for your jewellery.",
  path: "/warranty",
  image: "/assets/images/warranty.webp",
});

export default function WarrantyPage() {
  return (
    <>
      <section className="mt-44 pb-32">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content */}

            <div>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8 tracking-[-0.03em]">
                Jewellery Created To Be Part Of Your Story
              </h2>

              <p className="text-black/60 leading-relaxed mb-6">
                Every Gemora piece is carefully crafted with attention to
                detail, quality and longevity. We believe jewellery should be
                worn, enjoyed and passed through life's meaningful moments.
              </p>

              <p className="text-black/60 leading-relaxed">
                Our warranty and care guidance are designed to help preserve the
                beauty of your jewellery, ensuring it remains as special as the
                day it arrived.
              </p>
            </div>

            {/* Image */}

            <div>
              <img
                src="/assets/images/warranty.webp"
                alt="Jewellery Care"
                className="w-full h-[500px] object-cover rounded-[40px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Warranty */}

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#6B1A2A]">
                Warranty
              </span>

              <h2 className="text-4xl font-light mt-4 mb-6">
                What Our Warranty Covers
              </h2>

              <p className="text-black/60 leading-relaxed mb-10">
                We stand behind the quality of every Gemora piece. If a verified
                manufacturing defect is identified, we'll work with you to
                repair or replace the item where appropriate.
              </p>

              <ul className="space-y-5">
                <li className="flex gap-4">
                  <span className="text-[#6B1A2A]">—</span>
                  <span className="text-black/70"> Manufacturing defects </span>
                </li>

                <li className="flex gap-4">
                  <span className="text-[#6B1A2A]">—</span>
                  <span className="text-black/70"> Craftsmanship issues </span>
                </li>

                <li className="flex gap-4">
                  <span className="text-[#6B1A2A]">—</span>
                  <span className="text-black/70">
                    Structural faults under normal use
                  </span>
                </li>
              </ul>
            </div>

            {/* Care */}

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#6B1A2A]">
                Care Guide
              </span>

              <h2 className="text-4xl font-light mt-4 mb-6">
                Keeping Your Jewellery Beautiful
              </h2>

              <p className="text-black/60 leading-relaxed mb-10">
                A few simple habits can help preserve the shine and condition of
                your jewellery for years to come.
              </p>

              <ul className="space-y-5">
                <li className="flex gap-4">
                  <span className="text-[#6B1A2A]">—</span>
                  <span className="text-black/70">
                    {" "}
                    Store pieces separately{" "}
                  </span>
                </li>

                <li className="flex gap-4">
                  <span className="text-[#6B1A2A]">—</span>
                  <span className="text-black/70">
                    Avoid perfumes and chemicals
                  </span>
                </li>

                <li className="flex gap-4">
                  <span className="text-[#6B1A2A]">—</span>
                  <span className="text-black/70">
                    Clean gently with a soft cloth
                  </span>
                </li>

                <li className="flex gap-4">
                  <span className="text-[#6B1A2A]">—</span>
                  <span className="text-black/70">
                    Remove before swimming or exercise
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-main">
          <div className="border-y border-black/10 py-20">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <p className="uppercase tracking-[0.3em] text-xs text-[#6B1A2A] mb-5">
                  Repairs & Maintenance
                </p>

                <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                  Here For The Years Ahead
                </h2>
              </div>

              <div>
                <p className="text-black/60 leading-relaxed mb-8">
                  Should your jewellery require inspection, repair or
                  maintenance, our team will guide you through the process and
                  available service options.
                </p>

                <p className="text-black/60 leading-relaxed">
                  To submit a warranty request, please provide your order
                  number, photographs of the item and a brief description of the
                  issue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-main">
          <div className="bg-white border border-black/10 rounded-[48px] p-12 md:p-20 text-center">
            <h2 className="text-4xl md:text-6xl font-light leading-tight mb-6">
              Questions About Your Jewellery?
            </h2>

            <p className="max-w-2xl mx-auto text-black/60 leading-relaxed mb-10">
              Whether you need guidance on jewellery care, warranty coverage or
              repair services, our team is always happy to help.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#6B1A2A] text-white px-8 py-4 rounded-full"
              >
                Contact Our Team
              </Link>

              <a
                href="https://wa.me/919006143335"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-black/10 px-8 py-4 rounded-full"
              >
                Speak With A Specialist
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
