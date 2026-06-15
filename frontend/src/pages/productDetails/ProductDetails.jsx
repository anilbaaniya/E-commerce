import { useEffect, useState } from "react";
import {
  IoCartOutline,
  IoStarSharp,
  IoStarHalfSharp,
  IoArrowBackOutline,
} from "react-icons/io5";
import { getProduct } from "../../services/productService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/auth/cartSlice";
import QuantitySelect from "./QuantitySelect";
import Price from "./Price";
import ProductBadge from "./ProductBadge";
import Image from "./Image";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
      const response = await getProduct(id);
      setProduct(response.data.data);
      // console.log(response.data.data);
    }
    getProducts();
  }, [id]);

  const { name, image, originalPrice, description, discountPercent } = product;

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({ productId: id, quantity })).unwrap();
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    } catch (error) {
      toast.error(error);
      console.error("Add to cart failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Top nav breadcrumb */}
      <div className="max-w-5xl mx-auto  pt-6 pb-2 flex items-center gap-8 text-sm text-gray-400">
        <div className="flex items-center gap-1 hover:text-blue-500 transition text-xl text-blue-600 font-semibold">
          <IoArrowBackOutline />
          <button onClick={() => navigate(-1)} className="cursor-pointer">
            Back
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Images */}
        <Image
          image={image}
          discountPercent={discountPercent}
          wished={wished}
          setWished={setWished}
        />
        {/* Right: Details */}
        <div className="flex flex-col gap-4">
          {/* Title & Rating */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-yellow-400 text-base">
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarSharp />
                <IoStarHalfSharp />
              </div>
              <span className="text-sm text-gray-500">4.5 </span>
            </div>
          </div>

          {/* Price */}
          <Price
            discountPercent={discountPercent}
            originalPrice={originalPrice}
          />

          <hr className="border-stone-200" />

          {/* Size Selector */}
          {/* <SizeSelect
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          /> */}

          {/* Quantity */}
          <QuantitySelect quantity={quantity} setQuantity={setQuantity} />

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-1">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md font-semibold text-white transition ${
                added ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <IoCartOutline className="text-xl" />
              <span>{added ? "Added!" : "Add to Cart"}</span>
            </button>
          </div>

          {/* Trust badges */}
          <ProductBadge />
        </div>
      </div>

      {/* Product Description */}
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <div className="bg-white border border-stone-100 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            Product Details
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
