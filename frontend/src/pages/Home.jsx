import FeaturedProducts from "../ui/featuredProduct/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[url('/e-commerce.png')] h-90 bg-cover bg-b bg-no-repeat rounded-xl"></div>
      {/* <Product /> */}
      <FeaturedProducts />
    </div>
  );
}
