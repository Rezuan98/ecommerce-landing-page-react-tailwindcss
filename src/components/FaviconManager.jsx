import { useEffect } from "react";
import axios from "axios";

const FaviconManager = () => {
  useEffect(() => {
    // Immediately set a default favicon to prevent any browser default from showing
    const setDefaultFavicon = () => {
      // Set a simple inline SVG favicon as data URL - using a larger viewBox for better quality
      const defaultFaviconUrl = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32"><text y="0.9em" font-size="90" font-family="sans-serif" font-weight="bold" text-anchor="middle" x="50" y="50" fill="black">S</text></svg>`;

      // Create or update the favicon link with explicit size attributes
      let link = document.querySelector('link[rel="icon"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/svg+xml"; // Specify SVG type
        link.sizes = "64x64"; // Specify size
        document.head.appendChild(link);
      }
      link.href = defaultFaviconUrl;

      // Also set apple touch icon with multiple sizes
      const appleSizes = [
        "57x57",
        "60x60",
        "72x72",
        "76x76",
        "114x114",
        "120x120",
        "144x144",
        "152x152",
        "180x180",
      ];

      // Remove any existing apple touch icons
      document
        .querySelectorAll('link[rel="apple-touch-icon"]')
        .forEach((el) => el.remove());

      // Create apple touch icons for different device sizes
      appleSizes.forEach((size) => {
        let appleIcon = document.createElement("link");
        appleIcon.rel = "apple-touch-icon";
        appleIcon.sizes = size;
        appleIcon.href = defaultFaviconUrl;
        document.head.appendChild(appleIcon);
      });
    };

    // Set default favicon immediately
    setDefaultFavicon();

    // Then fetch the actual favicon from API
    const fetchFavicon = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/settings");
        if (
          response.data &&
          response.data.success &&
          response.data.data.favicon
        ) {
          // Get the favicon URL
          const faviconUrl = `/storage/${response.data.data.favicon}`;

          // Preload the image to ensure it's fully loaded before switching
          const img = new Image();
          img.onload = () => {
            // Update the favicon link after image is loaded
            let link = document.querySelector('link[rel="icon"]');
            if (link) {
              link.href = faviconUrl;
              link.sizes = "32x32"; // Standard favicon size
            }

            // Create favicon links for different sizes
            const sizes = ["16x16", "32x32", "48x48", "64x64"];
            sizes.forEach((size) => {
              let sizedLink = document.querySelector(
                `link[rel="icon"][sizes="${size}"]`
              );
              if (!sizedLink) {
                sizedLink = document.createElement("link");
                sizedLink.rel = "icon";
                sizedLink.sizes = size;
                document.head.appendChild(sizedLink);
              }
              sizedLink.href = faviconUrl;
            });

            // Update apple touch icons for all sizes
            document
              .querySelectorAll('link[rel="apple-touch-icon"]')
              .forEach((icon) => {
                icon.href = faviconUrl;
              });

            console.log("Favicon updated successfully:", faviconUrl);
          };
          img.src = faviconUrl;
        }
      } catch (error) {
        console.error("Failed to fetch favicon:", error);
      }
    };

    fetchFavicon();
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default FaviconManager;
