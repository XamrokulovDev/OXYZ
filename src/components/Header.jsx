import { IoIosArrowForward } from "react-icons/io"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div 
      ref={ref}
      className='bg-[url("/src/assets/bg.png")] bg-cover bg-center m-[10px] h-[900px] rounded-xl relative flex items-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-20'
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
          OXYZ – международная логистика,
          <br className="hidden md:block" /> на которую можно положиться
        </motion.h1>

        {/* PARAGRAPH */}
        <motion.p
          className="relative text-[20px] font-manrope font-[500] leading-[120%]"
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          Мы — компания, которая берёт на себя всё, что связано <br className="hidden sm:block" />
          с международной перевозкой грузов, чтобы вы могли <br className="hidden sm:block" />
          спокойно заниматься бизнесом.
        </motion.p>

        {/* BUTTON */}
        <motion.div
          className="relative inline-block"
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.button
            className="group relative bg-white text-orange-500 rounded-[8px] flex items-center overflow-hidden cursor-pointer gap-3 pl-7 p-2"
          >
            <span className="flex items-center text-[#1A1A18] font-[400] md:text-[24px] text-[16px] leading-[100%] gap-3">
              Получить консультацию
              <span className="bg-orange-500 group-hover:bg-orange-600 transition-all duration-300 text-white p-4 text-xl rounded-sm">
                <IoIosArrowForward size={20} />
              </span>
            </span>

            {/* ✨ Shine Effekt */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
              initial={{ x: "-100%" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 2.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            >
              <div className="w-[30%] h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transform -skew-x-12" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Header;