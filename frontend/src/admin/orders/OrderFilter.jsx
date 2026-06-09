import { Calendar, ChevronDown, Search } from "lucide-react";

export default function OrderFilter() {
  return (
    <div className="p-5 border-b border-gray-200">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-5 relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by Order ID, User or Email"
            className="w-full h-12 rounded-xl border border-gray-200 bg-white pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 text-[15px]"
          />
        </div>

        <div className="xl:col-span-2 relative">
          <select className="appearance-none w-full h-12 rounded-xl border border-gray-200 px-4 pr-10 bg-white text-[15px] outline-none">
            <option>All Status</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <div className="xl:col-span-2 relative">
          <input
            type="text"
            placeholder="Start Date"
            className="w-full h-12 rounded-xl border border-gray-200 px-4 pr-10 outline-none text-[15px]"
          />

          <Calendar
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="xl:col-span-2 relative">
          <input
            type="text"
            placeholder="End Date"
            className="w-full h-12 rounded-xl border border-gray-200 px-4 pr-10 outline-none text-[15px]"
          />

          <Calendar
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="xl:col-span-1">
          <button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
