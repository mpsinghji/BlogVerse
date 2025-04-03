import React, { useState } from "react";
import { useUpdateUserRoleMutation } from "../../../redux/features/auth/authApi";
import { showToast } from "../../../utils/toast";

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
  const [role, setRole] = useState(user?.role);
  const [username, setUsername] = useState(user?.username);
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleUpdateRole = async () => {
    if (user?.role === role && user?.username === username) {
      showToast.info("No changes detected.");
      return;
    }
  
    try {
      await updateUserRole({ userId: user?._id, role, username }).unwrap();
      showToast.success("User details updated successfully!");
      onRoleUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      showToast.error("Failed to update user details.");
    }
  };
  

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        {/* Overlay with low opacity */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Centered modal panel */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 transition-all">
          {/* Modal header */}
          <div className="border-b border-gray-200/80 pb-4 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800/90">
              Edit User Role
            </h2>
          </div>

          {/* Email field */}
          <div className="mb-6 space-y-2">
            <label className="block text-sm font-medium text-gray-700/90">
              Email
            </label>
            <input
              type="text"
              value={user?.email}
              readOnly
              className="w-full bg-gray-50/70 border border-gray-300/50 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
            />
          </div>

          {/* Usernaem field  */}
          <div className="mb-6 space-y-2">
            <label className="block text-sm font-medium text-gray-700/90">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-50/70 border border-gray-300/50 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
            />
          </div>

          {/* Role selection */}
          <div className="mb-8 space-y-2">
            <label className="block text-sm font-medium text-gray-700/90">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-gray-50/70 border border-gray-300/50 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all appearance-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-700/90 bg-gray-100/50 rounded-lg hover:bg-gray-200/60 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateRole}
              className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600/90 rounded-lg hover:bg-indigo-700/90 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUserModal;
