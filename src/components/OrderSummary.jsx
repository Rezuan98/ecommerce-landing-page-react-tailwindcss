// components/OrderSummary.jsx
import React from "react";

const OrderSummary = ({
  item,
  isCollection = true,
  selectedSize,
  quantity,
  getShippingCost,
  calculateSubtotal,
  calculateTotal,
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h4 className="font-semibold text-lg mb-4 border-b pb-2 text-gray-800">
        Order Summary
      </h4>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">
            {isCollection ? "Collection:" : "Product:"}
          </span>
          <span className="font-medium">{item.title}</span>
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
            ${parseFloat(item.price).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Quantity:</span>
          <span className="font-medium">{quantity}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
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

        <PaymentMethods />

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
  );
};

// Payment methods sub-component
const PaymentMethods = () => (
  <div className="mt-6">
    <h5 className="font-medium mb-3 text-gray-800">Payment Method</h5>
    <div className="bg-white p-4 rounded border">
      <div className="space-y-2">
        <label className="flex items-center">
          <input type="radio" name="payment" defaultChecked className="mr-2" />
          Cash on Delivery
        </label>
        <label className="flex items-center text-gray-400">
          <input type="radio" name="payment" disabled className="mr-2" />
          Online Payment (Coming Soon)
        </label>
      </div>
    </div>
  </div>
);

export default OrderSummary;
