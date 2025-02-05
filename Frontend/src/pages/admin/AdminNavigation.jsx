import React from "react";
import { NavLink } from "react-router-dom";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../redux/features/auth/authSlice"; // Import the logout action

const AdminNavigation = () => {
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(logoutAction()); // Use the imported logout action
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="space-y-5 bg-white p-8 md:h-[calc(100vh-98px)] flex flex-col justify-start">
      <div className="mb-5">
        <img
          src="https://i.postimg.cc/kGrWxY7F/admin.png"
          alt="Admin"
          className="size-14"
        />
        <p className="font-semibold">Admin</p>
      </div>
      <hr />
      <ul className="space-y-5 pt-5">
        <li>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : "text-black"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/add-new-post"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : "text-black"
            }
          >
            Add New Post
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/manage-items"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : "text-black"
            }
          >
            Manage Items
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : "text-black"
            }
          >
            Users
          </NavLink>
        </li>
      </ul>
      <div>
        <hr className="mb-3" />
        <button
        onClick={handleLogout}
        className="text-white bg-red-500 font-medium px-5 py-1 rounded-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavigation;
