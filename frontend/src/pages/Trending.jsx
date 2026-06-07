import { useEffect, useState } from "react";
import { getTrendingProducts } from "../services/productService";
import ProductCard from "../ui/ProductCard";
import Breadcrumb from "../ui/Breadcrumb";

export default function Trending() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await getTrendingProducts();
      setProducts(response.data.data);
    }

    getProducts();
  }, []);

  const title = "Trending Products";
  const description =
    "Browse the latest trending styles and must-have picks that shoppers love right now.";
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
