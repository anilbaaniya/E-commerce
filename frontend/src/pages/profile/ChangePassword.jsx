import { useForm } from "react-hook-form";

export default function ChangePassword({ setChanging }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  return (
    <form className="flex flex-col gap-3">
      <div>
        <label htmlFor="name">Current Password</label>
        <input
          {...register("currentPassword", {
            required: "Name is required.",
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-1 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.currentPassword.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="name">New Password</label>
        <input
          {...register("password", {
            required: "Name is required.",
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-1 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="name">Confirm Password</label>
        <input
          {...register("confirmPassword", {
            required: "Name is required.",
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-1 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <button
          onClick={() => setChanging(false)}
          className="border border-stone-200 rounded-xl px-4 py-1"
        >
          Cancel
        </button>
        <button className=" rounded-xl px-4 py-1 bg-blue-700 text-white">
          Update
        </button>
      </div>
    </form>
  );
}
