import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaPlus,
  FaTachometerAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { getProducts } from "../services/productService";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await getProducts();
      // console.log(res.data.data);
      setProducts(res.data.data || []);
    };
    getAllProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 p-5 border-r border-stone-300">
        <h2 className="text-2xl font-bold mb-10">E-Commerce Admin</h2>

        <ul className="space-y-3">
          <NavLink className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-200cursor-pointer">
            <FaBoxOpen />
            Products
          </NavLink>

          <NavLink className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-200">
            <FaTachometerAlt />
            Orders
          </NavLink>

          <NavLink className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-200">
            <FaSignOutAlt />
            Logout
          </NavLink>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Products</h1>

          <NavLink
            to="/createProduct"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            <FaPlus />
            Add Product
          </NavLink>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-stone-200 ">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Product Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  index={index + 1}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 text-black">{index + 1}</td>

                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  <td className="p-4 text-black">{product.name}</td>

                  <td className="p-4 text-black">{product.category}</td>

                  <td className="p-4 text-black">{product.price}</td>

                  <td className="p-4 text-black">{product.stock}</td>

                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {product.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-3">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                      <FaEdit />
                      Edit
                    </button>

                    <button className="flex items-center gap-2 border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg">
                      <FaTrash />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
