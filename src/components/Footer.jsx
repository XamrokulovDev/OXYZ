import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import {
  FaTelegramPlane,
} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/Group 9.webp";
import { NavbarList } from "../../data/data";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ModalForm from "./ModalForm";
import axios from "axios";
import { PiInstagramLogoFill } from "react-icons/pi";

const Footer = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  const years = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [social, setSocial] = useState({});
  const _api = import.meta.env.VITE_API;
  useEffect(() => {
    const fetchData = async () => {
       try {
         const response = await axios.get(`${_api}/api/social-media`);
         setSocial(response.data.links);
      } catch (error) {
        console.error("Socials ma’lumotini olishda xatolik:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
    <motion.footer
      ref={ref}
      className="bg-[#181716] text-white"
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <motion.div className="container mx-auto px-4 pt-16" variants={variants}>
        <div className="flex flex-col md:flex-row justify-between items-center max-lg:items-start mb-10 gap-6">
          <h1 title={t('footer.title')} className="md:text-[48px] text-[28px] font-manrope font-[600] leading-[120%]">
            {t('footer.title')}
          </h1>
          <div className="relative inline-block group">
            <motion.button
              onClick={handleOpenModal}
              className="relative bg-white text-orange-500 font-semibold rounded-md flex items-center overflow-hidden cursor-pointer gap-3 pl-7 p-2"
            >
              <span className="flex items-center text-[#1A1A18] font-[400] font-manrope text-[20px] max-xl:text-[16px] leading-[100%] gap-3">
                {t('global.button')}
                <span className="bg-orange-500 group-hover:bg-orange-600 transition-all duration-300 text-white p-4 text-xl rounded-sm">
                  <IoIosArrowForward size={20} />
                </span>
              </span>
              {/* Shine effect */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
                initial={{ x: "-100%" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              >
                <div className="w-[30%] h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transform -skew-x-12" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        <hr className="border-gray-700 mb-20 " />

        <motion.div
          className="flex gap-10 items-start max-md:justify-start justify-between max-xl:flex-wrap"
          variants={variants}
        >
          <div>
            <NavLink to="/" className="block mb-4">
              <img 
                src={logo} 
                alt="OXYZ" 
                loading="lazy"
              />
            </NavLink>
            <p className="w-[300px] text-white/50 font-manrope font-[400] text-[20px] mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-2">
              {social?.whatsapp && (
                <a
                  href={social.whatsapp}
                  target="_blank"
                   rel="noopener noreferrer"
                  className="bg-[#232323] p-3 rounded-lg transition duration-300 hover:bg-orange-500"
                 >
                   <IoLogoWhatsapp  size={22} className="text-white"/>
                 </a>
               )}
               {social?.telegram && (
                 <a
                   href={social.telegram}
                   target="_blank"
                   rel="noopener noreferrer"
                  className="bg-[#232323] p-3 rounded-lg transition duration-300 hover:bg-orange-500"
                >
                  <FaTelegramPlane  size={22} className="text-white"/>
                </a>
              )}
              {social?.facebook && (
                 <a
                   href={social.facebook}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-[#232323] p-3 rounded-lg transition duration-300 hover:bg-orange-500"
                 >
                   <FaFacebook  size={22} className="text-white"/>
                 </a>
               )}
               {social?.instagram && (
                 <a
                   href={social.instagram}
                  target="_blank"
                   rel="noopener noreferrer"
                   className="bg-[#232323] p-3 rounded-lg transition duration-300 hover:bg-orange-500"
                 >
                   <PiInstagramLogoFill  size={22} className="text-white"/>
                 </a>
              )}
            </div>
          </div>

          <div>
            <h3 title={t('footer.navigate')} className="text-[28px] text-white font-[600] font-manrope mb-4">
              {t('footer.navigate')}
            </h3>
            <ul className="flex flex-col items-start space-y-3">
              {NavbarList?.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                   <NavLink
                    to={item.link}
                    onClick={() => {
                      setIsOpen(false);
                       window.scrollTo({ top: 0 });
                    }}
                     className={`text-white/50 leading-[100%] text-[18px] font-[400] font-manrope`}
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

          <div>
            <h3 title={t('contact.title')} className="text-[28px] text-white font-[600] font-manrope mb-4">
              {t('contact.title')}
            </h3>
            <ul className="text-white/50 leading-[120%] text-[18px] font-[400] font-manrope space-y-4">
              <a 
                href={`tel:${social?.phone_number1}`} 
                className="block"
              >
                {social?.phone_number1}
              </a>
              <a 
                href={`tel:${social?.phone_number2}`} 
                className="block"
              >
                {social?.phone_number2}
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ufdworldservice@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                ufdworldservice@gmail.com
              </a>
              <li className="w-[260px]">
                {t('contact.map')}
              </li>
            </ul>
          </div>

          <div className="w-full max-sm:h-[300px] h-[500px] xl:w-[450px] xl:h-[300px]">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.5346202562!2d69.21327497657988!3d41.29723190158181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bf9e100f78b%3A0x5903cc924a4bdfff!2sMuqimiy%20178!5e0!3m2!1sru!2s!4v1749881259499!5m2!1sru!2s"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="bg-orange-500 text-white text-sm py-6 px-4 mt-[30px] flex flex-col md:flex-row justify-between items-center"
        variants={variants}
      >
        <div className="container mx-auto flex max-md:flex-col justify-between items-center gap-5">
          <div>© {years} {t('footer.years')}</div>
          <div className="flex flex-col md:flex-row md:mt-0 items-center">
            <NavLink
              to="/terms"
              className="hover:underline hover:-translate-y-[1px] transition duration-300"
            >
              {t('footer.description_1')}
            </NavLink>
            <span className="hidden md:inline mx-1">|</span>
            <NavLink
              to="/security"
              className="hover:underline hover:-translate-y-[1px] transition duration-300"
            >
              {t('footer.description_2')}
            </NavLink>
          </div>
        </div>
      </motion.div>
    </motion.footer>
    <AnimatePresence>
      {isModalOpen && (
         <motion.div
          key="overlay"
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/30 overflow-y-auto max-md:px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleCloseModal} 
         >
         <ModalForm onClose={handleCloseModal} />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Footer;