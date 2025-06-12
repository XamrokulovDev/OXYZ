import Header from '../utils/Header'
import Img1 from '../assets/Image.png'
import Img2 from '../assets/opa.png'
import Img3 from '../assets/qol.png'
import {motion} from 'framer-motion'
import { IoIosArrowForward } from "react-icons/io"
import { useInView } from "react-intersection-observer"
import Form from '../components/Form'
import { useEffect } from 'react'
const Services = () => {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
    const data= [
        {
            id: 1,
            title: 'Организация международных перевозок',
            description: 'Полная логистика грузов по направлениям Европа — СНГ — Китай. Рефрижераторы для скоропортящихся товаров, тентованные авто для оборудования и нетемпературных грузов. Контроль 24/7, прозрачные сроки, документы под ключ.',
            image: Img1
        },
        {
            id: 2,
            title: 'Консультирование по ВЭД',
            description: 'Помогаем сориентироваться во внешнеэкономической деятельности: контракты, Incoterms, логистические риски и оптимизация расходов. Говорим на языке бизнеса, а не бюрократии.',
            image: Img2
        },
        {
            id: 3,
            title: 'Таможенное оформление',
            description: 'Организуем корректное и быстрое прохождение таможни: документы, расчёт платежей, взаимодействие с брокерами. Без задержек, лишних расходов и штрафов.',
            image: Img3
        }
    ]
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className='flex flex-col gap-[50px] '>
        <Header/>
        <div className='flex flex-col gap-[20px] mx-auto container'>
            <h1 className='font-manrope font-[500] leading-[120%] text-center text-[48px] text-[#1A1A18] max-md:text-[32px] max-lg:text-[36px]'>Наши услуги</h1>
            <p className='font-manrope font-[400] text-[20px] leading-[140%] text-center text-[#1A1A18] max-md:text-[16px] max-md:px-6'>Оставьте заявку и получите расчет доставки вашего груза</p>
        </div>
        <div className=' flex flex-col gap-[50px] w-full mx-auto container'>
            {data.map((service, index) => {
  const isEven = index % 2 === 0
  return (
    <div
      key={service.id}
      className={`flex justify-between items-center gap-[50px] w-screen  mx-auto container max-md:flex-col max-lg:flex-col ${
        isEven ? '' : 'flex-row-reverse'
      }`}
    >
      <div className='max-md:px-6'>
        <h2 className='font-[600] text-[36px] leading-[120%] font-manrope mb-[20px] max-md:mb-[10px] max-md:text-[28px] max-lg:text-[30px] max-xl:text-[32px]'>{service.title}</h2>
        <div className=' flex justify-between items-start gap-[50px] flex-col max-md:gap-[30px] max-lg:gap-[35px] max-xl:gap-[30px]'>
        <p className='font-[500] leading-[140%] font-manrope text-[20px] text-[#84837D] max-md:text-[16px] max-xl:text-[18px]'>{service.description}</p>

        <motion.button
          className="relative cursor-pointer bg-orange-500 group-hover:bg-orange-600 transition-all duration-300 text-white font-[400] p-2 pl-7 rounded-[8px] flex items-center gap-3 overflow-hidden md:text-[20px] text-[16px] leading-[100%] max-xl:text-[18px]"
        >
          <span>Получить консультацию</span>
          <span className="bg-white text-orange-500 group-hover:text-orange-600 transition-all duration-300 p-4 rounded-md">
            <IoIosArrowForward size={20} />
          </span>
          {/* Shine */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
            initial={{ x: "-100%" }}
            animate={inView ? { x: ["-100%", "200%"] } : {}}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
          >
            <div className="w-[35%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-15" />
          </motion.div>
        </motion.button>
        </div>
      </div>
      <div className='w-[120%] h-full max-md:w-full max-lg:w-full'>
        <img src={service.image} alt="" className='w-full h-full rounded-[16px] ' />
      </div>
    </div>
  )
})}

        </div>
        <Form/>
        <br />
        <br />
    </div>
  )
}

export default Services