import RequireAuth from "@/components/auth/RequireAuth";
import ProfileView from "@/components/account/ProfileView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "My Profile | Gemora",
  description: "Manage your Gemora profile, addresses and preferences.",
  path: "/profile",
  index: false,
});

export default function ProfilePage() {
  return (
    <div className="bg-[#F9F6F2]">
      <main className="max-w-7xl mt-14 mx-auto px-4 py-32">
        <RequireAuth>
          <ProfileView />
        </RequireAuth>
      </main>
    </div>
  );
}
