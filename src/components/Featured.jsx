import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Featured = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    location: "inside", // Default to inside dhaka
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch featured products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/products/featured"
        );

        console.log("API Response:", response.data); // Debugging log

        if (response.data.status === "success") {
          setProducts(response.data.data);
          console.log("Featured Products Data:", response.data.data); // Log fetched data
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate shipping cost based on location
  const getShippingCost = () => {
    return orderInfo.location === "inside" ? 80 : 140;
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    if (!selectedProduct) return 0;
    return selectedProduct.price * quantity;
  };

  // Calculate total amount
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = getShippingCost();
    return subtotal + shipping;
  };

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && modalOpen) {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [modalOpen]);

  // Open the modal with the selected product
  const openBuyNowModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(null);
    setQuantity(1);
    setModalOpen(true);
    // Reset messages
    setSuccessMessage(null);
    setErrorMessage(null);
    // Add a small delay to trigger the animation
    setTimeout(() => {
      setModalAnimation(true);
    }, 50);
  };

  // Close the modal with animation
  const handleCloseModal = () => {
    setModalAnimation(false);
    // Wait for animation to finish before fully closing
    setTimeout(() => {
      setModalOpen(false);
      setSelectedProduct(null);
      setSelectedSize(null);
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 300);
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    // Only allow selection if size is in stock
    if (size.quantity > 0) {
      setSelectedSize(size);
      // Reset quantity to 1 or maximum available
      setQuantity(1);
    }
  };

  // Check if a size is available
  const isSizeAvailable = (size) => {
    return size.quantity > 0;
  };

  // Get maximum available quantity for the selected size
  const getMaxQuantity = () => {
    if (!selectedSize) return 1;
    return selectedSize.quantity;
  };

  // Handle purchase confirmation
  const handlePurchase = async () => {
    // Validate required fields
    if (
      !selectedSize ||
      !orderInfo.name ||
      !orderInfo.phone ||
      !orderInfo.address ||
      !orderInfo.city
    ) {
      setErrorMessage("Please fill out all required fields");
      return;
    }

    // Validate stock availability
    if (quantity > selectedSize.quantity) {
      setErrorMessage(
        `Only ${selectedSize.quantity} items available for the selected size.`
      );
      return;
    }

    try {
      setSubmitLoading(true);

      // Prepare order data - following the exact structure expected by the backend
      const orderData = {
        name: orderInfo.name,
        phone: orderInfo.phone,
        address: orderInfo.address,
        city: orderInfo.city,
        shipping_option: orderInfo.location,
        quantity: quantity,
        subtotal: calculateSubtotal(),
        shipping_cost: getShippingCost(),
        total: calculateTotal(),
        product_id: selectedProduct.id,
        size_id: selectedSize.id,
      };

      console.log("Sending order data:", orderData);

      // Submit order to API
      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders",
        orderData
      );

      if (response.data.status === "success") {
        setSuccessMessage(
          "Your order has been placed successfully! We'll contact you shortly."
        );

        // Reset form after success
        setOrderInfo({
          name: "",
          phone: "",
          address: "",
          city: "",
          location: "inside",
        });

        // Close modal after 3 seconds
        setTimeout(() => {
          handleCloseModal();
        }, 3000);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle quantity changes
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= getMaxQuantity()) {
      setQuantity(value);
    }
  };

  // Handle click outside modal to close it
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      handleCloseModal();
    }
  };

  // Increase quantity
  const increaseQuantity = () => {
    if (quantity < getMaxQuantity()) {
      setQuantity((prev) => prev + 1);
    }
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <section id="featured" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600">
            Explore our most popular and trending items this season
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600">
              No featured products available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative overflow-hidden h-64">
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
                  <div className="mb-1 text-xs text-gray-500">
                    {product.brand}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 hover:text-gray-700">
                    {product.title}
                  </h3>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-900 font-bold">
                        ${parseInt(product.price)}
                      </span>
                      {product.discount_price && (
                        <span className="text-gray-500 line-through text-sm ml-2">
                          ${parseInt(product.discount_price)}
                        </span>
                      )}
                    </div>
                    <button
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm transition-colors duration-300"
                      onClick={() => openBuyNowModal(product)}
                      disabled={
                        !product.sizes.some((size) => size.quantity > 0)
                      }
                    >
                      {product.sizes.some((size) => size.quantity > 0)
                        ? "Buy Now"
                        : "Out of Stock"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button className="border border-black text-black px-8 py-3 rounded-md hover:bg-black hover:text-white transition-colors duration-300">
            View All Products
          </button>
        </div>
      </div>

      {/* Enhanced Purchase Modal with improved design */}
      {modalOpen && selectedProduct && (
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
              {/* Left Column - Product Details & Shipping */}
              <div>
                <div className="flex mb-6">
                  {/* Product Image */}
                  <div className="w-1/3 pr-4">
                    <div className="relative overflow-hidden rounded-lg shadow-sm">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-1 rounded">
                        SALE
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="w-2/3">
                    <div className="text-xs text-gray-500 mb-1">
                      {selectedProduct.brand}
                    </div>
                    <h4 className="font-semibold text-lg mb-2">
                      {selectedProduct.title}
                    </h4>
                    <div className="mb-4 flex items-center">
                      <span className="font-bold text-xl">
                        ${parseFloat(selectedProduct.price).toFixed(2)}
                      </span>
                      {selectedProduct.discount_price && (
                        <>
                          <span className="text-gray-500 line-through ml-2">
                            $
                            {parseFloat(selectedProduct.discount_price).toFixed(
                              2
                            )}
                          </span>
                          <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                            {Math.round(
                              (1 -
                                selectedProduct.price /
                                  selectedProduct.discount_price) *
                                100
                            )}
                            % OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Size Selector with Availability */}
                    <div className="mb-4">
                      <p className="font-medium mb-2">Select Size:</p>
                      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2 mb-2">
                        {selectedProduct.sizes.map((size) => (
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
                                  <span className="text-xs text-green-600">
                                    In Stock
                                  </span>
                                  <span className="text-xs">
                                    ({size.quantity})
                                  </span>
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
                        <p className="text-red-500 text-xs mt-1">
                          Please select a size
                        </p>
                      )}
                    </div>

                    {/* Quantity Selector - Only enabled when size is selected */}
                    {selectedSize && (
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
                    )}
                  </div>
                </div>

                {/* Shipping Information Form - Cleaner design */}
                <div className="border-t pt-5 mt-2">
                  <h4 className="font-semibold mb-4 text-gray-800">
                    Shipping Information
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={orderInfo.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={orderInfo.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={orderInfo.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all"
                        placeholder="Enter your city"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Delivery Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={orderInfo.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all"
                        placeholder="Enter your complete delivery address"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Location
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="location"
                            value="inside"
                            checked={orderInfo.location === "inside"}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Inside Dhaka (80 tk)
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="location"
                            value="outside"
                            checked={orderInfo.location === "outside"}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Outside Dhaka (140 tk)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-4 border-b pb-2 text-gray-800">
                  Order Summary
                </h4>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-medium">{selectedProduct.title}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">
                      {selectedSize ? selectedSize.name : "Not selected"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">
                      ${parseFloat(selectedProduct.price).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">{getShippingCost()} tk</span>
                  </div>

                  <div className="border-t pt-4 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      *All prices are inclusive of taxes
                    </p>
                  </div>

                  <div className="mt-6">
                    <h5 className="font-medium mb-3 text-gray-800">
                      Payment Method
                    </h5>
                    <div className="bg-white p-4 rounded border">
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            defaultChecked
                            className="mr-2"
                          />
                          Cash on Delivery
                        </label>
                        <label className="flex items-center text-gray-400">
                          <input
                            type="radio"
                            name="payment"
                            disabled
                            className="mr-2"
                          />
                          Online Payment (Coming Soon)
                        </label>
                      </div>
                    </div>
                  </div>

                  {selectedSize && (
                    <div className="mt-6 p-3 bg-blue-50 rounded-md border border-blue-100">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Availability:</span>{" "}
                        {selectedSize.quantity} items in stock for size{" "}
                        {selectedSize.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
      )}
    </section>
  );
};

export default Featured;
