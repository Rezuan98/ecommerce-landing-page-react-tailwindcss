// src/utils/trackingEvents.js

/**
 * Push an event to the GTM dataLayer
 * @param {string} eventName - Name of the event
 * @param {Object} eventData - Additional data to include with the event
 */
const pushEvent = (eventName, eventData = {}) => {
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];
    
    // Push the event to dataLayer
    window.dataLayer.push({
      event: eventName,
      ...eventData
    });
  };
  
  /**
   * Track when a user views a product details modal
   * @param {Object} product - The product being viewed
   */
  export const trackViewProductDetails = (product) => {
    pushEvent('view_product_details', {
      product_id: product.id,
      product_title: product.title,
      product_price: product.price,
      product_brand: product.brand,
      timestamp: new Date().toISOString()
    });
  };
  
  /**
   * Track when a user clicks the "Buy Now" button
   * @param {Object} product - The product being purchased
   */
  export const trackBuyNowClick = (product) => {
    pushEvent('buy_now_click', {
      product_id: product.id,
      product_title: product.title,
      product_price: product.price,
      product_brand: product.brand,
      timestamp: new Date().toISOString()
    });
  };
  
  /**
   * Track when a user completes an order
   * @param {Object} product - The product being ordered
   * @param {Object} orderDetails - Order details including shipping, size, quantity, etc.
   */
  export const trackOrderComplete = (product, orderDetails) => {
    pushEvent('order_complete', {
      product_id: product.id,
      product_title: product.title,
      product_price: product.price,
      product_brand: product.brand,
      size: orderDetails.size,
      quantity: orderDetails.quantity,
      total_price: orderDetails.total,
      shipping_cost: orderDetails.shipping,
      customer_location: orderDetails.location,
      timestamp: new Date().toISOString()
    });
  };