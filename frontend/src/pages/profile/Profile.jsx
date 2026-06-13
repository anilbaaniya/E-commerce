import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import EditNameEmail from "./EditNameEmail";
import ChangePassword from "./ChangePassword";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const [editing, setEditing] = useState(false);
  const [changing, setChanging] = useState(false);

  function handleEditProfile() {
    setEditing(true);
    setChanging(false);
  }

  function handleChangePassword() {
    setChanging(true);
    setEditing(false);
  }
  return (
    <div className="min-h-screen  p-4">
      <div className="w-full max-w-md flex flex-col gap-4 ">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-gray-800">
              My Profile
            </span>
            <span className="text-xs text-gray-500">Manage your profile</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 px-5 py-5 border-b">
          <FaUserCircle className="text-4xl text-gray-400" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">
              {user.name}
            </span>
            <span className="text-sm text-gray-500">{user.email}</span>
          </div>
        </div>

        {/* Profile Section */}
        {!editing && (
          <div className="px-5 py-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-gray-700">
                Profile
              </span>
              <button
                onClick={handleEditProfile}
                className="text-xs text-blue-600 cursor-pointer hover:underline"
              >
                Edit
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">Name</span>
              <span className="text-gray-800 font-medium">{user.name}</span>

              <span className="text-gray-500">Email</span>
              <span className="text-gray-800 font-medium">{user.email}</span>
            </div>
          </div>
        )}

        {editing && <EditNameEmail setEditing={setEditing} user={user} />}

        {/* Password Section */}
        {!changing && (
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Password
              </span>
              <button
                onClick={handleChangePassword}
                className="text-xs text-blue-600 cursor-pointer hover:underline"
              >
                Change
              </button>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Password</span>
              <span className="text-gray-800">********</span>
            </div>
          </div>
        )}

        {changing && <ChangePassword setChanging={setChanging} />}
      </div>
    </div>
  );
}
