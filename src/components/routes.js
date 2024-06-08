import { Link } from "react-router-dom";
import Blog from "../pages/Blog/Blog";
import BlogData from "../pages/Blog/BlogDynamic";
import Login from "../pages/Login/Login";
import Homepage from "../pages/Homepage/Homepage";
import Wishlist from "../pages/Wishlist/Wishlist";
import Admin from "../pages/Admin/Admin";
import Createproduct from "../pages/Admin/CreateProduct";

export const routes = [
  {
    path: "/",
    element: <Homepage />

  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/create-product",
    element: <Createproduct />,
  },
  {
    path: "/admin/update-product",
    element: <Admin />,
  },
  {
    path: "/blog/:slug",
    element: <BlogData />,
  },
];
