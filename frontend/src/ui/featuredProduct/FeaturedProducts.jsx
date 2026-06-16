import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../../services/productService";
import ProductCard from "../ProductCard";
import Breadcrumb from "../Breadcrumb";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await getFeaturedProducts();
      setProducts(response.data.data);
    }

    getProducts();
  }, []);

  const title = "Featured Products";
  const description = "Hand-picked selections showcasing top-quality items.";
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: title },
  ];

  return (
    <section className=" py-2 px-5 ">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb
          items={breadcrumbItems}
          title={title}
          description={description}
        />
        <div className="grid grid-cols-4 gap-8 justify-center w-325 mx-auto">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
