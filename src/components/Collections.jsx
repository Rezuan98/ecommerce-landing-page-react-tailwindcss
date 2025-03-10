import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Collections = () => {
  const [hoveredCollection, setHoveredCollection] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const collections = [
    {
      id: 1,
      title: "Summer Collection",
      price: 29.99,
      discount: 39.99,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      hoverImage:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      colors: ["#FFD700", "#87CEEB", "#FFFFFF"],
      sizes: ["XS", "S", "M", "L", "XL"],
      items: "24 items",
    },
    {
      id: 2,
      title: "Winter Essentials",
      price: 49.99,
      discount: 69.99,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
      hoverImage:
        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
      colors: ["#000080", "#36454F", "#D3D3D3"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      items: "18 items",
    },
    {
      id: 3,
      title: "Casual Wear",
      price: 39.99,
      discount: 54.99,
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3",
      hoverImage:
        "https://images.unsplash.com/photo-1516762689617-e1cffcef479d",
      colors: ["#000000", "#FFFFFF", "#808080"],
      sizes: ["XS", "S", "M", "L", "XL"],
      items: "32 items",
    },
    {
      id: 4,
      title: "Formal Collection",
      price: 59.99,
      discount: 79.99,
      image: "https://images.unsplash.com/photo-1490725263030-1f0521cec8ec",
      hoverImage:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
      colors: ["#000000", "#0F52BA", "#8B4513"],
      sizes: ["S", "M", "L", "XL"],
      items: "15 items",
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

  // Open the modal with the selected collection
  const openShopNowModal = (collection) => {
    setSelectedCollection(collection);
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
      setSelectedCollection(null);
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
        `Order placed from ${selectedCollection.title} in size ${selectedSize}\nCustomer: ${orderInfo.name}\nPhone: ${orderInfo.phone}\nShipping to: ${orderInfo.address}`
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
    <section id="collections" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Collections
          </h2>
          <p className="text-gray-600">
            Discover our newest arrivals and trending styles
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              onMouseEnter={() => setHoveredCollection(collection.id)}
              onMouseLeave={() => setHoveredCollection(null)}
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={
                    hoveredCollection === collection.id
                      ? collection.hoverImage
                      : collection.image
                  }
                  alt={collection.title}
                  className="w-full h-full object-cover transition-all duration-500 transform hover:scale-105"
                />
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-sm font-bold px-2 py-1 m-2 rounded">
                  NEW
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 hover:text-gray-700">
                  {collection.title}
                </h3>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-900 font-bold">
                      ${collection.price}
                    </span>
                    <span className="text-gray-500 line-through text-sm ml-2">
                      ${collection.discount}
                    </span>
                  </div>
                  <button
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm transition-colors duration-300"
                    onClick={() => openShopNowModal(collection)}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border border-black text-black px-8 py-3 rounded-md hover:bg-black hover:text-white transition-colors duration-300">
            View All Collections
          </button>
        </div>
      </div>

      {/* Enhanced Purchase Modal */}
      {modalOpen && selectedCollection && (
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
                Shop {selectedCollection.title}
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
                {/* Collection Image */}
                <div className="w-1/3">
                  <div className="relative overflow-hidden rounded-lg shadow-md">
                    <img
                      src={selectedCollection.image}
                      alt={selectedCollection.title}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 m-1 rounded">
                      NEW
                    </div>
                  </div>
                </div>

                {/* Collection Info */}
                <div className="w-2/3">
                  <h4 className="font-semibold text-lg mb-2">
                    {selectedCollection.title}
                  </h4>
                  <div className="mb-4 flex items-center">
                    <span className="font-bold text-xl">
                      ${selectedCollection.price}
                    </span>
                    <span className="text-gray-500 line-through ml-2">
                      ${selectedCollection.discount}
                    </span>
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      {Math.round(
                        (1 -
                          selectedCollection.price /
                            selectedCollection.discount) *
                          100
                      )}
                      % OFF
                    </span>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <p className="font-medium mb-2">Select Size:</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedCollection.sizes.map((size) => (
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

export default Collections;
