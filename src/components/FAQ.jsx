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

  return (
    <section id="faq" className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our products and services.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg">
              <button
                className="w-full text-left px-6 py-4 focus:outline-none"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{faq.question}</span>
                  <span className="ml-6">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </div>
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
