import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
