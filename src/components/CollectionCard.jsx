// components/CollectionCard.jsx
import React from "react";

const CollectionCard = ({
  collection,
  hoveredCollection,
  setHoveredCollection,
  openShopNowModal,
  openProductDetailsModal,
}) => {
  // Check if a size is available
  const isSizeAvailable = () => {
    return collection.sizes.some((size) => size.quantity > 0);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      onMouseEnter={() => setHoveredCollection(collection.id)}
      onMouseLeave={() => setHoveredCollection(null)}
    >
      <div
        className="relative overflow-hidden h-64 cursor-pointer"
        onClick={() => openProductDetailsModal(collection.id, collection.image)}
      >
        <img
          src={
            hoveredCollection === collection.id
              ? collection.hoverImage || collection.image
              : collection.image
          }
          alt={collection.title}
          className="w-full h-full object-cover transition-all duration-500 transform hover:scale-105"
        />
        {collection.featured && (
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-sm font-bold px-2 py-1 m-2 rounded">
            FEATURED
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-1 text-xs text-gray-500">{collection.brand}</div>
        <h3 className="text-lg font-semibold mb-2 hover:text-gray-700">
          {collection.title}
        </h3>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-900 font-bold">
              ${parseInt(collection.price)}
            </span>
            {collection.discount && (
              <span className="text-gray-500 line-through text-sm ml-2">
                ${parseInt(collection.discount)}
              </span>
            )}
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm transition-colors duration-300"
            onClick={() => openShopNowModal(collection)}
            disabled={!isSizeAvailable()}
          >
            {isSizeAvailable() ? "Buy Now" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
