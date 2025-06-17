import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FaqSection = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const sectionRef = useRef(null);
  const [openItems, setOpenItems] = useState([0]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isAboutPage = location.pathname === "/about";
  const containerClass = `${isAboutPage ? "bg-[#F7F7F6] py-30" : "bg-white"}`;

  const faqData = [
  {
    id: 1,
    question_ru: "Сколько времени занимает доставка груза?",
    question_uz: "Yuk yetkazib berish qancha vaqt oladi?",
    answer_ru: "Сроки зависят от региона назначения, объёма и типа перевозки. Международные — от 1 дня до нескольких недель. Мы всегда заранее сообщаем ориентировочные сроки и держим вас в курсе на каждом этапе.",
    answer_uz: "Yetkazib berish muddati manzil mintaqasi, hajmi va tashish turiga bog‘liq. Xalqaro yetkazib berish 1 kundan bir necha haftagacha davom etadi. Biz har doim taxminiy muddatlarni oldindan bildiramiz va har bir bosqichda sizni xabardor qilib boramiz."
  },
  {
    id: 2,
    question_ru: "Можно ли отследить мой груз?",
    question_uz: "Yukimni kuzatish mumkinmi?",
    answer_ru: "Да. Мы ежедневно информируем вас о местоположении груза через менеджера.",
    answer_uz: "Ha. Biz har kuni menejer orqali sizga yukning joylashuvi haqida ma’lumot berib boramiz."
  },
  {
    id: 3,
    question_ru: "Какие грузы вы не перевозите?",
    question_uz: "Qanday yuklarni tashimaysizlar?",
    answer_ru: "Мы не перевозим запрещённые к транспортировке грузы, а также товары, требующие специальных разрешений без соответствующих документов. Полный список ограничений можно уточнить у наших менеджеров.",
    answer_uz: "Biz tashish taqiqlangan yuklarni, shuningdek, maxsus ruxsatnomalarsiz maxsus hujjatlarni talab qiladigan tovarlarni tashimaymiz. Cheklovlarning to‘liq ro‘yxatini menejerlarimizdan aniqlashtirishingiz mumkin."
  },
  {
    id: 4,
    question_ru: "Вы помогаете с оформлением документов для международной доставки?",
    question_uz: "Xalqaro yetkazib berish uchun hujjatlarni rasmiylashtirishda yordam berasizlarmi?",
    answer_ru: "Да, наши специалисты помогут с оформлением всех необходимых документов для международной доставки, включая таможенные декларации, сертификаты и разрешения.",
    answer_uz: "Ha, mutaxassislarimiz xalqaro yetkazib berish uchun barcha zarur hujjatlarni, shu jumladan bojxona deklaratsiyalari, sertifikatlar va ruxsatnomalarni rasmiylashtirishda yordam beradi."
  },
  {
    id: 5,
    question_ru: "Что делать, если груз повреждён или утерян?",
    question_uz: "Agar yuk shikastlansa yoki yo‘qolsa nima qilish kerak?",
    answer_ru: "В случае повреждения или утери груза мы проводим расследование и компенсируем ущерб согласно условиям страхования. Обратитесь к нашему менеджеру для оформления претензии.",
    answer_uz: "Agar yuk shikastlansa yoki yo‘qolsa, biz tekshiruv o‘tkazamiz va sug‘urta shartlariga muvofiq zarar o‘rnini qoplaymiz. Da’vo arizasini rasmiylashtirish uchun menejerimizga murojaat qiling."
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
    <section className={`${containerClass} md:my-30 my-15`} ref={sectionRef}>
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Title */}
        <h2 title={t('faq.title')} className="text-[#111111] font-manrope font-[600] md:text-[48px] text-[28px] text-center">
          {t('faq.title')}
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
                  <h3 title={i18n.language === "uz" ? item.question_uz : item.question_ru} className="text-[#1A1A18] md:text-[24px] text-[20px] font-[600] font-manrope leading-[140%]">
                    {i18n.language === "uz" ? item.question_uz : item.question_ru}
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
                          {i18n.language === "uz" ? item.answer_uz : item.answer_ru}
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