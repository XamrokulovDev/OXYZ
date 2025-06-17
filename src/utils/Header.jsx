import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import img from "../assets/about.webp";

const Header = ({ articleTitle }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const routeKeys = {
    home: "schema.header.home",
    about: "schema.header.about",
    services: "schema.header.services",
    news: "schema.header.news",
    new: "schema.header.news",
    contact: "schema.header.contact",
  };

  const currentPath = location.pathname.split("/")[1].toLowerCase();
  const pageKey = routeKeys[currentPath] || "schema.header.home";
  const pageTitle = t(pageKey);

  return (
    <motion.div
      className="w-full h-[450px] p-3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full h-full rounded-xl overflow-hidden relative">
        <img
          src={img}
          alt="Header"
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
              className={`text-white font-manrope font-[700] lg:text-[64px] leading-[110%] px-3 ${
                articleTitle ? "text-[25px]" : "text-[35px]"
              }`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {articleTitle || pageTitle}
            </motion.h1>
            <motion.div
              className={`flex items-center justify-center gap-2 mt-3 px-3 ${
                articleTitle ? "flex-wrap" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <NavLink
                to="/"
                className="text-white font-manrope font-[500] text-[16px] lg:text-[20px]"
              >
                {t("schema.header.home")}
              </NavLink>
              <span className="text-white">/</span>
              {articleTitle ? (
                <>
                  <NavLink
                    to="/news"
                    className="text-white font-manrope font-[500] text-[16px] lg:text-[20px]"
                  >
                    {t("schema.header.news")}
                  </NavLink>
                  <span className="text-white">/</span>
                  <span className="text-white/50 font-manrope font-[500] text-[16px] lg:text-[20px]">
                    {articleTitle}
                  </span>
                </>
              ) : (
                <span className="text-white/50 font-manrope font-[500] text-[16px] lg:text-[20px]">
                  {pageTitle}
                </span>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;