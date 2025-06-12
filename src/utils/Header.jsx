import img from "../assets/about.jpg";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const location = useLocation();

  const header = [
    { keyword: "about", title: "О нас" },
    { keyword: "services", title: "Услуги" },
    { keyword: "news", title: "Новости" },
    { keyword: "contact", title: "Контакты" }
  ];

  const currentPath = location.pathname.replace("/", "");
  const currentPage = header.find(item => item.keyword === currentPath);

  return (
    <motion.div
      className="w-full h-[550px] max-md:h-[450px] p-3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full h-full rounded-xl overflow-hidden relative">
        <img 
          src={img} 
          alt="" 
          className="w-full h-full absolute top-0 left-0 z-2 object-cover"
        />
        <div className="w-full h-full bg-[#f07c00]/80 absolute top-0 left-0 flex items-center justify-center z-3">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.h1 
              title={currentPage ? currentPage.title : "Главная"} 
              className="text-white font-manrope font-[700] text-[64px] leading-[110%]"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {currentPage ? currentPage.title : "Главная"}
            </motion.h1>

            <motion.div
              className="flex items-center justify-center gap-2 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <NavLink
                to="/" 
                className="text-white font-manrope font-[500] text-[20px] leading-[120%]"
              >
                Главная
              </NavLink>
              <p className="text-white">/</p>
              <p className="text-white/50 text-[20px] font-[500] leading-[120%] font-manrope">
                {currentPage ? currentPage.title : "Главная"}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;