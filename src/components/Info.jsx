import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const Info = () => {
  const { t, i18n } = useTranslation();
  const data = [
  {
    id: "01",
    title_ru: "Заявка",
    title_uz: "Buyurtma",
    description_ru:
      "Вы оставляете заявку на перевозку — в любом удобном формате: по телефону, мессенджеру (телеграмм или ватсап), email или через сайт. Уточняем ключевые параметры: тип груза, маршрут, объем, сроки, требования (температура, упаковка и др.).",
    description_uz:
      "Siz yuk tashish bo‘yicha buyurtma qoldirasiz — istalgan qulay usulda: telefon, messenjer (Telegram yoki WhatsApp), email yoki sayt orqali. Biz esa asosiy parametrlarni aniqlab olamiz: yuk turi, yo‘nalish, hajmi, muddati, talablar (harorat, qadoqlash va boshqalar)."
  },
  {
    id: "02",
    title_ru: "Расчёт стоимости",
    title_uz: "Narxni hisoblash",
    description_ru:
      "На основе маршрута, типа груза и сезонных факторов мы рассчитываем стоимость. У нас нет шаблонных ставок — каждый груз индивидуален. Цена прозрачная, без скрытых комиссий и «всплывающих» доплат.",
    description_uz:
      "Yo‘nalish, yuk turi va mavsumiy omillarga asoslanib, biz narxni hisoblab chiqamiz. Bizda shablon narxlar yo‘q — har bir yuk individual. Narx shaffof, yashirin komissiyalar va kutilmagan to‘lovlarsiz."
  },
  {
    id: "03",
    title_ru: "Оформление документов",
    title_uz: "Hujjatlarni rasmiylashtirish",
    description_ru:
      "После согласования условий мы оформляем: заявку и договор",
    description_uz:
      "Shartlar kelishilganidan so‘ng, biz buyurtma va shartnomani rasmiylashtiramiz."
  },
  {
    id: "04",
    title_ru: "Организация перевозки",
    title_uz: "Yuk tashishni tashkil qilish",
    description_ru:
      "Мы подбираем оптимальный транспорт (рефрижератор или тент), согласовываем все детали с грузоотправителем. Наши логисты контролируют процесс на каждом этапе.",
    description_uz:
      "Biz eng mos transportni tanlaymiz (muzlatgichli yoki tentli mashina), yuk jo‘natuvchi bilan barcha tafsilotlarni kelishib olamiz. Bizning logistlar har bir bosqichni nazorat qilishadi."
  },
  {
    id: "05",
    title_ru: "Отслеживание груза",
    title_uz: "Yukni kuzatish",
    description_ru:
      'Вы получаете актуальную информацию о статусе груза: от момента загрузки до доставки; с подтверждением на каждом этапе. Мы на связи 24/7 — без ожиданий и "перезвоните позже".',
    description_uz:
      "Yuk holati haqida doimiy yangilangan ma’lumot olasiz: yuklanganidan tortib yetkazib berilguncha — har bir bosqichda tasdiq bilan. Biz 24/7 aloqadamiz — kutishlarsiz va \"keyinroq qo‘ng‘iroq qilamiz\" degan gaplarsiz."
  },
  {
    id: "06",
    title_ru: "Доставка и отчёт",
    title_uz: "Yetkazib berish va hisobot",
    description_ru:
      "После выгрузки вы получаете подтверждение доставки, все необходимые документы и закрывающий пакет. Вы уверены в результате — и можете спокойно планировать следующие поставки.",
    description_uz:
      "Yuk tushirilgach, siz yetkazib berilganligi bo‘yicha tasdiq, barcha kerakli hujjatlar va yopuvchi to‘plamni olasiz. Siz natijaga ishonasiz — va keyingi jo‘natmalarni bemalol rejalashtirishingiz mumkin."
  }
]

  const [dataList, setDataList] = useState(data)
  const [activeItem, setActiveItem] = useState(1)
  const cardRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      let closestCard = null
      let closestDistance = Number.POSITIVE_INFINITY
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect()
          const distanceFromTop = Math.abs(rect.top - 100) 
          if (distanceFromTop < closestDistance) {
            closestDistance = distanceFromTop
            closestCard = index
          }
        }
      })
      if (closestCard !== null) {
        setActiveItem(dataList[closestCard].id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [dataList])

  return (
    <>
      <div className="mx-auto container flex justify-between items-start max-md:w-[97%] max-md:p-2 max-md:mx-2 max-md:flex-col max-lg:flex-col max-lg:w-[680px] max-xl:flex-col max-xl:w-[970px] my-30">
        {/* CHAP PANEL */}
        <div className="flex flex-col gap-4 sticky top-20 h-fit max-md:relative max-md:w-[100vw] w-full p-2 max-md:top-0 max-md:mb-10 max-lg:relative max-lg:mb-10 max-xl:relative max-xl:mb-20">
          <h1 title={t('info.title')} className="max-sm:w-[95%] font-[600] font-manrope md:text-[40px] text-[28px] leading-[120%] text-[#1A1A18] px-4">
            {t('info.title')}
          </h1>
          <p className="max-md:w-[90%] md:text-[20px] text-[16px] font-[400] font-manrope leading-[140%] text-[#1A1A18] p-2">
            {t('info.description')}
          </p>
        </div>
        {/* O'NG PANEL */}
        <div className=" flex gap-8 max-md:gap-[10px] max-md:w-full max-md:mb-0 max-lg:w-[100%] w-full max-lg:mb-0 max-lg:mt-16">
          {/* Step raqamlari */}
          <div className="flex flex-col">
            {dataList.map((item) => (
              <div
                key={`number-${item.id}`}
                className={`h-[220px] max-md:h-[270px] max-lg:h-[220px] flex items-start justify-center transition-all duration-300 ease-in-out w-16 max-md:w-[35px] ${
                  activeItem === item.id
                    ? "text-[#F07C00] text-[20px] font-[500] font-manrope leading-[140%] border-r-3 "
                    : "text-[#6A6962] text-[20px] font-[500] font-manrope leading-[140%] border-r-2 border-[#CAC9C5]"
                }`}
              >
                <span className={` rounded-full w-10 h-10 ${activeItem === item.id ? "text-[30px]" : "text-[25px]"} max-md:text-[20px] flex items-center transition-all duration-300 ease-in-out justify-center `}>
                  {item.id}
                </span>
              </div>
            ))}
          </div>
          {/* Kartalar */}
          <div className="w-full flex flex-col gap-[20px] max-md:gap-[10px]">
            {dataList.map((item, index) => (
              <div key={item.id} ref={(el) => (cardRefs.current[index] = el)} className="relative">
                <motion.div
                  initial={{ opacity: 0.7, scale: 1 }}
                  animate={{
                    opacity: activeItem === item.id ? 1 : 1,
                    scale: activeItem === item.id ? 0.95 : 1,
                    y: activeItem === item.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`flex flex-col gap-[10px] p-5 w-full max-xl:w-[100%] rounded-[24px] cursor-pointer min-h-[200px] max-md:min-h-[260px] max-lg:h-[200px] max-md:w-[100%] max-lg:w-[100%] transition-all duration-700 ${
                    activeItem === item.id
                      ? "bg-[#F07C00] z-10"
                      : "bg-[#F7F7F6]"
                  }`}
                >
                  <div className="flex items-center">
                    <h2
                      title={i18n.language === "uz" ? item.title_uz : item.title_ru}
                      className={`text-[32px] font-[600] leading-[120%] max-md:text-[28px] ${
                        activeItem === item.id ? "text-white" : "text-[#1A1A18]"
                      }`}
                    >
                      {i18n.language === "uz" ? item.title_uz : item.title_ru}
                    </h2>
                  </div>
                  <p
                    className={`text-[16px] font-[400] leading-[140%] max-md:text-[] ${
                      activeItem === item.id ? "text-[#FFC246]" : "text-[#6B7280]"
                    }`}
                  >
                    {i18n.language === "uz" ? item.description_uz : item.description_ru}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Info;