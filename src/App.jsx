import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Featured from "./components/Featured";
import Collections from "./components/Collections";

import FAQ from "./components/FAQ";

import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      {" "}
      {/* Add w-full class */}
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
