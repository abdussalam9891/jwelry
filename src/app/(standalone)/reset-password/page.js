import { Suspense } from "react";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata({
    title: "Reset Password - Gemora",
    description: "Create a new password for your Gemora account.",
    path: "/reset-password",
  }),
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
