import AuthCallback from "@/components/auth/AuthCallback";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata({
    title: "Authenticating... | Gemora",
    description: "Securely authenticating your Gemora account.",
    path: "/auth",
  }),
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return <AuthCallback />;
}
