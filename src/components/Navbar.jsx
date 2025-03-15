import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Bars3Icon, XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/samialogo.png");
  const [phoneNumber, setPhoneNumber] = useState("(123) 456-7890");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch logo and phone number from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          "https://dashboard.samiafashions.com/api/settings"
        );
        console.log("Settings response:", response.data); // Debug log to see the actual structure

        if (response.data && response.data.success) {
          const { logo, phone_number, favicon } = response.data.data;

          // Update logo URL if available
          if (logo) {
            // The full URL should be returned from the API
            // If it's not, we need to construct it properly
            if (logo.startsWith("http")) {
              setLogoUrl(logo);
            } else {
              // Assume the backend is expecting a relative path from the storage directory
              setLogoUrl(`http://127.0.0.1:8000/storage/${logo}`);
            }
            console.log("Logo URL set to:", logoUrl);
          }

          // Update phone number if available
          if (phone_number) {
            setPhoneNumber(phone_number);
          }

          // Update favicon if available
          if (favicon) {
            const link =
              document.querySelector('link[rel="icon"]') ||
              document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "icon";
            link.href = favicon.startsWith("http")
              ? favicon
              : `http://127.0.0.1:8000/storage/${favicon}`;
            document.head.appendChild(link);
          }
        }
      } catch (error) {
        console.error("Failed to fetch site settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", to: "home" },
    { name: "Collections", to: "collections" },
    { name: "Featured", to: "featured" },
    { name: "FAQ", to: "faq" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const togglePhoneNumber = () => {
    setShowPhone(!showPhone);
  };

  // Format phone number for tel: links
  const formatPhoneForTel = (phone) => {
    // Remove all non-numeric characters
    return phone.replace(/\D/g, "");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white z-50 shadow-sm transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              {isLoading ? (
                <div className="h-10 w-36 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <img
                  src={logoUrl}
                  alt="Samia Fashion"
                  className="h-50 w-auto object-contain"
                  onError={(e) => {
                    console.error("Logo failed to load:", logoUrl);
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/150x50?text=Samia+Fashion";
                  }}
                />
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                smooth={true}
                duration={500}
                className="text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
                activeClass="text-gray-900 font-semibold"
                spy={true}
              >
                {item.name}
              </Link>
            ))}
            <div className="relative">
              <button
                className="bg-[#e773a3] text-black font-bold px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white ml-2 flex items-center"
                onClick={togglePhoneNumber}
              >
                <PhoneIcon className="h-4 w-4 mr-2" />
                Contact Us
              </button>
              {showPhone && (
                <div className="absolute right-0 mt-2 py-2 px-4 bg-white rounded-md shadow-lg z-10 border border-gray-200 min-w-max">
                  <a
                    href={`tel:+${formatPhoneForTel(phoneNumber)}`}
                    className="flex items-center text-gray-800 hover:text-black"
                  >
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    {phoneNumber}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={500}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              activeClass="bg-gray-50 text-gray-900"
              spy={true}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="px-3 py-2">
            <a
              href={`tel:+${formatPhoneForTel(phoneNumber)}`}
              className="w-full bg-[#e773a3] text-black font-bold px-4 py-2 rounded-md hover:bg-gray-800 flex items-center justify-center"
            >
              <PhoneIcon className="h-4 w-4 mr-2" />
              Contact Us: {phoneNumber}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
