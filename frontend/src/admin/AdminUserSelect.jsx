import { useNavigate } from "react-router-dom";

export default function AdminUserSelect() {
  const navigate = useNavigate();

  function handleAdminButton() {
    navigate("/admin/products");
  }
  function handleUserButton() {
    navigate("/");
  }
  return (
    <div>
      <p>Choose Your role:</p>
      <div>
        <button onClick={handleAdminButton}>Admin</button>
        <button onClick={handleUserButton}>User</button>
      </div>
    </div>
  );
}
