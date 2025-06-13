import { IoFunnelOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaTruck } from "react-icons/fa6";
import { CiStar, CiClock2 } from "react-icons/ci";
import { LuLightbulb } from "react-icons/lu";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const cards = [
  {
    title_ru: "Узкая специализация",
    title_uz: "Tor ixtisoslashuv",
    icon: <IoFunnelOutline />,
    desc_ru: "Мы не хватаемся за всё подряд. Наша сила — в профессионализме и фокусе на температурных грузах.",
    desc_uz: "Biz hamma ishga bosh suqmaymiz. Kuchimiz — faqat sovutiladigan yuklarga ixtisoslashganimiz va professionalligimizda.",
  },
  {
    title_ru: "Собственный транспорт",
    title_uz: "Shaxsiy transport",
    icon: <FaTruck />,
    desc_ru: "У нас есть собственные рефрижераторы, и мы работаем только с проверенными перевозчиками.",
    desc_uz: "Bizda o‘zimizga tegishli sovitkichli transport vositalari bor va faqat ishonchli tashuvchilar bilan ishlaymiz.",
  },
  {
    title_ru: "Честность и прозрачность",
    title_uz: "Halollik va shaffoflik",
    icon: <CiStar />,
    desc_ru: "Никаких скрытых условий. Честные расчёты. Доступ к информации на всех этапах. Постоянная связь.",
    desc_uz: "Hech qanday yashirin shartlar yo‘q. Halol hisob-kitob. Har bir bosqichda to‘liq ma’lumot. Doimiy aloqa.",
  },
  {
    title_ru: "Индивидуальные решения",
    title_uz: "Individual yechimlar",
    icon: <LuLightbulb />,
    desc_ru: "Каждый маршрут, каждый груз — уникальны. Мы подбираем оптимальный вариант для каждой задачи.",
    desc_uz: "Har bir yo‘nalish, har bir yuk — noyob. Har bir vazifa uchun eng maqbul yechimni tanlaymiz.",
  },
  {
    title_ru: "Контроль 24/7",
    title_uz: "24/7 nazorat",
    icon: <CiClock2 />,
    desc_ru: "Вы всегда можете узнать, где ваш груз. Без «ожидайте» и «мы уточним позже».",
    desc_uz: "Yukingiz qayerdaligini istalgan vaqtda bilasiz. “Kuting” yoki “keyin aytamiz” degan gaplar bo‘lmaydi.",
  },
  {
    title_ru: "Юридическая точность",
    title_uz: "Yuridik aniqlik",
    icon: <IoCheckmarkDoneOutline />,
    desc_ru: "Мы грамотно сопровождаем все документы: от заявки до финального отчета.",
    desc_uz: "Hujjatlar bilan to‘g‘ri ishlaymiz: arizadan to yakuniy hisobotgacha hammasi huquqiy asosda yuritiladi.",
  },
];

const Us = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isAboutPage = location.pathname === "/about";

  const containerClass = `${isAboutPage ? "bg-white py-10" : "bg-[#F7F7F6]"} my-20 py-20`;
  const containerClasses = `${isAboutPage ? "bg-[#F7F7F6] py-10" : "bg-white"} h-full flex flex-col justify-between  rounded-[16px] p-6`;

  return (
    <div className={containerClass}>
      <h1 className='text-[#1A1A18] text-[28px] md:text-[48px] font-[600] text-center leading-[120%] px-4'>{t('us.title')}</h1>
      <p className='font-[400] text-[#1A1A18] text-[18px] md:text-[20px] text-center px-4 mt-2'>
        {t('us.description')}
      </p>
      <section className='container px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-3 mx-auto mt-10'>
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="h-full"
          >
            <div className={containerClasses}>
              <div className='flex justify-between items-start'>
                <h2 className='text-[#1A1A18] font-[600] font-manrope text-[32px] leading-[100%]'>
                  { i18n.language === "uz" ? card.title_uz : card.title_ru }
                </h2>
                <div className="bg-[#F07C00] p-3 w-[54px] h-[54px] rounded-[15px] text-white text-[24px] flex justify-center items-center">
                  {card.icon}
                </div>
              </div>
              <p className='text-[#A7A6A1] text-[20px] font-[400] font-manrope leading-[140%] mt-10'>
                { i18n.language === "uz" ? card.desc_uz : card.desc_ru }
              </p>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Us;