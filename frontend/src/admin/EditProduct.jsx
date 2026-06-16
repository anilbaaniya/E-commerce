import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getProduct, updateProduct } from "../services/productService";
import toast from "react-hot-toast";

export default function EditProduct() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      image: "",
      category: "",
      subCategory: "",
      gender: "unisex",
      originalPrice: 0,
      discountPercent: 0,
      stock: 0,
      isFeatured: false,
      trending: false,
      bestSeller: false,
      isActive: true,
    },
  });

  useEffect(() => {
    async function fetchProduct() {
      const res = await getProduct(id);
      reset(res.data.data);
    }
    fetchProduct();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await updateProduct(id, data);
      console.log(res);
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  const image = watch("image");

  // reusable input error
  const ErrorText = ({ msg }) =>
    msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Edit Product</h1>
        <p className="text-gray-500 mb-6">
          Update product details and manage visibility
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* ================= BASIC INFO ================= */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Basic Information
            </h2>

            <div className="grid gap-4">
              {/* NAME */}
              <div>
                <label className="text-sm font-medium">Product Name</label>
                <input
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  })}
                  className="w-full border p-2 rounded-md mt-1"
                  placeholder="Enter product name"
                />
                <ErrorText msg={errors.name?.message} />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: { value: 10, message: "Min 10 characters" },
                  })}
                  className="w-full border p-2 rounded-md mt-1"
                  placeholder="Enter product description"
                />
                <ErrorText msg={errors.description?.message} />
              </div>

              {/* IMAGE */}
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <input
                  {...register("image", {
                    required: "Image is required",
                  })}
                  className="w-full border p-2 rounded-md mt-1"
                  placeholder="https://..."
                />
                <ErrorText msg={errors.image?.message} />

                {image && (
                  <img
                    src={image}
                    className="w-28 h-28 mt-3 rounded-lg object-cover border"
                    alt="preview"
                  />
                )}
              </div>
            </div>
          </div>

          {/* ================= PRICING ================= */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Original Price</label>
                <input
                  type="number"
                  {...register("originalPrice", {
                    required: "Price required",
                    min: { value: 1, message: "Must be > 0" },
                  })}
                  className="w-full border p-2 rounded-md mt-1"
                />
                <ErrorText msg={errors.originalPrice?.message} />
              </div>

              <div>
                <label className="text-sm font-medium">Discount %</label>
                <input
                  type="number"
                  {...register("discountPercent", {
                    min: { value: 0, message: "Min 0" },
                    max: { value: 100, message: "Max 100" },
                  })}
                  className="w-full border p-2 rounded-md mt-1"
                />
                <ErrorText msg={errors.discountPercent?.message} />
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium">Stock</label>
                <input
                  type="number"
                  {...register("stock", {
                    required: "Stock required",
                    min: { value: 0, message: "Cannot be negative" },
                  })}
                  className="w-full border p-2 rounded-md mt-1"
                />
                <ErrorText msg={errors.stock?.message} />
              </div>
            </div>
          </div>

          {/* ================= CATEGORY ================= */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Category Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <label className="text-sm font-medium">Category</label>
                <select
                  {...register("category")}
                  className="w-full border p-2 rounded-md mt-1"
                >
                  <option value="fashion">Fashion</option>
                  <option value="electronics">Electronics</option>
                  <option value="stationery">Stationery</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Sub Category</label>
                <input
                  {...register("subCategory", {
                    required: "Sub category required",
                  })}
                  className="w-full border p-2 rounded-md mt-1"
                />
                <ErrorText msg={errors.subCategory?.message} />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">Gender</label>
              <select
                {...register("gender")}
                className="w-full border p-2 rounded-md mt-1"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
          </div>

          {/* ================= SETTINGS ================= */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Product Settings
            </h2>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register("isFeatured")} />
                Featured Product
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" {...register("trending")} />
                Trending
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" {...register("bestSeller")} />
                Best Seller
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" {...register("isActive")} />
                Active
              </label>
            </div>
          </div>

          {/* SUBMIT */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
