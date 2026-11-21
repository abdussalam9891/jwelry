import LoginForm from "@/components/auth/LoginForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Login | Gemora",
  description:
    "Sign in to your Gemora account to track orders, manage your wishlist and enjoy a faster checkout.",
  path: "/login",
  index: false,
});

export default function LoginPage() {
  return <LoginForm />;
}
