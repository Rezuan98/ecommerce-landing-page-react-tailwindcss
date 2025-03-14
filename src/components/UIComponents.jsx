// components/UIComponents.jsx
import React from "react";

// Loading indicator component
export const LoadingIndicator = () => (
  <div className="text-center py-16">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    <p className="mt-4 text-gray-600">Loading products...</p>
  </div>
);

// Empty state component
export const EmptyState = ({ message }) => (
  <div className="text-center py-16">
    <p className="text-gray-600">{message}</p>
  </div>
);
