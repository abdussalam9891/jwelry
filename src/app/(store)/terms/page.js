import CmsPage from "@/components/CmsPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms & Conditions | Gemora",
  description:
    "Read the Terms & Conditions governing the use of the Gemora website, products, services, orders, and customer responsibilities.",
  path: "/terms",
});

export default function TermsPage() {
  return <CmsPage slug="terms-conditions" fallbackTitle="Terms & Conditions" />;
}
