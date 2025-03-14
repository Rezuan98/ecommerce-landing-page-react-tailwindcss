// components/FeaturedProductCard.jsx
import React from "react";

const FeaturedProductCard = ({
  product,
  hoveredProduct,
  setHoveredProduct,
  openBuyNowModal,
  openProductDetailsModal,
}) => {
  // Check if a size is available
  const isSizeAvailable = () => {
    return product.sizes.some((size) => size.quantity > 0);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div
        className="relative overflow-hidden h-64 cursor-pointer"
        onClick={() => openProductDetailsModal(product.id, product.image)}
      >
        <img
          src={
            hoveredProduct === product.id
              ? product.hoverImage || product.image
              : product.image
          }
          alt={product.title}
          className="w-full h-full object-cover transition-all duration-500 transform hover:scale-105"
        />
        <div className="absolute top-0 right-0 bg-red-500 text-white text-sm font-bold px-2 py-1 m-2 rounded">
          SALE
        </div>
      </div>

      <div className="p-6">
        <div className="mb-1 text-xs text-gray-500">{product.brand}</div>
        <h3 className="text-lg font-semibold mb-2 hover:text-gray-700">
          {product.title}
        </h3>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-900 font-bold">
              $
              {typeof product.price === "number"
                ? product.price.toFixed(2)
                : parseFloat(product.price).toFixed(2)}
            </span>
            {product.discount_price && (
              <span className="text-gray-500 line-through text-sm ml-2">
                $
                {typeof product.discount_price === "number"
                  ? product.discount_price.toFixed(2)
                  : parseFloat(product.discount_price).toFixed(2)}
              </span>
            )}
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm transition-colors duration-300"
            onClick={() => openBuyNowModal(product)}
            disabled={!isSizeAvailable()}
          >
            {isSizeAvailable() ? "Buy Now" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
