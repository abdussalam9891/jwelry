import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Gemora",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F9F6F2] flex flex-col items-center justify-center text-center px-6">
      <img
        src="/assets/icon/logo.png"
        alt="Gemora"
        className="w-[110px] mb-8"
      />
      <h1 className="text-4xl md:text-5xl font-light mb-4">Page Not Found</h1>
      <p className="text-black/60 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn-primary px-8">
        Back to Store
      </Link>
    </main>
  );
}
