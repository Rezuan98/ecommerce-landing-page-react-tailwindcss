// components/PurchaseModal.jsx
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// For flat structure:
import ProductDetails from "./ProductDetails";
import ShippingForm from "./ShippingForm";
import OrderSummary from "./OrderSummary";

// For nested structure:
// import ProductDetails from "./collections/ProductDetails";
// import ShippingForm from "./collections/ShippingForm";
// import OrderSummary from "./collections/OrderSummary";

const PurchaseModal = ({
  selectedItem,
  selectedCollection,
  selectedSize,
  modalAnimation,
  handleSizeSelect,
  handleCloseModal,
  quantity,
  decreaseQuantity,
  increaseQuantity,
  handleQuantityChange,
  getMaxQuantity,
  orderInfo,
  handleInputChange,
  getShippingCost,
  calculateSubtotal,
  calculateTotal,
  handlePurchase,
  submitLoading,
  successMessage,
  errorMessage,
  isCollection = true,
}) => {
  // Use either selectedCollection or selectedItem based on which component is using this modal
  const item = isCollection ? selectedCollection || selectedItem : selectedItem;
  // Handle click outside modal to close it
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      handleCloseModal();
    }
  };

  // Check if a size is available
  const isSizeAvailable = (size) => {
    return size.quantity > 0;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4 md:p-6 lg:p-8"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-white rounded-lg w-full shadow-xl overflow-hidden transition-all duration-300 transform ${
          modalAnimation ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{ maxHeight: "90vh", overflowY: "auto", maxWidth: "900px" }}
      >
        {/* Modal Header */}
        <div className="relative bg-gray-50 p-5 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Complete Your Purchase
          </h3>
          <button
            onClick={handleCloseModal}
            className="absolute top-5 right-5 text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="bg-green-50 p-4 mx-6 my-4 border border-green-200 rounded-md">
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="bg-red-50 p-4 mx-6 my-4 border border-red-200 rounded-md">
            <p className="text-red-800 font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Modal Content - 2-column layout */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Collection Details & Shipping */}
          <div>
            <ProductDetails
              item={item}
              isCollection={isCollection}
              selectedSize={selectedSize}
              handleSizeSelect={handleSizeSelect}
              isSizeAvailable={isSizeAvailable}
              quantity={quantity}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              handleQuantityChange={handleQuantityChange}
              getMaxQuantity={getMaxQuantity}
            />

            <ShippingForm
              orderInfo={orderInfo}
              handleInputChange={handleInputChange}
            />
          </div>

          {/* Right Column - Order Summary */}
          <OrderSummary
            item={item}
            isCollection={isCollection}
            selectedSize={selectedSize}
            quantity={quantity}
            getShippingCost={getShippingCost}
            calculateSubtotal={calculateSubtotal}
            calculateTotal={calculateTotal}
          />
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t bg-gray-50 flex justify-end sticky bottom-0">
          <button
            onClick={handleCloseModal}
            className="border border-gray-300 text-gray-700 px-5 py-2 rounded-md mr-3 hover:bg-gray-100 transition-colors"
            disabled={submitLoading}
          >
            Cancel
          </button>
          <button
            onClick={handlePurchase}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              selectedSize &&
              orderInfo.name &&
              orderInfo.phone &&
              orderInfo.address &&
              orderInfo.city &&
              !submitLoading
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={
              !selectedSize ||
              !orderInfo.name ||
              !orderInfo.phone ||
              !orderInfo.address ||
              !orderInfo.city ||
              submitLoading
            }
          >
            {submitLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Confirm Purchase"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
