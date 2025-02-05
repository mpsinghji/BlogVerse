import React from "react";
import { NavLink } from "react-router-dom";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../redux/features/auth/authSlice"; // Import the logout action

const AdminNavigation = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await logout().unwrap();
        dispatch(logoutAction());
      } catch (error) {
        console.error("Logout failed: ", error);
      }
    }
  };

  return (
    <div className="bg-white p-8 md:h-[calc(100vh-98px)] flex flex-col justify-between shadow-lg rounded-lg">
      <div>
        <img
          src="https://i.postimg.cc/kGrWxY7F/admin.png"
          alt="Admin"
          className="w-16 h-16 rounded-full mx-auto"
        />
        <p className="font-semibold text-center mt-2">Admin</p>
      </div>

      <nav className="space-y-5 mt-8">
        {[
          { to: "/dashboard", label: "Dashboard" },
          { to: "/dashboard/add-new-post", label: "Add New Post" },
          { to: "/dashboard/manage-items", label: "Manage Items" },
          { to: "/dashboard/users", label: "Users" },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold block hover:text-blue-700"
                : "text-black block hover:text-gray-600"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full text-white bg-red-500 font-medium px-5 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavigation;
