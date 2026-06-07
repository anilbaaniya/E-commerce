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
import BestSeller from "./pages/BestSeller";
import Trending from "./pages/Trending";
import ContactUs from "./pages/ContactUs";
import MensClothing from "./pages/mensClothing/MensClothing";
import WomenClothing from "./pages/womenClothing/WomenClothing";
import Electronics from "./pages/electronics/Electronics";
import Stationery from "./pages/stationery/Stationery";

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
    path: "/resetPassword",
    element: <ResetPassword />,
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
        path: "product",
        element: <ProductList />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
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
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "menClothing",
        element: <MensClothing />,
      },
      {
        path: "womenClothing",
        element: <WomenClothing />,
      },
      {
        path: "electronics",
        element: <Electronics />,
      },
      {
        path: "stationery",
        element: <Stationery />,
      },
      {
        element: <ProtectedLayout />,
        children: [
          { path: "cart", element: <Cart /> },
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
