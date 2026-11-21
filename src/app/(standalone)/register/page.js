import RegisterForm from "@/components/auth/RegisterForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Create Account | Gemora",
  description:
    "Create your Gemora account to start shopping premium jewellery, track orders and save your favourites.",
  path: "/register",
  index: false,
});

export default function RegisterPage() {
  return <RegisterForm />;
}
