import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Footer() {
  const { user } = useSelector((state) => state.auth);

  return (
    <footer className="bg-stone-900 text-stone-300 ">
      <div className="max-w-7xl mx-auto  py-10 ">
        <div className="grid grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">ShopEase</h2>
            <p className="mt-4 text-sm">
              Your destination for fashion, stationery, and electronics.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products?gender=male"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link
                  to="/products?gender=female"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link
                  to="/stationery"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  Stationery
                </Link>
              </li>
              <li>
                <Link
                  to="/electronics"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  Electronics
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 font-semibold text-white">My Account</h3>
            <ul className="space-y-2 text-sm">
              {!user && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-blue-300 transition-all duration-200"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="hover:text-blue-300 transition-all duration-200"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Contact</h3>

            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt />
                Kathmandu, Nepal
              </p>

              <p className="flex items-center gap-2">
                <FaPhoneAlt />
                +977 9860461264
              </p>

              <p className="flex items-center gap-2">
                <FaEnvelope />
                shopease123@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-stone-700 pt-6 text-center text-sm">
          © {new Date().getFullYear()} ShopEase. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
