import FeaturedProducts from "../ui/featuredProduct/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[url('/ecommerce1.png')] h-90 bg-contain rounded-xl"></div>
      {/* <Product /> */}
      <FeaturedProducts />
    </div>
  );
}
