import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ScrollReveal from "@/components/layout/ScrollReveal";

export default function StoreLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ScrollReveal />
    </>
  );
}
