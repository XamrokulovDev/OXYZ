import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const Routerlayout = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
      {showScrollBtn && (
        <div className="cursor-pointer rounded-full w-13 h-13 flex items-center justify-center shadow-lg border border-gray-200 bg-white fixed bottom-12 right-12 max-lg:right-4 max-lg:bottom-5 z-[97]">
          <button
            onClick={scrollToTop}
            className="text-orange-500"
            aria-label="Scroll to top"
          >
            <IoIosArrowUp size={23} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Routerlayout;