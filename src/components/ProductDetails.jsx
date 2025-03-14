// components/ProductDetails.jsx
import React from "react";

const ProductDetails = ({
  item,
  isCollection = true,
  selectedSize,
  handleSizeSelect,
  isSizeAvailable,
  quantity,
  decreaseQuantity,
  increaseQuantity,
  handleQuantityChange,
  getMaxQuantity,
}) => {
  // Add a safety check
  if (!item) {
    return <div>No product information available</div>;
  }
  return (
    <div className="flex mb-6">
      {/* Collection Image */}
      <div className="w-1/3 pr-4">
        <div className="relative overflow-hidden rounded-lg shadow-sm">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-auto object-cover"
          />
          {isCollection && item.featured ? (
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 m-1 rounded">
              FEATURED
            </div>
          ) : (
            !isCollection && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-1 rounded">
                SALE
              </div>
            )
          )}
        </div>
      </div>

      {/* Collection Info */}
      <div className="w-2/3">
        <div className="text-xs text-gray-500 mb-1">{item.brand}</div>
        <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
        <div className="mb-4 flex items-center">
          <span className="font-bold text-xl">
            ${parseFloat(item.price).toFixed(2)}
          </span>
          {isCollection && item.discount ? (
            <>
              <span className="text-gray-500 line-through ml-2">
                ${parseFloat(item.discount).toFixed(2)}
              </span>
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                {Math.round((1 - item.price / item.discount) * 100)}% OFF
              </span>
            </>
          ) : (
            !isCollection &&
            item.discount_price && (
              <>
                <span className="text-gray-500 line-through ml-2">
                  ${parseFloat(item.discount_price).toFixed(2)}
                </span>
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                  {Math.round((1 - item.price / item.discount_price) * 100)}%
                  OFF
                </span>
              </>
            )
          )}
        </div>

        {/* Size Selector with Availability */}
        <SizeSelector
          sizes={item.sizes}
          selectedSize={selectedSize}
          handleSizeSelect={handleSizeSelect}
          isSizeAvailable={isSizeAvailable}
        />

        {/* Quantity Selector - Only enabled when size is selected */}
        {selectedSize && (
          <QuantitySelector
            quantity={quantity}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            handleQuantityChange={handleQuantityChange}
            getMaxQuantity={getMaxQuantity}
          />
        )}
      </div>
    </div>
  );
};

// Size selector sub-component
const SizeSelector = ({
  sizes,
  selectedSize,
  handleSizeSelect,
  isSizeAvailable,
}) => (
  <div className="mb-4">
    <p className="font-medium mb-2">Select Size:</p>
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2 mb-2">
      {sizes &&
        sizes.map((size) => (
          <button
            key={size.id}
            className={`relative border rounded-md p-2 text-sm transition-all duration-200 flex flex-col items-start ${
              selectedSize && selectedSize.id === size.id
                ? "bg-black text-white border-black"
                : isSizeAvailable(size)
                ? "border-gray-300 hover:border-black"
                : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            onClick={() => handleSizeSelect(size)}
            disabled={!isSizeAvailable(size)}
          >
            <span className="block w-full break-words hyphens-auto leading-tight">
              {size.name}
            </span>
            <div className="w-full mt-1 flex justify-between items-center">
              {isSizeAvailable(size) ? (
                <>
                  <span className="text-xs text-green-600">In Stock</span>
                  <span className="text-xs">({size.quantity})</span>
                </>
              ) : (
                <span className="text-xs text-red-500 w-full">
                  Out of Stock
                </span>
              )}
            </div>
          </button>
        ))}
    </div>

    {/* Error Message if No Size is Selected */}
    {selectedSize === null && (
      <p className="text-red-500 text-xs mt-1">Please select a size</p>
    )}
  </div>
);

// Quantity selector sub-component
const QuantitySelector = ({
  quantity,
  decreaseQuantity,
  increaseQuantity,
  handleQuantityChange,
  getMaxQuantity,
}) => (
  <div>
    <p className="font-medium mb-2">Quantity:</p>
    <div className="flex items-center">
      <button
        className="border border-gray-300 rounded-l-md px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
        onClick={decreaseQuantity}
        disabled={quantity <= 1}
      >
        -
      </button>
      <input
        type="number"
        min="1"
        max={getMaxQuantity()}
        value={quantity}
        onChange={handleQuantityChange}
        className="w-16 text-center border-t border-b border-gray-300 py-1 focus:outline-none"
      />
      <button
        className="border border-gray-300 rounded-r-md px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
        onClick={increaseQuantity}
        disabled={quantity >= getMaxQuantity()}
      >
        +
      </button>
      <span className="ml-3 text-sm text-gray-600">
        (Max: {getMaxQuantity()})
      </span>
    </div>
  </div>
);

export default ProductDetails;
