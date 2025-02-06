import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home.jsx";
import About from "../pages/miniPage/About.jsx";
import PrivacyPolicy from "../pages/miniPage/PrivacyPolicy.jsx";
import ContactUs from "../pages/miniPage/ContactUs.jsx";
import SingleBlog from "../pages/blogs/singleBlog/SingleBlog.jsx";
import Login from "../pages/user/Login.jsx";
import Register from "../pages/user/Register.jsx";
import AdminLayout from "../pages/admin/AdminLayout.jsx";
import Dashboard from "../pages/admin/dashboard/Dashboard.jsx";
import AddPost from "../pages/admin/post/AddPost.jsx";
import ManagePost from "../pages/admin/post/ManagePost.jsx";
import ManageUsers from "../pages/admin/user/ManageUsers.jsx";
import PrivateRouter from "./PrivateRouter.jsx";
import Updatepost from "../pages/admin/post/Updatepost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "blogs/:id",
        element: <SingleBlog />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRouter>
            <AdminLayout />
          </PrivateRouter>
        ),
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "add-new-post",
            element: <AddPost />,
          },
          {
            path: "manage-items",
            element: <ManagePost />,
          },
          {
            path: "users",
            element: <ManageUsers />,
          },
          {
            path: "update-items/:id",
            element: <Updatepost />,
          }
        ],
      },
    ],
  },
]);

export default router;
