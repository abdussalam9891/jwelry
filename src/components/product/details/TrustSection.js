const TRUST_ITEMS = [
  {
    title: "Free Delivery",
    subtitle: "Arrives in 3–5 days",
    path: "M3 7h13v10H3zM16 10h3l2 3v4h-5zM7.5 17.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm9 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z",
  },
  {
    title: "Easy Returns",
    subtitle: "7-day hassle-free returns",
    path: "M4 4v6h6M20 20v-6h-6M5.5 9A7 7 0 0119 12m-14 0a7 7 0 0013.5 3",
  },
  {
    title: "Lifetime Warranty",
    subtitle: "On plating & polish",
    path: "M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z",
  },
  {
    title: "Secure Checkout",
    subtitle: "100% protected payments",
    path: "M12 11c1.1 0 2 .9 2 2v2h-4v-2c0-1.1.9-2 2-2zm6 0V9a6 6 0 10-12 0v2M5 11h14v10H5z",
  },
];

export default function TrustSection() {
  return (
    <div className="border border-[#6B1A2A]/10 rounded-2xl p-5 bg-[#F9F6F2] space-y-5">
      {TRUST_ITEMS.map((item) => (
        <div key={item.title} className="flex items-start gap-4">
          <div className="bg-white border border-[#6B1A2A]/10 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#6B1A2A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d={item.path}
              />
            </svg>
          </div>

          <div>
            <p className="text-[0.95rem] font-medium text-black">
              {item.title}
            </p>
            <p className="text-[0.85rem] text-black/60">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
