import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
