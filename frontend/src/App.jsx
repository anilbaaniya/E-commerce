import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import ProductList from "./pages/ProductList";
import Home from "./pages/Home";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/cart/Cart";
import EmptyCart from "./pages/cart/EmptyCart";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./features/auth/authSlice";
import ProtectedLayout from "./ProtectedLayout";
import ContactUs from "./pages/ContactUs";
import BestSeller from "./pages/BestSeller";
import Trending from "./pages/Trending";
import Admin from "./admin/Admin";
import CreateProduct from "./admin/createProduct/CreateProduct";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import Orders from "./admin/orders/Orders";
import AdminProduct from "./admin/AdminProduct";
import OrderDetails from "./admin/orders/OrderDetails";
import EditProduct from "./admin/EditProduct";
import SuccessPage from "./pages/SuccessPage";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import Wishlist from "./pages/wishlist/Wishlist";
import Profile from "./pages/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetPassword/:token",
    element: <ResetPassword />,
  },

  {
    path: "/success/:id",
    element: <SuccessPage />,
  },

  {
    element: <AdminProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            index: true,
            path: "products",
            element: <AdminProduct />,
          },
          {
            path: "products/:id",
            element: <EditProduct />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "orders/:id",
            element: <OrderDetails />,
          },
          {
            path: "createProduct",
            element: <CreateProduct />,
          },
        ],
      },
    ],
  },

  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "bestSeller",
        element: <BestSeller />,
      },
      {
        path: "trending",
        element: <Trending />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },

      {
        element: <ProtectedLayout />,
        children: [
          { path: "cart", element: <Cart /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "emptyCart", element: <EmptyCart /> },
        ],
      },
    ],
  },
]);
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return <RouterProvider router={router} />;
}
