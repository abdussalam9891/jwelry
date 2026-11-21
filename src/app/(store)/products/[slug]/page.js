import ProductDetails from "@/components/product/details/ProductDetails";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  return pageMetadata({
    title: "Product Details | Gemora",
    description:
      "Explore premium jewellery from Gemora. View detailed product information, pricing, materials, and craftsmanship.",
    path: `/products/${(await params).slug}`,
  });
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  return (
    <main className="container-main pt-6 pb-32">
      <ProductDetails key={slug} slug={slug} />
    </main>
  );
}
