import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../../services/productService";
import ProductCard from "../ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await getFeaturedProducts();
      setProducts(response.data.data);
    }

    getProducts();
  }, []);

  return (
    <section className=" py-10 px-5 ">
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Featured Products
        </h2>

        {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,220px))] gap-4 justify-center"> */}
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
