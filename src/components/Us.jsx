import { IoFunnelOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaTruck } from "react-icons/fa6";
import { CiStar, CiClock2 } from "react-icons/ci";
import { LuLightbulb } from "react-icons/lu";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Узкая специализация",
    icon: <IoFunnelOutline />,
    desc: "Мы не хватаемся за всё подряд. Наша сила — в профессионализме и фокусе на температурных грузах.",
  },
  {
    title: "Собственный транспорт",
    icon: <FaTruck />,
    desc: "У нас есть собственные рефрижераторы, и мы работаем только с проверенными перевозчиками.",
  },
  {
    title: "Честность и прозрачность",
    icon: <CiStar />,
    desc: "Никаких скрытых условий. Честные расчёты. Доступ к информации на всех этапах. Постоянная связь.",
  },
  {
    title: "Индивидуальные решения",
    icon: <LuLightbulb />,
    desc: "Каждый маршрут, каждый груз — уникальны. Мы подбираем оптимальный вариант для каждой задачи.",
  },
  {
    title: "Контроль 24/7",
    icon: <CiClock2 />,
    desc: "Вы всегда можете узнать, где ваш груз. Без «ожидайте» и «мы уточним позже».",
  },
  {
    title: "Юридическая точность",
    icon: <IoCheckmarkDoneOutline />,
    desc: "Мы грамотно сопровождаем все документы: от заявки до финального отчета.",
  },
];

const Us = () => {
  return (
    <div className='py-20 bg-[#F7F7F6]'>
      <h1 className='text-[#1A1A18] text-[36px] md:text-[48px] font-[600] text-center leading-[120%]'>Почему именно мы?</h1>
      <p className='font-[400] text-[#1A1A18] text-[18px] md:text-[20px] text-center mt-2'>
        Оставьте заявку и получите расчет доставки вашего груза
      </p>
      <section className='container px-4 py-10 grid grid-cols-1 sm:grid-cols-2 gap-3 mx-auto mt-10'>
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="h-full"
          >
            <div className="h-full flex flex-col justify-between p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className='flex justify-between items-start'>
                <h2 className='text-[#1A1A18] font-semibold text-[20px] md:text-[24px]'>{card.title}</h2>
                <div className="bg-[#F07C00] p-3 w-[54px] h-[54px] rounded-[15px] text-white text-[24px] flex justify-center items-center">
                  {card.icon}
                </div>
              </div>
              <p className='text-[#A7A6A1] text-[20px] font-normal mt-4'>{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

export default Us;