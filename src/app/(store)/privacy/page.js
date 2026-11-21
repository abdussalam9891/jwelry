import CmsPage from "@/components/CmsPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy | Gemora",
  description:
    "Read Gemora's privacy policy to learn how we collect, use and protect your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <CmsPage slug="privacy-policy" fallbackTitle="Privacy Policy" />;
}
