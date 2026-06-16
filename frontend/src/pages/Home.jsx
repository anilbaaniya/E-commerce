import { NavLink } from "react-router-dom";
import FeaturedProducts from "../ui/featuredProduct/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[url('/ecommerce.png')] h-80 bg-cover bg-no-repeat rounded-xl flex flex-col justify-around ">
        <div className="pl-34 ">
          {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm  ">
            Limited Time Offer ⏰
          </button> */}
          <button className=" text-blue-600  text-xl font-bold  ">
            Limited Time Offer ⏰
          </button>
        </div>
        <div className="pl-34 pt-20">
          <NavLink
            to="/trending"
            className="bg-blue-600 text-white px-6 py-3 rounded-md text-md cursor-pointer hover:bg-blue-500 transition-all duration-200"
          >
            Shop Now
          </NavLink>
        </div>
      </div>
      {/* <Product /> */}
      <FeaturedProducts />
    </div>
  );
}
