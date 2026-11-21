import ContactForm from "@/components/ContactForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact Gemora | Get in Touch",
  description:
    "Contact Gemora for customer support, product enquiries, order assistance, and feedback. We're here to help you.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#F9F6F2] pt-12 pb-8">
        <div className="container-main">
          {/* Hero */}

          <div className="max-w-2xl mb-16">
            <h1 className="text-[2.8rem] md:text-[3.5rem] font-light leading-tight mb-5">
              We're Here To Help
            </h1>

            <p className="text-black/60 text-lg leading-relaxed">
              Whether you have a question about an order, product details,
              returns, or jewellery care, our team is ready to assist.
            </p>
          </div>

          {/* Contact Cards */}

          <div className="grid md:grid-cols-3 gap-5 mb-16">
            <div className="bg-white p-6 rounded-3xl border border-black/5 hover:-translate-y-1 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#6B1A2A]/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-[#6B1A2A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 7.5v9a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 16.5v-9A2.25 2.25 0 014.5 5.25h15A2.25 2.25 0 0121.75 7.5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5l9 6 9-6"
                  />
                </svg>
              </div>

              <h3 className="font-medium text-lg mb-2">Email Support</h3>

              <p className="text-black/60 mb-3">Reach us anytime.</p>

              <p className="text-[#6B1A2A] font-medium">support@gemora.com</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-black/5 hover:-translate-y-1 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#6B1A2A]/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-[#6B1A2A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.965-.852-1.089l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.971 1.295a1.125 1.125 0 01-1.21.403 12.035 12.035 0 01-7.164-7.164 1.125 1.125 0 01.403-1.21l1.295-.971a1.125 1.125 0 00.417-1.173L7.21 3.102A1.125 1.125 0 006.121 2.25H4.75A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Phone Support</h3>

              <p className="text-black/60 mb-3">Speak with our team.</p>

              <p className="font-medium">+91 98765 43210</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-black/5 hover:-translate-y-1 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#6B1A2A]/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-[#6B1A2A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h3 className="font-medium text-lg mb-2">Response Time</h3>

              <p className="text-black/60">
                Most enquiries are answered within 24 business hours.
              </p>
            </div>
          </div>

          <ContactForm />

          {/* Bottom CTA */}

          <div className="mt-16 bg-[#6B1A2A] text-white rounded-[2rem] p-10">
            <h3 className="text-2xl font-light mb-3">
              Need Immediate Assistance?
            </h3>

            <p className="text-white/80 mb-6">
              For urgent order enquiries, please contact our support team
              directly.
            </p>

            <a
              href="mailto:support@gemora.com"
              className="inline-flex bg-white text-[#6B1A2A] px-6 py-3 rounded-xl font-medium"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
