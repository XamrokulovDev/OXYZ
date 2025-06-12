import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import image from "../assets/NewCardImg.svg";
import {NavLink} from 'react-router-dom'
import {useEffect} from 'react'

const HomeCards = () => {
  

  const news = [
    {
      id: 1,
      title: "Открыли новое направление — доставка в Китай",
      text: "Мы расширили географию перевозок: теперь доступны международные грузоперевозки по странам Европы. Работаем с полным сопровождением и оформлением документов. Уже в пути — первые грузы наших клиентов!",
      date: "03.06.2025",
      img: image,
    },
    {
      id: 2,
      title: "Запустили онлайн-отслеживание грузов",
      text: "Теперь вы можете отслеживать статус своего груза в реальном времени. Просто введите номер накладной на сайте — и получайте актуальную информацию 24/7. Быстро, удобно и прозрачно.",
      date: "01.06.2025",
      img: image,
    },
    {
      id: 3,
      title: "Снижены тарифы на междугородние перевозки",
      text: "Хорошие новости для бизнеса! Мы пересмотрели стоимость логистики по Узбекистану и сделали её ещё выгоднее. Узнайте подробности у нашего менеджера и рассчитайте новый тариф прямо на сайте.",
      date: "29.05.2025",
      img: image,
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-[#F7F7F6] py-10 overflow-hidden">
      {/* DESKTOP */}
      <div className="container md:block hidden mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <h1 className="text-[#1A1A18] md:text-[48px] leading-[120%] font-manrope font-[600]">
            Новости и обновления
          </h1>
          <p className="text-[#1A1A18] md:text-[20px] font-manrope leading-[140%] font-[400] my-5">
            Следите за важными событиями, достижениями компании<br />
            и новыми проектами — всё самое важное в одном месте
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
          {news.map((item, index) => (
            <NavLink to={`/news/${item.id}`} key={item.id} onClick={window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-3 bg-white rounded-xl border-[1px] border-gray-200 hover:shadow-lg transition-shadow"
              >
                <img src={item.img} className="w-full rounded-lg mb-4" alt="news" />
                <h2 className="text-[#1A1A18] text-[24px] leading-[120%] font-[600] font-manrope mb-3">
                  {item.title}
                </h2>
                <p className="text-[#A7A6A1] text-[16px] font-[400] font-manrope leading-[140%] mb-12">
                  {item.text}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-[#1A1A18] font-[500] leading-[100%] font-manrope text-[20px] underline">
                    Читать статью
                  </p>
                  <p className="text-[#A7A6A1] font-manrope font-[500] leading-[100%] text-[14px]">
                    {item.date}
                  </p>
                </div>
              </motion.div>
            </NavLink>
          ))}
        </div>

      </div>

      {/* MOBILE */}
      <div className="block md:hidden overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <h1 className="text-[#1A1A18] text-3xl font-medium">
              Новости и обновления
            </h1>
            <p className="text-[#1A1A18] text-base my-5">
              Следите за важными событиями, достижениями компании <br />
              и новыми проектами — всё самое важное в одном месте
            </p>
          </motion.div>

          <div className="rounded-t-2xl pt-8 bg-[#F7F7F6] mt-10">
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet custom-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active custom-active-bullet',
              }}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
            >
              {news.map((item, index) => (
                <SwiperSlide key={item.id} className="mb-10">
                  <NavLink to={`/news/${item.id}`} onClick={window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="p-4 bg-white rounded-xl border border-gray-300 w-full"
                    >
                      <img src={item.img} className="w-full rounded-lg mb-4" alt="news" />
                      <h2 className="text-[#1A1A18] text-[24px] leading-[120%] font-[600] font-manrope mb-3">
                        {item.title}
                      </h2>
                      <p className="text-[#A7A6A1] text-[16px] font-[400] font-manrope leading-[140%] mb-6">
                        {item.text}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-[#1A1A18] font-[500] leading-[100%] font-manrope text-[20px] underline">
                          Читать статью
                        </p>
                        <p className="text-[#A7A6A1] font-manrope font-[500] leading-[100%] text-[14px]">
                          {item.date}
                        </p>
                      </div>
                    </motion.div>
                  </NavLink>
                </SwiperSlide>

              ))}
            </Swiper>
          </div>
        </div>
        {/* Swiper custom pagination style */}
        <style>
          {`
            .custom-bullet {
              opacity: 1;
              width: 12px;
              height: 12px;
              border-radius: 9999px;
              margin: 0 4px !important;
              transition: all 0.3s ease;
              background-color: #E5E4E2 !important;
            }
            .custom-active-bullet {
              background-color: #F07C00 !important;
              width: 24px;
              height: 12px;
            }
            .swiper-pagination {
              display: flex;
              justify-content: center;
              margin-top: 16px;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default HomeCards;