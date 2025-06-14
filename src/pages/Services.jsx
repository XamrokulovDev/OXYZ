import Header from '../utils/Header'
import Img1 from '../assets/Image.webp'
import Img2 from '../assets/opa.webp'
import Img3 from '../assets/qol.webp'
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io"
import { useInView } from "react-intersection-observer"
import Form from '../components/Form'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ModalForm from '../components/ModalForm';

const Services = () => {
  const { t, i18n } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
  
  const data = [
  {
    id: 1,
    title_ru: 'Организация международных перевозок',
    title_uz: "Xalqaro yuk tashishlarni tashkil etish",
    description_ru: 'Полная логистика грузов по направлениям Европа — СНГ — Китай. Рефрижераторы для скоропортящихся товаров, тентованные авто для оборудования и нетемпературных грузов. Контроль 24/7, прозрачные сроки, документы под ключ.',
    description_uz: "Yevropa — MDH — Xitoy yo‘nalishlarida to‘liq yuk logistikasini tashkil qilamiz. Tez buziluvchi mahsulotlar uchun sovitkichli, jihoz va haroratga bog‘liq bo‘lmagan yuklar uchun tentli avtomobillar. 24/7 nazorat, aniq muddatlar, hujjatlar to‘liq rasmiylashtiriladi.",
    image: Img1
  },
  {
    id: 2,
    title_ru: 'Консультирование по ВЭД',
    title_uz: "Tashqi iqtisodiy faoliyat bo‘yicha maslahat",
    description_ru: 'Помогаем сориентироваться во внешнеэкономической деятельности: контракты, Incoterms, логистические риски и оптимизация расходов. Говорим на языке бизнеса, а не бюрократии.',
    description_uz: "Tashqi iqtisodiy faoliyatda yo‘nalishni topishga yordam beramiz: shartnomalar, Incoterms, logistika xatarlarini baholash va xarajatlarni optimallashtirish. Biznes tilida gapiramiz, byurokratiya emas.",
    image: Img2
  },
  {
    id: 3,
    title_ru: 'Таможенное оформление',
    title_uz: "Bojxona rasmiylashtiruvi",
    description_ru: 'Организуем корректное и быстрое прохождение таможни: документы, расчёт платежей, взаимодействие с брокерами. Без задержек, лишних расходов и штрафов.',
    description_uz: "Bojxonadan to‘g‘ri va tez o‘tishni tashkil qilamiz: hujjatlar, to‘lovlar hisoboti, brokerlar bilan hamkorlik. Kechikishlarsiz, ortiqcha xarajatlar va jarimalarsiz.",
    image: Img3
  }
];
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
    <div className='flex flex-col gap-[50px]'>
      <Header />
      <div className='flex flex-col gap-[20px] mx-auto container px-4'>
        <h1 title={t('services.title')} className='font-manrope font-[500] leading-[120%] text-center text-[48px] text-[#1A1A18] max-md:text-[32px] max-lg:text-[36px]'>
          {t('services.title')}
        </h1>
        <p className='font-manrope font-[400] text-[20px] leading-[140%] text-center text-[#1A1A18] max-md:text-[16px] max-md:px-6'>
          {t('services.description')}
        </p>
      </div>
      <div className='flex flex-col gap-[50px] w-full mx-auto container'>
        {data.map((service, index) => {
          const isEven = index % 2 === 0
          return (
            <div
              key={service.id}
              className={`flex justify-between items-center gap-[50px] w-screen mx-auto container max-md:flex-col max-lg:flex-col ${
                isEven ? '' : 'flex-row-reverse'
              }`}
            >
              <div className='max-md:px-4 lg:w-[40%]'>
                <h2 title={i18n.language === "uz" ? service.title_uz : service.title_ru} className='font-[600] text-[36px] leading-[120%] font-manrope mb-[20px] max-md:mb-[10px] max-md:text-[28px] max-lg:text-[30px] max-xl:text-[32px]'>
                  {i18n.language === "uz" ? service.title_uz : service.title_ru}
                </h2>
                <div className='flex justify-between items-start gap-[50px] flex-col max-md:gap-[30px] max-lg:gap-[35px] max-xl:gap-[30px]'>
                  <p className='font-[500] leading-[140%] font-manrope text-[20px] text-[#84837D] max-md:text-[16px] max-xl:text-[18px]'>
                    {i18n.language === "uz" ? service.description_uz : service.description_ru}
                  </p>
                  <div className="relative inline-block group">
                    <motion.button
                      onClick={handleOpenModal}
                      className="relative bg-[#F07C00] group-hover:bg-orange-600 rounded-[8px] transition-all duration-300 flex items-center overflow-hidden cursor-pointer gap-3 mt-10 pl-7 p-2"
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
                </div>
              </div>
              <div className='lg:w-[50%] 2xl:w-[40%] h-full max-md:w-full max-lg:w-full max-md:px-5'>
                <img 
                  src={service.image} 
                  alt="servives"
                  loading='lazy' 
                  className='w-full h-full rounded-[16px]'
                />
              </div>
            </div>
          )
        })}
      </div>
      <Form />
      <br />
      <br />
    </div>
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

export default Services;