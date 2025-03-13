import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Featured from "./components/Featured";
import Collections from "./components/Collections";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import FaviconManager from "./components/FaviconManager"; // Import the FaviconManager

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* FaviconManager component to handle favicon updates */}
      <FaviconManager />

      <Navbar />
      <Hero />
      <Featured />
      <Collections />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
