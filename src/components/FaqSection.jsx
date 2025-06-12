import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

const FaqSection = () => {
  const [openItems, setOpenItems] = useState([0]);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const faqData = [
    {
      id: 1,
      question: "Сколько времени занимает доставка груза?",
      answer:
        "Сроки зависят от региона назначения, объёма и типа перевозки. Внутрироссийские доставки — от нескольких часов. Международные и межконтинентальные — от 1 дня до нескольких недель. Мы всегда заранее сообщаем ориентировочные сроки и держим вас в курсе на каждом этапе.",
    },
    {
      id: 2,
      question: "Можно ли отследить мой груз?",
      answer:
        "Да, мы предоставляем полную информацию о местонахождении вашего груза на каждом этапе доставки. Вы получите трек-номер и сможете отслеживать груз через наш сайт или мобильное приложение.",
    },
    {
      id: 3,
      question: "Какие грузы вы не перевозите?",
      answer:
        "Мы не перевозим опасные, запрещённые к транспортировке грузы, а также товары, требующие специальных разрешений без соответствующих документов. Полный список ограничений можно уточнить у наших менеджеров.",
    },
    {
      id: 4,
      question: "Вы помогаете с оформлением документов для международной доставки?",
      answer:
        "Да, наши специалисты помогут с оформлением всех необходимых документов для международной доставки, включая таможенные декларации, сертификаты и разрешения.",
    },
    {
      id: 5,
      question: "Что делать, если груз повреждён или утерян?",
      answer:
        "В случае повреждения или утери груза мы проводим расследование и компенсируем ущерб согласно условиям страхования. Обратитесь к нашему менеджеру для оформления претензии.",
    },
  ];

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="md:my-30 my-15" ref={sectionRef}>
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Title */}
        <h2 className="text-[#111111] font-manrope font-[600] md:text-[48px] text-[28px] text-center">
          Часто задаваемые вопросы
        </h2>

        {/* FAQ Items */}
        <div className="divide-y divide-[#CAC9C5]">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              className="py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-start gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 flex-1">
                  <span className="text-[#111111]/40 font-[600] font-manrope md:text-[36px] text-[24px] leading-[120%] ">
                    {String(item.id).padStart(2, "0")}
                  </span>
                  <h3 className="text-[#1A1A18] md:text-[24px] text-[20px] font-[600] font-manrope leading-[140%]">
                    {item.question}
                  </h3>
                </div>
                <motion.div
                  className="flex-shrink-0 ml-4"
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {openItems.includes(index) ? (
                    <div className="w-10 h-10 bg-orange-500 rounded-[8px] flex items-center justify-center cursor-pointer">
                      <FiMinus
                        size={21}
                        className="text-white text-xs xs:text-sm sm:text-base md:text-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-[8px] flex items-center justify-center hover:bg-orange-500 group transition-colors duration-200 cursor-pointer">
                      <GoPlus
                        size={21}
                        className="text-gray-600 group-hover:text-white text-xs xs:text-sm sm:text-base md:text-lg transition-colors duration-200"
                      />
                    </div>
                  )}
                </motion.div>
              </button>

              {/* Answer Content */}
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 xs:pt-5 sm:pt-6 md:pt-8">
                      <div className="px-8 xs:px-10 sm:pl-12 md:px-16 lg:px-20">
                        <p className="md:text-[18px] text-[16px] font-manrope font-[400] leading-[140%]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FaqSection;