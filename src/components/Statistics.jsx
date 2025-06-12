import { motion } from "framer-motion";
import image from "../assets/Image.svg";
import img1 from "../assets/Frame 46.svg";
import img2 from "../assets/Frame 46 (1).svg";
import img3 from "../assets/Frame 46 (2).svg";
import img4 from "../assets/Frame 46 (3).svg";

const stats = [
  {
    img: img1,
    value: "+15 000",
    text: "тонн перевезённых грузов",
  },
  {
    img: img2,
    value: "+9 млн",
    text: "пройденных километров",
  },
  {
    img: img3,
    value: "99%",
    text: "доставок — в срок",
  },
  {
    img: img4,
    value: "100%",
    text: "довольных клиентов",
  },
];

function Statistics() {
  return (
    <main className="bg-[#F7F7F6] py-20 my-20">
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-stretch gap-3">
        <motion.div
          className="bg-white p-6 md:p-10 rounded-2xl w-full lg:w-1/2"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="font-[500] md:text-[36px] text-[28px] leading-[120%] font-manrope text-[#1A1A18] mb-4">
            О компании OXYZ
          </h1>
          <div className="mt-0"><p className="text-[#1A1A18] font-[400] font-manrope md:text-[18px] text-[16px] leading-[140%]">
            Ваше спокойствие — наша работа. Мы — логистическая компания, которая
            не просто перевозит грузы, а строит понятные, честные и надёжные
            процессы для вашего бизнеса.
          </p>
          <p className="text-[#1A1A18] font-[400] font-manrope md:text-[18px] text-[16px] leading-[140%]">
            С 2022 года мы помогаем компаниям безболезненно и вовремя доставлять
            грузы с Европы и стран СНГ. Наша основная специализация —
            скоропортящиеся грузы в рефрижераторах. Также организуем перевозки
            тентованным транспортом: оборудование, техника, ТНП и т.п.
          </p></div>
        </motion.div>
        {/* Rasm qismi */}
        <motion.div
          className="w-full h-auto lg:w-1/2"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src={image}
            alt="OXYZ Logistics"
            className="rounded-2xl w-full h-full object-cover"
          />
        </motion.div>
      </div>
      {/* Statistika qismi */}
      <div className="container mx-auto px-4 py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 w-full shadow-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={item.img}
              alt={`Stat ${index + 1}`}
              className="w-12 h-12"
            />
            <div className="mt-10">
              <h2 className="text-[#1A1A18] font-[700] text-[36px] leading-[100%] font-manrope">
                {item.value}
              </h2>
              <p className="text-[#1A1A18] text-[16px] font-manrope font-[400] leading-[120%]">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

export default Statistics;