import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Hero = () => {
  const [sliders, setSliders] = useState([]);
  const [heroContent, setHeroContent] = useState({
    title: "Discover Your Perfect Style",
    description:
      "Explore our latest collection of premium clothing designed for comfort and style. Find your perfect fit today.",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderTimerRef = useRef(null);

  // Define scroll functions outside of useEffect so they're accessible to the JSX
  const scrollToCollection = () => {
    const collectionSection = document.getElementById("collections");
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFAQ = () => {
    const faqSection = document.getElementById("faq");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fetch hero content and sliders from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch hero content
        const heroResponse = await axios.get(
          "https://dashboard.samiafashions.com/api/hero"
        );
        if (heroResponse.data) {
          setHeroContent({
            title: heroResponse.data.title,
            description: heroResponse.data.description,
          });
        }

        // Fetch sliders
        const slidersResponse = await axios.get(
          "https://dashboard.samiafashions.com/api/sliders"
        );

        // Format the data for our slider
        const formattedSliders = slidersResponse.data.map((slider) => ({
          url: `https://dashboard.samiafashions.com/storage/${slider.image}`,
          alt: `Slider Image ${slider.id}`,
          id: slider.id,
          order: slider.order,
        }));

        // Sort by order if available
        formattedSliders.sort((a, b) => a.order - b.order);

        setSliders(formattedSliders);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load content");
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      if (sliderTimerRef.current) {
        clearInterval(sliderTimerRef.current);
      }
    };
  }, []);

  // Auto-slide functionality with restart on manual navigation
  useEffect(() => {
    if (sliders.length <= 1) return;

    const startSliderTimer = () => {
      if (sliderTimerRef.current) {
        clearInterval(sliderTimerRef.current);
      }

      sliderTimerRef.current = setInterval(() => {
        setIsTransitioning(true);
        setCurrentImage((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));

        // Reset transitioning state after animation completes
        setTimeout(() => {
          setIsTransitioning(false);
        }, 700); // Slightly shorter than the transition duration
      }, 6000); // Change slide every 6 seconds
    };

    startSliderTimer();

    return () => {
      if (sliderTimerRef.current) {
        clearInterval(sliderTimerRef.current);
      }
    };
  }, [sliders.length, currentImage]);

  // Manual navigation
  const goToSlide = (index) => {
    if (isTransitioning || index === currentImage) return;
    setIsTransitioning(true);
    setCurrentImage(index);

    // Reset timer when manually navigating
    if (sliderTimerRef.current) {
      clearInterval(sliderTimerRef.current);
    }

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImage((prev) => (prev === 0 ? sliders.length - 1 : prev - 1));

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImage((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  // Render fallback during initial loading or if no sliders
  if (loading || sliders.length === 0) {
    return (
      <section id="home" className="pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center py-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {heroContent.title}
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                {heroContent.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToCollection}
                  className="bg-[#e773a3] text-black font-bold px-8 py-3 rounded-md hover:bg-[#f7a9ca] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Shop Collection
                </button>

                <button
                  onClick={scrollToFAQ}
                  className="bg-black text-white border-2 border-black px-8 py-3 rounded-md hover:bg-gray-900 transition-colors duration-300"
                >
                  FAQ
                </button>
              </div>
            </div>
            {/* No fallback image here - will just show text content when no sliders */}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center py-8">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {heroContent.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              {heroContent.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToCollection}
                className="bg-[#e773a3] text-black font-bold px-8 py-3 rounded-md hover:bg-[#f7a9ca] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Shop Collection
              </button>

              <button
                onClick={scrollToFAQ}
                className="bg-black text-white border-2 border-black px-8 py-3 rounded-md hover:bg-gray-900 transition-colors duration-300"
              >
                FAQ
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg shadow-2xl order-1 md:order-2 h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
            {/* Error Message */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {/* Image Slider */}
            <div className="relative w-full h-full">
              {sliders.map((image, index) => (
                <div
                  key={image.id || index}
                  className={`absolute w-full h-full transition-all duration-1000 ease-in-out ${
                    index === currentImage
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-105 z-0"
                  }`}
                  style={{
                    transform:
                      index === currentImage
                        ? "translate3d(0,0,0)"
                        : `translate3d(${
                            index < currentImage ? "-5%" : "5%"
                          },0,0)`,
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="rounded-lg w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows - Only show if more than one slide */}
            {sliders.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-colors duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Previous slide"
                  disabled={isTransitioning}
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
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-colors duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Next slide"
                  disabled={isTransitioning}
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
                <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-3 z-20">
                  {sliders.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImage
                          ? "bg-white w-6"
                          : "bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      disabled={isTransitioning}
                    ></button>
                  ))}
                </div>
              </>
            )}

            {/* Progress Bar */}
            {sliders.length > 1 && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
                <div
                  className="h-full bg-white transition-all duration-300 ease-linear"
                  style={{
                    width: `${(currentImage / (sliders.length - 1)) * 100}%`,
                    transitionDuration: isTransitioning ? "700ms" : "0ms",
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
