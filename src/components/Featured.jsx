// components/Featured.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import FeaturedProductCard from "./FeaturedProductCard";
import PurchaseModal from "./PurchaseModal";
import ProductDetailsModal from "./ProductDetailsModal";
import { EmptyState } from "./UIComponents";

const Featured = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Product details modal state
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductImage, setSelectedProductImage] = useState(null);
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

  // Open product details modal
  const openProductDetailsModal = (productId, imageUrl) => {
    setSelectedProductId(productId);
    setSelectedProductImage(imageUrl);
    setDetailsModalOpen(true);
  };

  // Close product details modal
  const closeProductDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedProductId(null);
    setSelectedProductImage(null);
  };

  // Fetch featured products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://62.171.157.225:8084/api/products/featured"
        );

        if (response.data.status === "success") {
          setProducts(response.data.data);
          console.log(
            "Featured Products Data:",
            response.data.data,
            "Count:",
            response.data.data.length
          );
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchProducts();
  }, []);

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

      // Prepare order data
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
        size_id: selectedSize.size_id,
      };

      // Submit order to API
      const response = await axios.post(
        "http://62.171.157.225:8084/api/orders",
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

  // Handle input changes for order form
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

  // Get maximum available quantity for the selected size
  const getMaxQuantity = () => {
    if (!selectedSize) return 1;
    return selectedSize.quantity;
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

        {products.length === 0 ? (
          <EmptyState message="No featured products available at the moment." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(showAllProducts ? products : products.slice(0, 8)).map(
              (product) => (
                <FeaturedProductCard
                  key={product.id}
                  product={product}
                  hoveredProduct={hoveredProduct}
                  setHoveredProduct={setHoveredProduct}
                  openBuyNowModal={openBuyNowModal}
                  openProductDetailsModal={openProductDetailsModal}
                />
              )
            )}
          </div>
        )}

        {/* Product Details Modal */}
        <ProductDetailsModal
          isOpen={detailsModalOpen}
          productId={selectedProductId}
          onClose={closeProductDetailsModal}
          initialImage={selectedProductImage}
        />

        {/* Only show button if there are more than 8 products */}
        {products.length > 8 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllProducts(!showAllProducts)}
              className="border border-black text-black px-8 py-3 rounded-md hover:bg-black hover:text-white transition-colors duration-300"
            >
              {showAllProducts ? "Show Less" : "View All Products"}
            </button>
          </div>
        )}
      </div>

      {modalOpen && selectedProduct && (
        <PurchaseModal
          selectedItem={selectedProduct}
          selectedSize={selectedSize}
          modalAnimation={modalAnimation}
          handleSizeSelect={handleSizeSelect}
          handleCloseModal={handleCloseModal}
          quantity={quantity}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          handleQuantityChange={handleQuantityChange}
          getMaxQuantity={getMaxQuantity}
          orderInfo={orderInfo}
          handleInputChange={handleInputChange}
          getShippingCost={getShippingCost}
          calculateSubtotal={calculateSubtotal}
          calculateTotal={calculateTotal}
          handlePurchase={handlePurchase}
          submitLoading={submitLoading}
          successMessage={successMessage}
          errorMessage={errorMessage}
          isCollection={false}
        />
      )}
    </section>
  );
};

export default Featured;