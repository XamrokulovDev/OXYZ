import { IoIosArrowForward } from "react-icons/io"
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import ModalForm from "./ModalForm"

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut"
    }
  })
}

const Header = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        ref={ref}
        className='bg-[url("/src/assets/bg.png")] bg-cover bg-center m-[10px] sm:h-[800] h-[900px] rounded-xl relative flex items-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-20'
      >
        <div className="w-full h-full absolute top-0 left-0 bg-[#00000099]/60"></div>
        <div className="text-white space-y-6 w-full sm:w-[90%] md:w-[80%] lg:max-w-[600px]">
          {/* TITLE */}
          <motion.h1
            className="relative md:text-[36px] text-[28px] font-manrope font-[700] leading-tight"
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {t('header.title_1')}
            <br className="hidden md:block" /> {t('header.title_2')}
          </motion.h1>
          {/* PARAGRAPH */}
          <motion.p
            className="relative text-[20px] font-manrope font-[500] leading-[120%]"
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {t('header.description_1')} <br className="hidden sm:block" />
            {t('header.description_2')} <br className="hidden sm:block" />
            {t('header.description_3')}
          </motion.p>
          {/* BUTTON */}
          <motion.div
            className="relative inline-block "
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="relative inline-block group">
              <motion.button
                onClick={handleOpenModal}
                className="relative bg-[#F07C00] group-hover:bg-orange-600 rounded-[8px] flex items-center overflow-hidden cursor-pointer gap-3 mt-10 pl-7 p-2"
              >
                <span className="flex items-center text-white font-[400] font-manrope text-[20px] max-xl:text-[16px] leading-[100%] gap-3">
                  {t('global.button')}
                  <span className="bg-white transition-all duration-300 text-[#F07C00] p-4 max-xl:p-2 text-xl rounded-sm">
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
          </motion.div>
        </div>
      </div>
      {/* MODAL */}
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
  )
}

export default Header;