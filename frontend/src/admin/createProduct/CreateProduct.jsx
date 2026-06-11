import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import { getSignatureForUpload } from "../../services/getSignature";
import { BeatLoader } from "react-spinners";
import { createProduct } from "../../services/productService";
import toast from "react-hot-toast";
const CATEGORY_CONFIG = {
  fashion: {
    male: ["t-shirts", "shirts", "jackets", "jeans"],
    female: ["t-shirts", "jackets", "jeans", "saree", "kurtha"],
  },
  electronics: null,
  stationery: null,
};

export default function CreateProduct() {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    setError,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      gender: "unisex",
      category: "",
      subCategory: "",
    },
  });

  // ✅ SAFE (React Compiler friendly)
  const category = useWatch({
    control,
    name: "category",
  });

  const gender = useWatch({
    control,
    name: "gender",
  });

  // Get subcategories safely
  const getSubCategories = (category, gender) => {
    return CATEGORY_CONFIG?.[category]?.[gender] || [];
  };

  const subCategories = getSubCategories(category, gender);

  // Reset subCategory when category/gender changes
  useEffect(() => {
    setValue("subCategory", "");
  }, [category, gender, setValue]);

  // Upload image
  async function uploadImage(file, timestamp, signature, folder) {
    const data = new FormData();

    data.append("file", file);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    data.append("folder", folder);

    try {
      const cloudName = import.meta.env.VITE_CLOUD_NAME;

      const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await axios.post(api, data);

      return res.data.secure_url;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function onSubmit(formData) {
    // console.log(formData);
    try {
      const uploadFolder = "ecommerce";

      const isValid = await trigger();
      if (!isValid) {
        return;
      }

      // File from RHF
      const file = formData.image?.[0];

      if (!file) {
        setError("image", {
          type: "manual",
          message: "Image is required",
        });
        return;
      }

      // Get signature
      const { timestamp, signature } =
        await getSignatureForUpload(uploadFolder);

      if (!timestamp || !signature) {
        throw new Error("Failed to get upload signature");
      }

      // Upload image
      const imgUrl = await uploadImage(
        file,
        timestamp,
        signature,
        uploadFolder,
      );

      // Send to backend
      const res = await createProduct({
        ...formData,
        image: imgUrl,
        discountPercent: Number(formData.discountPercent),
      });

      console.log(res);

      // console.log("Uploaded successfully");
      toast.success("Product created successfully!");

      reset();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <div className="min-h-screen bg-white text-black flex justify-center py-10 px-4">
      {isSubmitting ? (
        <BeatLoader />
      ) : (
        <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-black">Create Product</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* PRODUCT NAME */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Product Name
              </label>
              <input
                {...register("name", {
                  required: "Product name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* ORIGINAL PRICE */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Original Price
              </label>
              <input
                type="number"
                min="1"
                step="1"
                {...register("originalPrice", {
                  required: "OriginalPrice is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    (!Number.isNaN(value) && value >= 1) ||
                    "Price must be greater than 0",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.originalPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.originalPrice.message}
                </p>
              )}
            </div>

            {/* DISCOUNT */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Discount %
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                {...register("discountPercent", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Min 0%" },
                  max: { value: 100, message: "Max 100%" },
                  validate: (value) =>
                    value === undefined ||
                    value === null ||
                    value === "" ||
                    !Number.isNaN(value) ||
                    "Discount must be a number",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.discountPercent && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discountPercent.message}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Description
              </label>
              <textarea
                rows="4"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 characters required",
                  },
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Category
              </label>

              <select
                {...register("category", {
                  required: "Category is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="stationery">Stationery</option>
              </select>

              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* GENDER */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Gender
              </label>

              <select
                {...register("gender", {
                  required: "Gender is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="unisex">Unisex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>

            {/* SUBCATEGORY */}
            {category === "fashion" && subCategories.length > 0 && (
              <div>
                <label className="block mb-2 font-medium text-black">
                  Sub Category
                </label>

                <select
                  {...register("subCategory", {
                    required: "Sub category is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select sub category</option>
                  {subCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {errors.subCategory && (
                  <p className="text-red-500 text-sm">
                    {errors.subCategory.message}
                  </p>
                )}
              </div>
            )}
            {/* Image */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Upload Image
              </label>

              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Image is required",
                  validate: (files) => files?.length > 0 || "Image is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Rating
              </label>

              <select
                {...register("rating", {
                  required: "Rating is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Rating
                </option>

                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-center gap-8">
              {/* Trending */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("trending")}
                  className="w-4 h-4"
                />
                <label className="font-medium text-black">Trending</label>
              </div>

              {/* Bestseller */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("bestSeller")}
                  className="w-4 h-4"
                />
                <label className="font-medium text-black">Bestseller</label>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("isFeatured")}
                  className="w-4 h-4"
                />
                <label className="font-medium text-black">Featured</label>
              </div>

              {/* Active (checked by default) */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked
                  {...register("isActive")}
                  className="w-4 h-4"
                />
                <label className="font-medium text-black">Active</label>
              </div>
            </div>
            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => reset()}
                className="px-5 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Reset
              </button>

              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
