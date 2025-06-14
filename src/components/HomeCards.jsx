import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { motion } from 'framer-motion'
import image from '../assets/NewCardImg.webp'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const HomeCards = () => {
  const swiperRef = useRef(null);
  const { t } = useTranslation();
  const _api = import.meta.env.VITE_API;
  const [activeIdx, setActiveIdx] = useState(0);
  const [showPagination, setShowPagination] = useState(false);

  const news = [
    { id: 1, title: 'Открыли новое направление — доставка в Китай', text: 'Мы расширили географию перевозок: теперь доступны международные грузоперевозки по странам Европы. Работаем с полным сопровождением и оформлением документов. Уже в пути — первые грузы наших клиентов!', date: '03.06.2025', img: image },
    { id: 2, title: 'Запустили онлайн-отслеживание грузов',        text: 'Мы расширили географию перевозок: теперь доступны международные грузоперевозки по странам Европы. Работаем с полным сопровождением и оформлением документов. Уже в пути — первые грузы наших клиентов!', date: '01.06.2025', img: image },
    { id: 3, title: 'Снижены тарифы на междугородние перевозки',    text: 'Мы расширили географию перевозок: теперь доступны международные грузоперевозки по странам Европы. Работаем с полным сопровождением и оформлением документов. Уже в пути — первые грузы наших клиентов!', date: '29.05.2025', img: image },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const updatePagination = (sw) => setShowPagination(!sw.isLocked)

  return (
    <div className="bg-[#F7F7F6] lg:py-20 py-15">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <h1 title={t('cards.title')} className="text-[#1A1A18] md:text-[48px] text-[28px] font-manrope font-[600]">
            {t('cards.title')}
          </h1>
          <p className="text-[#1A1A18] md:text-[20px] text-[16px] font-manrope my-5">
            {t('cards.description_1')} <br /> {t('cards.description_2')}
          </p>
        </motion.div>
        <Swiper
          modules={[Autoplay]}
          onSwiper={(sw) => {
            swiperRef.current = sw
            updatePagination(sw)
          }}
          onResize={updatePagination}
          onBreakpoint={updatePagination}
          onSlideChange={(sw) => {
            setActiveIdx(sw.realIndex)
            updatePagination(sw)
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={news.length > 1}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            0:   { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1280:{ slidesPerView: 3 },
          }}
        >
          {news.map((item, idx) => (
            <SwiperSlide key={item.id}>
              <NavLink to={`/new/${item.id}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="h-[572px] bg-white rounded-[16px] border border-[#E5E4E2] flex flex-col justify-between p-2"
                >
                  <div>
                    <img src={item.img} alt="news" loading="lazy"
                         className="w-full h-[280px] object-cover rounded-[16px] mb-4" />
                    <span className="block px-3">
                      <h2 title={item.title} className="text-[#1A1A18] text-[24px] font-[600] font-manrope line-clamp-2 mb-3">
                        {item.title}
                      </h2>
                      <p className="text-[#A7A6A1] text-[16px] font-manrope line-clamp-4 mb-6">
                        {item.text}
                      </p>
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-3 mb-3">
                    <p className="text-[#1A1A18] underline text-[20px]">Читать статью</p>
                    <p className="text-[#A7A6A1] text-[14px]">{item.date}</p>
                  </div>
                </motion.div>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
        {showPagination && (
          <div className="flex justify-center gap-2 mt-5">
            {news.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className={`h-3 rounded-full transition-all ${
                  i === activeIdx ? 'cursor-pointer bg-[#F07C00] w-6' : 'cursor-pointer bg-[#E5E4E2] w-3'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeCards;