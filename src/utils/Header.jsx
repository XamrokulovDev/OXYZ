import img from "../assets/about.jpg";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const routeKeys = {
    about: "schema.header.about",
    services: "schema.header.services",
    news: "schema.header.news",
    contact: "schema.header.contact",
  };

  const currentPath = location.pathname
    .split("/")[1]
    .toLowerCase();

  const pageKey = routeKeys[currentPath] || "schema.header.home";
  const pageTitle = t(pageKey);

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
          alt="header image"
          loading="lazy"
          className="w-full h-full absolute top-0 left-0 z-2 object-cover"
        />
        <div className="w-full h-full bg-[#f07c00]/80 absolute inset-0 flex items-center justify-center z-3">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.h1
              title={pageTitle}
              className="text-white font-manrope font-[700] text-[64px] leading-[110%] max-md:text-[40px]"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {pageTitle}
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
                {t("schema.header.home")}
              </NavLink>
              <span className="text-white">/</span>
              <span className="text-white/50 text-[20px] font-[500] leading-[120%] font-manrope">
                {pageTitle}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;