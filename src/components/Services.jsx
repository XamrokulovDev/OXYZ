import ship from '../assets/ship.webp'
import office from '../assets/office.webp'
import xujjat from '../assets/xujjat.webp'
import { MdArrowOutward } from "react-icons/md"
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

const Services = () => {
  const { t, i18n } = useTranslation();

  const servicesData = [
  {
    image: ship,
    title_ru: 'Организация международных перевозок',
    title_uz: "Xalqaro yuk tashishlarni tashkil etish",
    description_ru: 'Полная логистика грузов по направлениям Европа — СНГ — Китай. Рефрижераторы для скоропортящихся товаров, тентованные авто для оборудования и нетемпературных грузов. Контроль 24/7, прозрачные сроки, документы под ключ.',
    descrirption_uz: "Yevropa — MDH — Xitoy yo‘nalishlari bo‘yicha yuklarni to‘liq logistika xizmati. Tez buziladigan mahsulotlar uchun sovitkichli transportlar, uskunalar va haroratga bog‘liq bo‘lmagan yuklar uchun tentalik avtomobillar. 24/7 nazorat, ochiq muddatlar, barcha hujjatlar tayyor holda.",
    delay: 0,
  },
  {
    image: office,
    title_ru: 'Консультирование по ВЭД',
    title_uz: "Tashqi iqtisodiy faoliyat bo‘yicha maslahatlar",
    description_ru: 'Помогаем сориентироваться во внешнеэкономической деятельности: контракты, Incoterms, логистические риски и оптимизация расходов. Говорим на языке бизнеса, а не бюрократии.',
    descrirption_uz: "Tashqi iqtisodiy faoliyatda yo‘nalishni topishda yordam beramiz: shartnomalar, Incoterms, logistika xatarlari va xarajatlarni optimallashtirish. Biznes tilida gaplashamiz, byurokratiya emas.",
    delay: 0.2,
  },  
  {
    image: xujjat,
    title_ru: 'Таможенное оформление',
    title_uz: "Bojxona rasmiylashtiruvi",
    description_ru: 'Организуем корректное и быстрое прохождение таможни: документы, расчёт платежей, взаимодействие с брокерами. Без задержек, лишних расходов и штрафов.',
    descrirption_uz: "Bojxona nazoratidan to‘g‘ri va tez o‘tishni ta’minlaymiz: hujjatlar, to‘lov hisob-kitoblari, brokerlar bilan aloqalar. Ortiqcha kechikishlarsiz, qo‘shimcha xarajatlarsiz va jarimasiz.",
    delay: 0.4,
  },
];

  return (
    <div className='container mx-auto px-4'>
      <h1 title={t('services.title')} className='text-[28px] md:text-[48px] font-[600] text-[#1A1A18] text-center leading-[120%]'>{t('services.title')}</h1>
      <p className='text-[#1A1A18] font-[400] text-[16px] md:text-[20px] text-center leading-[140%] mt-2'>{t('services.description')}</p>
      <section className='mt-10 grid gap-6 grid-cols-3 max-md:grid-cols-1 max-xl:grid-cols-2 justify-items-center transition-all'>
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: service.delay }}
            viewport={{ once: true }}
            className="group relative w-full h-[530px] max-sm:h-[400px] max-3xl:h-[450px] rounded-xl overflow-hidden cursor-pointer transition-all duration-500"
          >
            <NavLink to="/services">
            <img
              src={service.image}
              alt="background"
              loading='lazy'
              className="w-full h-full object-cover absolute top-0 left-0 z-0 transition-all duration-500 group-hover:brightness-75"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#F07C00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <button className="absolute top-4 right-4 bg-white w-[54px] h-[54px] rounded-[8px] p-[15px] z-20 hover:text-[#F07C00] transition-all">
              <MdArrowOutward className="w-[24px] h-[24px] outline-none cursor-pointer" />
            </button>
            <div className="absolute bottom-0 left-0 w-full bg-[#F07C0000]/40 backdrop-blur-sm text-white px-4 py-3 z-20 transition-all duration-500">
              <div className="transition-all duration-500 transform group-hover:-translate-y-3">
                <h2 title={i18n.language === "uz" ? service.title_uz : service.title_ru} className="text-[20px] md:text-[32px] font-manrope font-[600] leading-[120%] whitespace-pre-line line-clamp-2 min-h-[64px]">
                  {i18n.language === "uz" ? service.title_uz : service.title_ru}
                </h2>
              </div>
              <p className="text-[18px] font-manrope leading-[140%] font-[500] opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[200px] transition-all duration-700 ease-in-out mt-2">
                {i18n.language === "uz" ? service.descrirption_uz : service.description_ru}
              </p>
            </div>
            </NavLink>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Services;