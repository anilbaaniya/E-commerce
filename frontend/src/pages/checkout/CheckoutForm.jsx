import { useForm } from "react-hook-form";
import { createOrder } from "../../services/orderService.js";

export default function CheckoutForm({ items, totalAmount }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const products = items.map((item) => {
      return { product: item.product._id, quantity: item.quantity };
    });

    const orderData = {
      products: products,
      totalPrice: totalAmount,
      shippingInfo: data,
    };
    // console.log(orderData);
    try {
      const response = await createOrder(orderData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mb-4"
    >
      {/* Full Name */}
      <div>
        <label className="font-medium text-gray-600 mb-1.5 block">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full bg-stone-100 outline-none px-4 py-2 text-sm"
          {...register("fullName", {
            required: "Full name is required",
          })}
        />

        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="font-medium text-gray-600 mb-1.5 block">
          Phone Number
        </label>

        <input
          type="tel"
          placeholder="Enter your phone number"
          className="w-full bg-stone-100 outline-none px-4 py-2 text-sm"
          {...register("phone", {
            required: "Phone number is required",
          })}
        />

        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="font-medium text-gray-600 mb-1.5 block">
          Email Address{" "}
          <span className="font-normal text-gray-400">(Optional)</span>
        </label>

        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full bg-stone-100 outline-none px-4 py-2 text-sm"
          {...register("email", {
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* City */}
      <div>
        <label className="font-medium text-gray-600 mb-1.5 block">City</label>

        <input
          type="text"
          placeholder="Enter your city"
          className="w-full bg-stone-100 outline-none px-4 py-2 text-sm"
          {...register("city", {
            required: "City is required",
          })}
        />

        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
        )}
      </div>

      {/* Street Name */}
      <div>
        <label className="font-medium text-gray-600 mb-1.5 block">
          Street Name
        </label>

        <input
          type="text"
          placeholder="Enter street name"
          className="w-full bg-stone-100 outline-none px-4 py-2 text-sm"
          {...register("streetName", {
            required: "Street name is required",
          })}
        />

        {errors.streetName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.streetName.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-black text-white py-2 px-4 text-sm">
        Submit
      </button>
    </form>
  );
}
