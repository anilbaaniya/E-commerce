import { useForm } from "react-hook-form";

export default function EditNameEmail({ setEditing, user }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });
  return (
    <form className="flex flex-col gap-3">
      <div>
        <label htmlFor="name">Name</label>
        <input
          {...register("name", {
            required: "Name is required.",
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-1 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          {...register("email", {
            required: "Email is required.",
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-1 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setEditing(false)}
          className="border border-stone-300 rounded-xl px-4 py-1 cursor-pointer"
        >
          Cancel
        </button>
        <button className=" rounded-xl px-4 py-1 bg-blue-700 text-white cursor-pointer">
          Update
        </button>
      </div>
    </form>
  );
}
