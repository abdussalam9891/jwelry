import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Gemora | Our Story",
  description:
    "Learn about Gemora, our story, craftsmanship, and passion for creating timeless premium jewellery.",
  path: "/about",
  image: "/assets/images/about5.webp",
});

export default function AboutPage() {
  return (
    <>
      <section className="section bg-[#F9F6F2]">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT TEXT */}
            <div className="max-w-lg">
              {/* Label */}
              <p className="text-[2.2rem] md:text-[2.8rem] tracking-[0.3em] uppercase text-black/50 mb-4">
                About Gemora
              </p>

              {/* Heading */}
              <h1 className="text-[2.6rem] md:text-[3.2rem] font-light leading-tight mb-6">
                Designed to Be Worn,
                <br />
                Meant to Be Remembered
              </h1>

              {/* Description */}
              <p className="text-[1rem] md:text-[1.05rem] leading-relaxed text-black/60 leading-relaxed">
                At Gemora, we believe jewellery should feel effortless,
                personal, and lasting. Every piece is thoughtfully designed to
                blend into your everyday life while still feeling
                special—crafted with care, intention, and attention to detail.
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative py-14 md:py-12 overflow-hidden">
              <img
                src="/assets/images/about6.webp"
                alt="Gemora Jewellery"
                className="w-full h-[420px] md:h-[520px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* philosphy */}
      <section className="bg-white py-14">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* TEXT */}

            {/* IMAGE */}
            <div>
              <img
                src="/assets/images/about5.webp"
                alt="Gemora craftsmanship"
                className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
              />
            </div>

            <div className="max-w-lg">
              <p className="text-[0.75rem] tracking-[0.3em] uppercase text-[#6B1A2A]/70 mb-4">
                Our Philosophy
              </p>

              <h2 className="text-[2.2rem] md:text-[2.8rem] font-light leading-snug mb-6">
                Designed to be worn,
                <br />
                not just admired
              </h2>

              <p className="text-[1rem] md:text-[1.05rem] leading-relaxed text-black/60 leading-relaxed mb-5">
                At Gemora, we believe jewellery should feel effortless—something
                you reach for every day, not just on special occasions. Each
                piece is thoughtfully designed to balance modern aesthetics with
                timeless appeal, so it blends naturally into your life while
                still making a quiet statement.
              </p>

              <p className="text-[1rem] md:text-[1.05rem] leading-relaxed text-black/60 leading-relaxed mb-5">
                From carefully selected materials to precise craftsmanship,
                every detail is considered with intention. We work closely with
                skilled artisans to ensure that what you wear is not only
                beautiful, but comfortable, durable, and made to last beyond
                passing trends.
              </p>

              <p className="text-[1rem] md:text-[1.05rem] leading-relaxed text-black/60 leading-relaxed">
                Our approach is simple—create jewellery that feels personal,
                honest, and meaningful. Pieces that don’t just complement your
                style, but become a part of your story over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F6F2] py-14">
        <div className="container-main text-center">
          {/* Heading */}
          <h3 className="text-[1.8rem] md:text-[2.2rem] font-light mb-4">
            Discover the Collection
          </h3>

          {/* Subtext */}
          <p className="text-[1rem] md:text-[1.05rem] leading-relaxed text-black/60 max-w-md mx-auto mb-8">
            Explore timeless pieces crafted to elevate your everyday style.
          </p>

          {/* CTA */}
          <Link
            href="/products"
            className="inline-block text-[1rem] md:text-[1.05rem] leading-relaxed tracking-wide text-[#6B1A2A] relative group"
          >
            Explore Now
            {/* underline */}
            <span className="block h-[1px] bg-[#6B1A2A] mt-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        </div>
      </section>
    </>
  );
}
