// components/ShippingForm.jsx
import React from "react";

const ShippingForm = ({ orderInfo, handleInputChange }) => {
  return (
    <div className="border-t pt-5 mt-2">
      <h4 className="font-semibold mb-4 text-gray-800">Shipping Information</h4>

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
  );
};

export default ShippingForm;
