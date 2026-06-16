import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../ui/ProductCard";
import Breadcrumb from "../ui/Breadcrumb";

const ProductList = () => {
  const { category, subCategory } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const queryString = searchParams.toString();

  useEffect(() => {
    const filters = {};
    const queryCategory = searchParams.get("category");
    const querySubCategory = searchParams.get("subCategory");
    const queryGender = searchParams.get("gender");

    if (category) filters.category = category;
    if (subCategory) filters.subCategory = subCategory;
    if (queryCategory) filters.category = queryCategory;
    if (querySubCategory) filters.subCategory = querySubCategory;
    if (queryGender) filters.gender = queryGender;

    const fetchProducts = async () => {
      try {
        const response = await getProducts(filters);
        setProducts(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [category, subCategory, searchParams, queryString]);

  const queryCategory = searchParams.get("category");
  const queryGender = searchParams.get("gender");

  const formatLabel = (value) =>
    value
      ? value.replace(/-/g, " ").replace(/\b\w/g, (chr) => chr.toUpperCase())
      : "";

  const title = queryGender
    ? queryGender === "male"
      ? "Men Clothing"
      : "Women Clothing"
    : queryCategory
      ? queryCategory === "stationery"
        ? "Stationery"
        : formatLabel(queryCategory)
      : category
        ? formatLabel(category)
        : subCategory
          ? formatLabel(subCategory)
          : "All Products";

  const description = `Explore ${products.length} ${title.toLowerCase()} with curated styles and reliable delivery.`;

  // Build hierarchical breadcrumb: Home / Products / Gender? / Category? / SubCategory
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
  ];

  const qCategory = searchParams.get("category") || category || null;
  const qSubCategory = searchParams.get("subCategory") || subCategory || null;
  const qGender = searchParams.get("gender") || null;

  if (qGender) {
    breadcrumbItems.push({
      label: qGender === "male" ? "Men Clothing" : "Women Clothing",
      to: `/products?gender=${qGender}`,
    });
  }

  if (qCategory) {
    const catLabel =
      qCategory === "stationery" ? "Stationery" : formatLabel(qCategory);
    const params = new URLSearchParams();
    if (qGender) params.set("gender", qGender);
    params.set("category", qCategory);
    breadcrumbItems.push({
      label: catLabel,
      to: `/products?${params.toString()}`,
    });
  }

  if (qSubCategory) {
    // show subcategory as the final (current) item without link
    breadcrumbItems.push({ label: formatLabel(qSubCategory) });
  } else if (!qCategory && !qGender && title !== "All Products") {
    // if only title derived from route params (category param in route), show it
    breadcrumbItems.push({ label: title });
  }

  return (
    <section className="py-10 px-5">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb
          items={breadcrumbItems}
          title={title}
          description={description}
        />

        {products.length === 0 ? (
          <div className="py-20 text-center text-stone-500">
            No products found.
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default ProductList;
