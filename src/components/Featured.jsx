import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Featured = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      discount: 39.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      hoverImage:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
      colors: ["#000000", "#FFFFFF", "#C4A484"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 2,
      name: "Slim Fit Denim Jeans",
      price: 59.99,
      discount: 79.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      hoverImage:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
      colors: ["#000080", "#36454F", "#87CEEB"],
      sizes: ["28", "30", "32", "34", "36"],
    },
    {
      id: 3,
      name: "Classic Leather Jacket",
      price: 149.99,
      discount: 199.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      hoverImage: "https://images.unsplash.com/photo-1559551409-dadc959f76b8",
      colors: ["#000000", "#8B4513", "#696969"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 4,
      name: "Casual Summer Dress",
      price: 45.99,
      discount: 59.99,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
      hoverImage:
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03",
      colors: ["#FF69B4", "#FFFFFF", "#FFD700"],
      sizes: ["XS", "S", "M", "L"],
    },
  ];

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
    setModalOpen(true);
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
    }, 300);
  };

  // Handle purchase confirmation
  const handlePurchase = () => {
    if (
      selectedSize &&
      orderInfo.name &&
      orderInfo.phone &&
      orderInfo.address
    ) {
      // Here you would typically handle the purchase process
      alert(
        `Order placed for ${selectedProduct.name} in size ${selectedSize}\nCustomer: ${orderInfo.name}\nPhone: ${orderInfo.phone}\nShipping to: ${orderInfo.address}`
      );
      handleCloseModal();
      // Reset form
      setOrderInfo({
        name: "",
        phone: "",
        address: "",
      });
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

  // Handle click outside modal to close it
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      handleCloseModal();
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
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
                      ? product.hoverImage
                      : product.image
                  }
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 transform hover:scale-105"
                />
                <div className="absolute top-0 right-0 bg-red-500 text-white text-sm font-bold px-2 py-1 m-2 rounded">
                  SALE
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 hover:text-gray-700">
                  {product.name}
                </h3>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-900 font-bold">
                      ${product.price}
                    </span>
                    <span className="text-gray-500 line-through text-sm ml-2">
                      ${product.discount}
                    </span>
                  </div>
                  <button
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm transition-colors duration-300"
                    onClick={() => openBuyNowModal(product)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border border-black text-black px-8 py-3 rounded-md hover:bg-black hover:text-white transition-colors duration-300">
            View All Products
          </button>
        </div>
      </div>

      {/* Enhanced Purchase Modal */}
      {modalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4 md:p-6 lg:p-8"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
          }}
          onClick={handleOutsideClick}
        >
          <div
            className={`bg-white rounded-lg max-w-md w-full shadow-2xl overflow-hidden transition-all duration-300 transform ${
              modalAnimation ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            style={{ maxHeight: "90vh", overflowY: "auto" }}
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

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex space-x-6 mb-6">
                {/* Product Image */}
                <div className="w-1/3">
                  <div className="relative overflow-hidden rounded-lg shadow-md">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-1 rounded">
                      SALE
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="w-2/3">
                  <h4 className="font-semibold text-lg mb-2">
                    {selectedProduct.name}
                  </h4>
                  <div className="mb-4 flex items-center">
                    <span className="font-bold text-xl">
                      ${selectedProduct.price}
                    </span>
                    <span className="text-gray-500 line-through ml-2">
                      ${selectedProduct.discount}
                    </span>
                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                      {Math.round(
                        (1 - selectedProduct.price / selectedProduct.discount) *
                          100
                      )}
                      % OFF
                    </span>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <p className="font-medium mb-2">Select Size:</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          className={`border rounded-md px-3 py-1 text-sm transition-all duration-200 ${
                            selectedSize === size
                              ? "bg-black text-white border-black"
                              : "border-gray-300 hover:border-black"
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {selectedSize === null && (
                      <p className="text-red-500 text-sm mt-1">
                        Please select a size
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Customer Information Form */}
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Enter your complete delivery address"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t bg-gray-50 flex justify-end sticky bottom-0">
              <button
                onClick={handleCloseModal}
                className="border border-gray-300 text-gray-700 px-5 py-2 rounded-md mr-3 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                className={`px-5 py-2 rounded-md font-medium transition-all duration-200 ${
                  selectedSize &&
                  orderInfo.name &&
                  orderInfo.phone &&
                  orderInfo.address
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={
                  !selectedSize ||
                  !orderInfo.name ||
                  !orderInfo.phone ||
                  !orderInfo.address
                }
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Featured;
