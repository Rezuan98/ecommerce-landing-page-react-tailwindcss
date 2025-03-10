import { useState, useEffect } from "react";

const Hero = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      alt: "Fashion Model 1",
    },
    {
      url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      alt: "Fashion Model 2",
    },
    {
      url: "https://images.unsplash.com/photo-1490725263030-1f0521cec8ec",
      alt: "Fashion Model 3",
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentImage(index);
  };

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="home" className="pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center py-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Your Perfect Style
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore our latest collection of premium clothing designed for
              comfort and style. Find your perfect fit today.
            </p>
            <div className="space-x-4">
              <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800">
                Shop Collection
              </button>
              <button className="border border-black text-black px-8 py-3 rounded-md hover:bg-gray-100">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            {/* Image Slider */}
            <div className="relative h-[400px]">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
                    index === currentImage ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="rounded-lg shadow-xl w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImage
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
