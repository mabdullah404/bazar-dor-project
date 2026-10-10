import ProductDetailPage, { generateMetadata as baseGenerateMetadata } from "../../products/[id]/page";

export const instant = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return baseGenerateMetadata({ params: Promise.resolve({ id: slug }) });
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ProductDetailPage params={Promise.resolve({ id: slug })} />;
}
