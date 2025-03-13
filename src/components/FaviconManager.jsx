import { useEffect } from "react";
import axios from "axios";

const FaviconManager = () => {
  useEffect(() => {
    const fetchFavicon = async () => {
      try {
        const response = await axios.get("/api/settings");
        if (
          response.data &&
          response.data.success &&
          response.data.data.favicon
        ) {
          // Get the favicon URL
          const faviconUrl = `/storage/${response.data.data.favicon}`;

          // Update the favicon link
          let link = document.querySelector('link[rel="icon"]');

          // If no favicon link exists, create one
          if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
          }

          // Set the href attribute to the favicon URL
          link.href = faviconUrl;

          // Add apple touch icon for iOS devices
          let appleIcon = document.querySelector(
            'link[rel="apple-touch-icon"]'
          );
          if (!appleIcon) {
            appleIcon = document.createElement("link");
            appleIcon.rel = "apple-touch-icon";
            document.head.appendChild(appleIcon);
          }
          appleIcon.href = faviconUrl;

          console.log("Favicon updated successfully:", faviconUrl);
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
