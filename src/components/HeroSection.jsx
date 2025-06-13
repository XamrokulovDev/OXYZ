import { IoIosArrowForward } from "react-icons/io"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import map from "../assets/map.png";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <section
      ref={ref}
      className="container mx-auto flex flex-col items-center justify-center
                min-h-[400px] xs:min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] xl:min-h-[900px] 
                py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 
                px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 
                text-center relative bg-white"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
      >
        <img 
          src={map}
          alt="maping"
          className="w-full h-full max-sm:object-cover object-contain absolute top-0 left-0 opacity-30" 
        />
      </div>

      {/* Kontent */}
      <div className="container mx-auto relative z-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="font-manrope md:text-[48px] text-[28px] leading-[120%] font-[600]"
        >
          {t('hero_section.hero_title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="xl:w-[50%] font-[400] font-manrope md:text-[20px] text-[16px] leading-[140%] mt-3"
        >
          {t('hero_section.hero_description_1')}
          <br className="hidden xs:block" />
          {t('hero_section.hero_description_2')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
          className="group flex justify-center w-full mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-8 xl:mt-10"
        >
          <div className="relative">
            <NavLink to="/about">
            <motion.button
              className="relative cursor-pointer bg-orange-500 group-hover:bg-orange-600 transition-all duration-300 text-white font-[400] p-2 pl-7 rounded-[8px] flex items-center gap-3 overflow-hidden md:text-[20px] text-[16px] leading-[100%]"
            >
              <span>{t('hero_section.hero_button')}</span>
              <span className="bg-white text-orange-500 group-hover:text-orange-600 transition-all duration-300 p-4 rounded-md">
                <IoIosArrowForward size={20} />
              </span>
              {/* Shine */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
                initial={{ x: "-100%" }}
                animate={inView ? { x: ["-100%", "200%"] } : {}}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2.5,
                  ease: "easeInOut",
                }}
              >
                <div className="w-[35%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-15" />
              </motion.div>
            </motion.button>
            </NavLink>
          </div>
        </motion.div>
      </div>

      {/* Media queries */}
      <style jsx>{`
        @media (max-width: 480px) {
          div[style*="background-image"] {
            background-size: 200% auto;
          }
        }
        @media (min-width: 481px) and (max-width: 640px) {
          div[style*="background-image"] {
            background-size: 180% auto;
          }
        }
        @media (min-width: 641px) and (max-width: 768px) {
          div[style*="background-image"] {
            background-size: 150% auto;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          div[style*="background-image"] {
            background-size: 130% auto;
          }
        }
        @media (min-width: 1025px) and (max-width: 1280px) {
          div[style*="background-image"] {
            background-size: 120% auto;
          }
        }
        @media (min-width: 1281px) {
          div[style*="background-image"] {
            background-size: 100% auto;
          }
        }
      `}</style>
    </section>
  )
}

export default HeroSection;