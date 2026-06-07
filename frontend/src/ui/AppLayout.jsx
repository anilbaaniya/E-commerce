import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="px-16">
      <Header />
      <main className="pt-3">
        <Outlet />
      </main>
    </div>
  );
}
