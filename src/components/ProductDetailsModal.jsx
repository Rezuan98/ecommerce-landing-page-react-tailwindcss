// components/ProductDetailsModal.jsx
import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const ProductDetailsModal = ({ isOpen, productId, onClose, initialImage }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [activeImage, setActiveImage] = useState(initialImage);
  const [productImages, setProductImages] = useState([]);

  // Fetch product details when modal opens
  useEffect(() => {
    if (isOpen && productId) {
      fetchProductDetails();

      // Add animation effect
      setTimeout(() => {
        setModalAnimation(true);
      }, 50);
    }
  }, [isOpen, productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/${productId}`
      );

      if (response.data) {
        setProductDetails(response.data);

        // Set product images if available
        if (response.data.images && response.data.images.length > 0) {
          const imageUrls = response.data.images.map((img) => img.url);
          setProductImages(imageUrls);

          // Only set active image if not already set
          if (!activeImage) {
            const primaryImage = response.data.images.find(
              (img) => img.is_primary
            );
            setActiveImage(
              primaryImage ? primaryImage.url : response.data.images[0].url
            );
          }
        }
      }
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  // Handle close with animation
  const handleCloseModal = () => {
    setModalAnimation(false);
    setTimeout(() => {
      onClose();
      // Reset states
      setProductDetails(null);
      setLoading(true);
      setError(null);
    }, 300);
  };

  // Handle clicking outside modal to close
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      handleCloseModal();
    }
  };

  // Handle image change
  const handleImageChange = (image) => {
    setActiveImage(image);
  };

  if (!isOpen) return null;

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
        style={{ maxHeight: "90vh", overflowY: "auto", maxWidth: "800px" }}
      >
        {/* Modal Header with Close Button */}
        <div className="relative bg-gray-50 p-4 border-b">
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 p-4 mx-6 my-4 border border-red-200 rounded-md">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            {/* Product Content */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Product Images */}
              <div>
                {/* Main Image Display */}
                <div className="rounded-lg overflow-hidden border border-gray-200 mb-4 h-64 md:h-80">
                  {activeImage && (
                    <img
                      src={activeImage}
                      alt={productDetails?.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Thumbnail Row */}
                {productImages.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {productImages.map((image, index) => (
                      <div
                        key={index}
                        className={`border rounded-md overflow-hidden cursor-pointer h-16 ${
                          activeImage === image
                            ? "border-blue-500 ring-1 ring-blue-300"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleImageChange(image)}
                      >
                        <img
                          src={image}
                          alt={`Product thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column - Product Details */}
              <div>
                {/* Brand */}
                <div className="text-sm text-gray-500 mb-1">
                  {productDetails?.brand?.name}
                </div>

                {/* Product Name */}
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {productDetails?.name}
                </h1>

                {/* Product Description */}
                <div className="mb-6">
                  <h2 className="text-md font-semibold mb-2">Description:</h2>
                  <div className="prose prose-sm text-gray-600">
                    <p>{productDetails?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsModal;
