import { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all unworn items with original tags attached. Shipping costs for returns are the responsibility of the customer.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Domestic orders typically take 3-5 business days. International shipping can take 7-14 business days depending on the destination.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email to monitor your package's journey.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Using pure CSS transitions for smooth animations

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
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl shadow-sm overflow-hidden transition-all duration-200 ${
                activeIndex === index
                  ? "border-black"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                className="w-full text-left px-6 py-5 focus:outline-none"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
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
                      className={`transition-transform duration-300 ${
                        activeIndex === index ? "transform rotate-180" : ""
                      }`}
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
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional help section */}
        <div className="mt-16 text-center bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Our customer support team is here to help you.
          </p>

          {showContactInfo ? (
            <div className="animate-fadeIn">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6 inline-block">
                <div className="flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700 mr-2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="font-medium text-gray-800">
                    (123) 456-7890
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Available Mon-Fri, 9am-5pm EST
                </p>
              </div>
              <button
                onClick={() => setShowContactInfo(false)}
                className="text-gray-600 underline hover:text-black transition-colors"
              >
                Hide Contact Info
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowContactInfo(true)}
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors duration-300"
            >
              Contact Support
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
