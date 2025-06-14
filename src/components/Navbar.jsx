import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegram, FaFacebook } from "react-icons/fa6";
import { TbMenu } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaTelegramPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarList } from "../../data/data";
import Translation from "../utils/Translation";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [social, setSocial] = useState({});
  const _api = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${_api}/api/social-media`);
        setSocial(response.data);
        console.log(response.data.links)
      } catch (error) {
        console.error("Socials ma’lumotini olishda xatolik:", error);
      }
    };
    fetchData();
  }, []);

  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  const navVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="w-full absolute left-0 top-0 z-50 p-5 md:p-8"
      >
        <div className="flex items-center justify-between">
          <NavLink to={"/"}>
            <motion.img
              src={logo}
              alt="logo"
              loading="eager"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </NavLink>
          <div className="flex items-center gap-5">
            <motion.div
              className="flex flex-col items-end gap-2 max-md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#00FF00] rounded-full"></span>
                <p className="font-manrope font-[400] text-[14px] text-white/80 leading-[100%]">
                  {t('global.work')}
                </p>
              </div>
              <a 
                href={`tel:+99890-823-22-32`}
                className="text-white font-manrope font-[700] text-[20px] leading-[100%]"
              >
                +99890-823-22-32
              </a>
            </motion.div>
            <div className="flex items-center gap-1">
              <Translation />
              <motion.a
                href="https://wa.me/998908232232"
                target="_blank"
                className="w-12 h-12 cursor-pointer bg-white/20 flex items-center justify-center rounded-[8px] backdrop-blur-[4] max-md:hidden p-2"
              >
                <IoLogoWhatsapp size={23} className="text-white" />
              </motion.a>
              <motion.a
                href="https://t.me/username"
                target="_blank"
                className="w-12 h-12 cursor-pointer bg-white/20 flex items-center justify-center rounded-[8px] backdrop-blur-[4] max-md:hidden p-2"
              >
                <FaTelegram size={23} className="text-white" />
              </motion.a>
              <motion.div
                className="h-12 cursor-pointer bg-white flex items-center justify-center gap-2 rounded-[8px] backdrop-blur-[4] px-4 p-2"
                onClick={() => setIsOpen(true)}
              >
                <p className="text-[#1A1A18] font-manrope font-[400] text-[16px] leading-[100%]">
                  {t('global.menu')}
                </p>
                <TbMenu size={20} />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>
      {/* Sidebar with overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 z-[98]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="sm:w-[500px] w-full h-screen pb-10 bg-white fixed top-0 right-0 z-[99]"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-12 right-10 flex items-center cursor-pointer gap-2"
              >
                <p className="text-[#1A1A18] font-manrope font-[400] text-[16px] leading-[100%]">
                  {t('global.close')}
                </p>
                <IoClose size={21} />
              </button>
              <div className="sm:mt-50 mt-40 pr-10">
                <ul className="group flex flex-col items-end gap-5">
                  {NavbarList?.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <NavLink
                        to={item.link}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `sm:text-[36px] [@media(max-height:900px)]:text-[25px] text-[25px] font-[700] font-manrope leading-[100%] hover:text-[#E5E4E2] transition-all duration-300 ${
                            isActive ? "text-[#F07C00]" : "text-[#1A1A18]"
                          }`
                        }
                      >
                        {i18n.language === "uz"
                          ? item.title_uz
                          : item.title_ru
                        }
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="sm:mt-45 [@media(max-height:900px)]:mt-30 mt-30 pr-10">
                <div className="flex items-center justify-end gap-2">
                  <span className="w-2 h-2 bg-[#00FF00] rounded-full"></span>
                  <p className="font-manrope font-[400] sm:text-[24px] [@media(max-height:900px)]:text-[18px] text-[18px] text-[#1A1A18] leading-[100%]">
                    Пн-Сб, с 9:00 до 18:00
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 mt-2">
                  <a
                    href={`tel:+99890-823-22-32`}
                    className="font-manrope sm:font-[700] font-[600] sm:text-[32px] [@media(max-height:900px)]:text-[25px] text-[25px] leading-[100%] text-[#1A1A18] hover:text-[#F07C00] transition-all duration-300"
                  >
                    +99890-823-22-32
                  </a>
                  <a
                    href={`tel:+99899-536-57-47`}
                    className="font-manrope sm:font-[700] font-[600] sm:text-[32px] [@media(max-height:900px)]:text-[25px] text-[25px] leading-[100%] text-[#1A1A18] hover:text-[#F07C00] transition-all duration-300"
                  >
                    +99899-536-57-47
                  </a>
                </div>
                <div className="flex items-center justify-end mt-5 gap-2">
                  <a 
                    href="" 
                    target="_blank"
                    className="w-14 h-14 group cursor-pointer bg-[#EFEFEF] hover:bg-[#F07C00] flex items-center justify-center rounded-[8px] backdrop-blur-[4] transition-all duration-300 p-2"
                  >
                    <IoLogoWhatsapp size={25}/>
                  </a>
                  <a 
                    href=""
                    target="_blank"
                    className="w-14 h-14 group cursor-pointer bg-[#EFEFEF] hover:bg-[#F07C00] flex items-center justify-center rounded-[8px] backdrop-blur-[4] transition-all duration-300 p-2"
                  >
                    <FaTelegramPlane size={25}/>
                  </a>
                  <a 
                    href=""
                    target="_blank"
                    className="w-14 h-14 group cursor-pointer bg-[#EFEFEF] hover:bg-[#F07C00] flex items-center justify-center rounded-[8px] backdrop-blur-[4] transition-all duration-300 p-2"
                  >
                    <FaFacebook size={25}/>
                  </a>
                  <a 
                    href=""
                    target="_blank"
                    className="w-14 h-14 group cursor-pointer bg-[#EFEFEF] hover:bg-[#F07C00] flex items-center justify-center rounded-[8px] backdrop-blur-[4] transition-all duration-300 p-2"
                  >
                    <PiInstagramLogoFill size={25}/>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;