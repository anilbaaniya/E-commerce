import { useEffect, useState } from "react";
import { getBestSellerProducts } from "../services/productService";
import ProductCard from "../ui/ProductCard";
import Breadcrumb from "../ui/Breadcrumb";

export default function BestSeller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await getBestSellerProducts();
      setProducts(response.data.data);
    }

    getProducts();
  }, []);

  const title = "Best Seller Products";
  const description =
    "Discover top selling favorites curated from the best across the store.";
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: title },
  ];

  return (
    <section className="py-10 px-5">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb
          items={breadcrumbItems}
          title={title}
          description={description}
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
