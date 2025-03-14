import { useState, useEffect } from "react";
import axios from "axios";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/faqs/");

        // Log the response to see its structure
        console.log("API Response:", response);

        // Check if response has data property and handle accordingly
        // Adjust this based on your actual API response structure
        if (response.data && Array.isArray(response.data)) {
          setFaqs(response.data);
        } else if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          // For APIs that wrap data in a data property
          setFaqs(response.data.data);
        } else if (response.data) {
          // If it's an object but not in the expected format
          console.warn("Unexpected API response format:", response.data);
          // Try to extract faqs from whatever structure is returned
          const extractedFaqs = extractFaqsFromResponse(response.data);
          setFaqs(extractedFaqs);
        } else {
          throw new Error("Invalid response format");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError("Failed to load FAQs");

        // Fallback to static data for demo purposes
        setFaqs([
          {
            id: 1,
            question: "What is your return policy?",
            answer:
              "We offer a 30-day return policy for all unworn items with original tags attached. Shipping costs for returns are the responsibility of the customer.",
          },
          {
            id: 2,
            question: "How long does shipping take?",
            answer:
              "Domestic orders typically take 3-5 business days. International shipping can take 7-14 business days depending on the destination.",
          },
          {
            id: 3,
            question: "Do you ship internationally?",
            answer:
              "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
          },
          {
            id: 4,
            question: "How can I track my order?",
            answer:
              "Once your order ships, you'll receive a tracking number via email to monitor your package's journey.",
          },
        ]);

        setLoading(false);
      }
    };

    // Helper function to try and extract FAQs from various response formats
    const extractFaqsFromResponse = (responseData) => {
      // Handle different possible response structures
      if (responseData.faqs && Array.isArray(responseData.faqs)) {
        return responseData.faqs;
      }

      // Try to convert object to array if it has numeric keys
      if (typeof responseData === "object" && !Array.isArray(responseData)) {
        const possibleArray = Object.values(responseData);
        if (possibleArray.length > 0 && possibleArray[0].question) {
          return possibleArray;
        }
      }

      // Return empty array if no format matches
      return [];
    };

    fetchFAQs();
  }, []);

  // Handle toggle for FAQ items
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Render loading state
  if (loading) {
    return (
      <section
        id="faq"
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-lg mx-auto">Loading FAQs...</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse space-y-4 w-full">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="border rounded-xl h-16 bg-gray-100"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-lg mx-auto">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <div className="space-y-5">
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <div
                key={faq.id || index}
                className={`border rounded-xl shadow-sm overflow-hidden transition-all duration-200 ${
                  activeIndex === index
                    ? "border-black"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <button
                  className="w-full text-left px-6 py-5 focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`font-medium text-lg transition-colors duration-200 ${
                        activeIndex === index ? "text-black" : "text-gray-700"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`ml-6 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                        activeIndex === index
                          ? "bg-black text-white rotate-180"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5 pt-1">
                    <div className="w-16 h-px bg-gray-200 mb-4"></div>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No FAQs available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
