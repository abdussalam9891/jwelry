import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Returns Policy | Gemora",
  description:
    "Learn about Gemora's simple, transparent and hassle-free returns process.",
  path: "/returns",
  image: "/assets/images/shipping1.webp",
});

export default function ReturnsPage() {
  return (
    <>
      <section className="py-32 mt-24">
        <div className="container-main">
          <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight font-light max-w-3xl">
            Easy Returns.
            <br />
            Peace Of Mind.
          </h1>

          <p className="mt-10 text-lg text-black/60 leading-relaxed max-w-3xl">
            We want you to feel confident with every purchase. If your order
            isn't quite right, our return process is designed to be simple,
            transparent and hassle-free.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-main">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                Shopping Should Feel Effortless
              </h2>

              <p className="text-black/60 leading-relaxed mb-6">
                Every Gemora order is carefully inspected before dispatch.
                However, if something isn't right, we're here to help make the
                process as smooth as possible.
              </p>
            </div>

            <div>
              <img
                src="/assets/images/shipping1.webp"
                alt="Returns"
                className="w-full h-[520px] object-cover rounded-[40px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-main">
          <div className="border-y border-black/10 py-24">
            <div className="max-w-2xl mb-20">
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
                A Simple Return Process
              </h2>

              <p className="text-black/60 leading-relaxed">
                If you need to return an item, we'll guide you through every
                step of the process to ensure a smooth experience.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-10">
              <div>
                <p className="text-5xl font-light text-[#6B1A2A] mb-5">01</p>
                <h3 className="mb-3">Request</h3>
                <p className="text-black/50 text-sm leading-relaxed">
                  Contact our team within the return period.
                </p>
              </div>

              <div>
                <p className="text-5xl font-light text-[#6B1A2A] mb-5">02</p>
                <h3 className="mb-3">Review</h3>
                <p className="text-black/50 text-sm leading-relaxed">
                  We'll review and approve your request.
                </p>
              </div>

              <div>
                <p className="text-5xl font-light text-[#6B1A2A] mb-5">03</p>
                <h3 className="mb-3">Return</h3>
                <p className="text-black/50 text-sm leading-relaxed">
                  Send the item back in its original packaging.
                </p>
              </div>

              <div>
                <p className="text-5xl font-light text-[#6B1A2A] mb-5">04</p>
                <h3 className="mb-3">Inspection</h3>
                <p className="text-black/50 text-sm leading-relaxed">
                  Our team verifies the condition of the item.
                </p>
              </div>

              <div>
                <p className="text-5xl font-light text-[#6B1A2A] mb-5">05</p>
                <h3 className="mb-3">Refund</h3>
                <p className="text-black/50 text-sm leading-relaxed">
                  Refunds are issued to the original payment method.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#6B1A2A]">
                Eligibility
              </span>

              <h2 className="text-4xl font-light mt-4 mb-6">
                Eligible For Returns
              </h2>

              <p className="text-black/60 leading-relaxed">
                Items may be returned within 7 days of delivery provided they
                are unused, unworn and returned in their original packaging with
                all tags and certificates included.
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#6B1A2A]">
                Exclusions
              </span>

              <h2 className="text-4xl font-light mt-4 mb-6">
                Non-Returnable Items
              </h2>

              <ul className="space-y-4 text-black/60">
                <li>— Customized or engraved jewellery</li>
                <li>— Final sale items</li>
                <li>— Worn or damaged products</li>
                <li>— Gift cards and promotional items</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-40">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#6B1A2A]">
                Refunds
              </span>

              <h2 className="text-4xl font-light mt-4 mb-6">
                Refund Processing
              </h2>

              <p className="text-black/60 leading-relaxed">
                Once your returned item passes inspection, refunds are issued to
                the original payment method. Processing times may vary depending
                on your bank.
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#6B1A2A]">
                Support
              </span>

              <h2 className="text-4xl font-light mt-4 mb-6">
                Damaged Or Incorrect Orders
              </h2>

              <p className="text-black/60 leading-relaxed">
                If your order arrives damaged, defective or incorrect, please
                contact us within 48 hours and include photographs of the item
                and packaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-main">
          <div className="relative overflow-hidden rounded-[48px] bg-white border border-black/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#6B1A2A]" />

            <div className="px-10 md:px-20 py-20 text-center">
              <p className="uppercase tracking-[0.3em] text-xs text-[#6B1A2A] mb-6">
                Need Help?
              </p>

              <h2 className="text-4xl md:text-6xl font-light leading-tight mb-6">
                We're Here To Make Things Right
              </h2>

              <p className="max-w-2xl mx-auto text-black/60 leading-relaxed mb-12">
                If you have questions about a return, exchange or refund, our
                team will guide you through the process and help find the best
                solution.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-[#6B1A2A] text-white px-8 py-4 rounded-full"
                >
                  Start A Return
                </Link>

                <a
                  href="https://wa.me/919006143335"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black/10 px-8 py-4 rounded-full"
                >
                  Get Assistance
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
